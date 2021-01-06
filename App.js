import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/dashboardScreen';
import CreateRequest from './screens/createRequest'; //dashboardScreen
import AllRequestsScreen from './screens/allRequestsScreen';
import ProfileScreen from './screens/profileScreen';
import ArticleCover from './screens/articleCoverScreen';
import LoginScreen from './screens/loginScreen';

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
          activeTintColor: 'tomato',
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
    return(  <LoginScreen />)
  }

};
