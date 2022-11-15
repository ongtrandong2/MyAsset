import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function PlanScreen() {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Plan Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },
});
