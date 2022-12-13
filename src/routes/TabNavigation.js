<<<<<<< HEAD
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
=======
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import PossessionScreen from '../screens/PossessionScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import CustomTabBar from '../routes/CustomTabBar';

const Tab = createBottomTabNavigator();
<<<<<<< HEAD
const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{label: 'Tổng quan'}}
      />
      <Tab.Screen
        name="PlanScreen"
        component={PlanScreen}
        initialParams={{label: 'Kế hoạch'}}
      />
      <Tab.Screen
        name="Post"
        component={HomeScreen}
        initialParams={{label: ''}}
      />
      <Tab.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        initialParams={{label: 'Thống kê'}}
      />
      <Tab.Screen
        name="PossessionScreen"
        component={PossessionScreen}
        initialParams={{label: 'Tài sản'}}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
=======
const TabNavigation = () =>{
    return(
        <Tab.Navigator 
            tabBar={ props => <CustomTabBar {...props} />}
        >
            <Tab.Screen name = "HomeScreen" component = {HomeScreen} initialParams = {{label:'Tổng quan'}}/>
            <Tab.Screen name = "PlanScreen" component = {PlanScreen} initialParams = {{label:'Kế hoạch'}}/>
            <Tab.Screen name = "Post" component = {HomeScreen} initialParams = {{label:''}} />
            <Tab.Screen name = "StatisticsScreen" component = {StatisticsScreen} initialParams = {{label:'Thống kê'}}/>
            <Tab.Screen name = "PossessionScreen" component = {PossessionScreen} initialParams = {{label:'Tài sản'}}/>
        </Tab.Navigator>
    )
}
export default TabNavigation;
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
