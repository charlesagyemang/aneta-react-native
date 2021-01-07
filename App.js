import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/dashboardScreen';
import CreateRequest from './screens/createRequest'; //dashboardScreen
import AllRequestsScreen from './screens/allRequestsScreen';
import ProfileScreen from './screens/profileScreen';
import ArticleCover from './screens/articleCoverScreen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'
import KehillahDialog from './components/kehillahDialog';
// Auth stuff
import { storeData, retrieveData } from './helpers/localStorage';
const Tab = createBottomTabNavigator();

const MyNavigationDrawer = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'New Request') {
              iconName = focused ? 'ios-git-pull-request' : 'ios-git-pull-request';
            } else if (route.name === 'All Requests'){
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'Profile'){
              iconName = focused ? 'ios-contact' : 'ios-contact';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New Request" component={CreateRequest} />
        <Tab.Screen name="All Requests" component={AllRequestsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  )
}

export default function App() {

  const [isLoaggedIn, setIsLoggedIn] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [buttonText, setButtonText] = useState('LOGIN')
  const [pin, setPin] = useState('')
  const [alertVisibility, setAlertVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertIcon, setAlertIcon] = useState('❌')

  const handleSignIn = async () => {
    const loginBody = { phoneNumber, pin }
    const url = 'https://kelin-weebhook.herokuapp.com/api/user/login'
    const pinIs4Digits = pin.length === 4
    if (pinIs4Digits) {
      try {
        setButtonText('Authenticating.....')
        const res =  await axios.post(url, loginBody)
        setButtonText('SUCCESS')
        storeData('USER-DETAILS', JSON.stringify(res.data))
        setIsLoggedIn(true)
      } catch (e) {
        console.log(e);
        setButtonText('LOGIN')
        setAlertVisibility(true)
        setErrorMessage("Wrong PhoneNumber Or PIN please check and try again")
      } finally {
        setButtonText('LOGIN')
      }
    } else {
      setButtonText('LOGIN')
      setAlertVisibility(true)
      setErrorMessage("Wrong PIN please check and try again. Your Pin should be only 4 digits.")
    }
  }

  const handleSignUp = () => {
    console.log("tetteet");
    setIsLoggedIn(true)
  }


  useEffect(() => {
    const getLoginDetails = async () => {
      const {status, value} =  await retrieveData('USER-DETAILS')
      // console.log(value);
      await setIsLoggedIn(status)
    }
    getLoginDetails()
  })

  if (isLoaggedIn) {
    return (
      <NavigationContainer>
        <MyNavigationDrawer />
      </NavigationContainer>
    );
  } else {
      return (
        <View style={styles.containerr}>
          <Text style={styles.logo}>Aneta</Text>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              numeric
              placeholder="Enter Your Phone Number"
              placeholderTextColor="#003f5c"
              keyboardType={'numeric'}
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}/>
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              numeric
              style={styles.inputText}
              keyboardType={'numeric'}
              placeholder="Enter Your Secret PIN"
              placeholderTextColor="#003f5c"
              onChangeText={pin => setPin(pin)}/>
          </View>


          <KehillahDialog
              visibility={alertVisibility}
              close={() => setAlertVisibility(false)}
              message={errorMessage}
              icon={alertIcon}
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSignIn}
          >
            <Text style={styles.loginText}>{buttonText}</Text>
          </TouchableOpacity >
          <TouchableOpacity
          onPress={handleSignUp}
          >
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
        </View>
      );
  }

};

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: '#00b300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"white",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#2E8B57",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#006400", //#32CD32
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
