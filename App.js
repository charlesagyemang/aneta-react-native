import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/homeScreen';
import CreateRequest from './screens/createRequest';

const Stack = createStackNavigator();

const MyStack = ()  =>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create Pickup Request" component={CreateRequest} />
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const MyNavigationDrawer = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'New Pickup Request') {
              iconName = focused ? 'ios-git-pull-request' : 'ios-git-pull-request';
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
        <Tab.Screen name="New Pickup Request" component={CreateRequest} />
      </Tab.Navigator>
  )
}


// export default createAppContainer(AppNavigator);

export default function App() {
  return (
    <NavigationContainer>
      {/* <MyStack /> */}
      <MyNavigationDrawer />
    </NavigationContainer>
  );
};


