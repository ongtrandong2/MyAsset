import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import PlanScreen from '../screens/PlanScreen';
import PossessionScreen from '../screens/PossessionScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ChangePassword from '../screens/ChangePassword';
import StackInfo from './StackInfo';


import TabPost from '../routes/TabPost';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="InfoScreen" component={StackInfo} />
    </Stack.Navigator>
  );
};

const PlanStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
      <Stack.Screen name="InfoScreen" component={StackInfo} />
    </Stack.Navigator>
  );
};

const StatisticsStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

const PossessionStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="PossessionScreen" component={PossessionScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen}/>
    </Stack.Navigator>
  );
};

const PostStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Post" component={TabPost} />
    </Stack.Navigator>
  );
};



export {HomeStack, PlanStack, StatisticsStack, PossessionStack, PostStack};
