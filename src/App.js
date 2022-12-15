/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import 'react-native-gesture-handler';
import StatisticsScreen from './screens/StatisticsScreen';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
<<<<<<< HEAD
import History from './screens/History';

=======
import Nhap from './screens/Nhap';
>>>>>>> 1d36d94abd1da2cc2370d2c18c1c0d4f724d2115
function App() {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      {/* <History /> */}
    </Provider>
  );
}

export default App;
