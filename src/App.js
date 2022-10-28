
import React , { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';

function App () {
  return(
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
    
  );
} 
 
export default App;
