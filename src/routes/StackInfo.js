import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoScreen from '../screens/InfoScreen';
import ChangePassword from '../screens/ChangePassword';
import ChangeInfo from '../screens/ChangeInfo';
import Onboarding from '../screens/Onboarding';
const Stack = createStackNavigator();

const StackInfo = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default StackInfo;
