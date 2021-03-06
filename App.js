import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/dashboardScreen';
import CreateRequest from './screens/createRequest'; //dashboardScreen
import AllRequestsScreen from './screens/allRequestsScreen';
import GridScreen from './screens/gridScreen'
import LocationScreen from './screens/allRequestsForLocationScreen'
import SettingsScreen from './screens/settingsScreen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios'
import KehillahDialog from './components/kehillahDialog';
import BaseDropDown from './components/baseDropDown';
import {zoneList} from './constants/utils';
import theme from './src/theme';


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
            } else if (route.name === 'Home2'){
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Settings'){
              iconName = focused ? 'ios-cog' : 'ios-cog';
            } else if (route.name === 'Locations'){
              iconName = focused ? 'ios-pin' : 'ios-pin';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.COLOR_THEMES.ONE.PRIMARY,
          inactiveTintColor: theme.COLOR_THEMES.ONE.DEFAULT,
        }}
      >
        <Tab.Screen name="Home" component={GridScreen} />
        <Tab.Screen name="New Request" component={CreateRequest} />
        <Tab.Screen name="All Requests" component={AllRequestsScreen} />
        <Tab.Screen name="Locations" component={LocationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  )
}

//         <Tab.Screen name="Home" component={HomeScreen} />

export default function App() {
  const [isLoaggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [buttonText, setButtonText] = useState('LOGIN')
  const [pin, setPin] = useState('')
  const [alertVisibility, setAlertVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertIcon, setAlertIcon] = useState('❌')
  const [signUpClicked, setSignUpClicked] = useState(false)
  const [zone, setZone] = useState('Ablekuma-Awoshie')
  const [location, setLocation] = useState('')
  const [infoMessageSignUp, setInfoMessageSignUp] = useState('')



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

  const handleSignUpOnLoginPage = () => {
    console.log("tetteet");
    setSignUpClicked(true)
  }

  const handleSignInOnSignUpPage = () => {
    console.log("tetteet");
    setSignUpClicked(false)
  }

  const handleSignUp = async () => {

    const signUpUrl = 'https://kelin-weebhook.herokuapp.com/api/user/'

    const signUpBody = {
      phoneNumber,
      pin,
      role: 'user',
      other:{
        name,
        zone,
        location,
        signUpSource: 'Mobile App',
      }
    }

    const dataIsValid = signUpBody.other.name.length > 0 && signUpBody.phoneNumber.length === 10 && signUpBody.pin.length === 4 && signUpBody.other.zone.length > 0 && signUpBody.other.location.length > 0
    setInfoMessageSignUp('Creating Account Please Wait.....')
    if (dataIsValid) {
      console.log("==VALID==", signUpBody);
      try {
        const {data} = await axios.post(signUpUrl, signUpBody);
        console.log("====DATA===", data);
        storeData('USER-DETAILS', JSON.stringify(data))
        setIsLoggedIn(true)
      } catch (e) {
        setInfoMessageSignUp('An error occured while trying to sign up please try again later. Thank you')
      }
    } else {
      setInfoMessageSignUp('There was an error trying to create your account. Phone Number Should be 10 digits, PIn should be 4 digits, Exact Location Should Not Be empty. Please Check and try again')
      console.log("==INVALID==", signUpBody);
    }
  }



  useEffect(() => {
    const getLoginDetails = async () => {
      const {status, value} =  await retrieveData('USER-DETAILS')
      // console.log(value);
      await setIsLoggedIn(status)
    }
    getLoginDetails();
  }, [])

  if (isLoaggedIn) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyNavigationDrawer />
        </NavigationContainer>
      </Provider>
    );
  } else {
    // signup stuff
    if (signUpClicked) {
      return (
        <View style={styles.containerr}>
          <Text style={styles.logo}>Aneta Signup</Text>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              numeric
              placeholder="Enter Your Phone Number eg. 0277119911"
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
              placeholder="Enter A 4 Digit Secret PIN"
              placeholderTextColor="#003f5c"
              onChangeText={pin => setPin(pin)}/>
          </View>

          <BaseDropDown
              items={zoneList}
              value={zone}
              onValueChange={(val) => setZone(val)}
              message="Choose Zone"
          />
          <View style={{marginTop: 20}}></View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Enter Your Exact Location"
              placeholderTextColor="#003f5c"
              onChangeText={location => setLocation(pin)}/>
          </View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Enter Your Full Name Here"
              placeholderTextColor="#003f5c"
              onChangeText={name => setName(name)}/>
          </View>


          <KehillahDialog
              visibility={alertVisibility}
              close={() => setAlertVisibility(false)}
              message={errorMessage}
              icon={alertIcon}
          />

          <Text style={{color: 'white', fontWeight: 'bold'}}>{infoMessageSignUp}</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSignUp}
          >
            <Text style={styles.loginText}>SIGN UP</Text>
          </TouchableOpacity >
          <TouchableOpacity
          onPress={handleSignInOnSignUpPage}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
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
          onPress={handleSignUpOnLoginPage}
          >
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }

};

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: theme.COLOR_THEMES.ONE.PRIMARY, // '#00b300',
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
    backgroundColor: theme.COLORS.WHITE, //"#2E8B57",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor: theme.COLOR_THEMES.ONE.DEFAULT,//"#006400", //#32CD32
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
