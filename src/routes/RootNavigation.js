import React from 'react';
import Login from '../screens/Login';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Success from '../screens/Success';
import FirstInput from '../screens/FirstInputScreen';
import HomeScreen from '../screens/HomeScreen';

import Tabs from './TabNavigation';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="FirstInput" component={FirstInput} />
      <Stack.Screen name="HomeScreen" component={Tabs} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
