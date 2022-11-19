/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import Tabs from './routes/TabNavigation';
import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import Store from './Redux/Store';

function App() {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'}  translucent />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
