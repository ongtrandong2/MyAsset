import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import PossessionScreen from '../screens/PossessionScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import CustomTabBar from '../routes/CustomTabBar';

const Tab = createBottomTabNavigator();
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
