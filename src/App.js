/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import 'react-native-gesture-handler';
import StatisticsScreen from './screens/StatisticsScreen';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
import Nhap from './screens/Nhap';
<<<<<<< HEAD

=======



>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
function App() {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      {/* <StatisticsScreen/> */}
      {/* <Nhap/> */}
    </Provider>
  );
}

export default App;
