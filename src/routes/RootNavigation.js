import React from 'react';
import Login from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import Success from '../screens/Success';
import FirstInput from '../screens/FirstInputScreen';
import HomeScreen from '../screens/HomeScreen';
import DrawerNavigation from './DrawerNavigation';

import Tabs from './TabNavigation';

import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../screens/Onboarding';

const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="FirstInput" component={FirstInput} />
      {/* <Stack.Screen name="HomeScreen" component={Tabs} /> */}
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
