
import React , { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import Tabs from './routes/TabNavigation'

function App () {
  return(
    <NavigationContainer>
      {/* <RootNavigation/> */}
      <Tabs/>
    </NavigationContainer>
    
    
  );
} 
 
export default App;
