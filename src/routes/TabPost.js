import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Outcome from '../screens/Outcome';
import Income from '../screens/Income';

const Tab = createMaterialTopTabNavigator();

export default function TabPost() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FF5C00',
        inactiveTintColor: '#CCCCCC',
        showLabel: true, // hide the name of the App
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {paddingTop: 0},
      }}>
      <Tab.Screen name="CHI TIÊU" component={Outcome} />
      <Tab.Screen name="THU NHẬP" component={Income} />
    </Tab.Navigator>
  );
}
