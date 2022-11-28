import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoScreen from '../screens/InfoScreen';
import ChangePassword from '../screens/ChangePassword';
import ChangeInfo from '../screens/ChangeInfo';

const Stack = createStackNavigator();

const StackInfo = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
    </Stack.Navigator>
  );
};

export default StackInfo;
