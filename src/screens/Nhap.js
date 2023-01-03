import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from 'react-native-reanimated';

const Nhap = () => {
  return (
    <View style={styles.view}>
      <View style={styles.big_row}>
        <Text style={styles.text}> BILL</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.dot, {left: -20}]} />
        <View style={styles.box}>
          <Text>Hello</Text>
        </View>
        <View style={[styles.dot, {right: -20}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'blue',
    paddingTop: 50,
  },
  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Itim-Regular',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: '80%',
    alignItems: 'center',
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'blue',
    position: 'absolute',
    zIndex: 999,
  },
});
export default Nhap;
