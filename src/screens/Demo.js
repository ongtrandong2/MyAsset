import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';


export default function Onboarding() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 280,
          height: 280,
          backgroundColor: '#fff',
        }}
        source={require('../assets/images/129858-dancing-wallet-coins.json')}
      />
      <Text style ={{
        fontSize: 20,
      }}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
});