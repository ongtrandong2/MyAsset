/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
import DailyCost from './screens/DailyCost';
import Forgot from './screens/ForgotScreen';

function App() {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
      <NavigationContainer>
        <RootNavigation />
        {/* <DailyCost/> */}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
