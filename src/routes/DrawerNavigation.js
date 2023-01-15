import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from '../routes/TabNavigation';
import StackInfo from '../routes/StackInfo';
import CustomDrawer from '../components/CustomDrawer';
import UserGuide from '../screens/UserGuide';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeScreen" component={Tabs} />
      <Drawer.Screen name="InfoScreen" component={StackInfo} />
      <Drawer.Screen name="UserGuide" component={UserGuide} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
