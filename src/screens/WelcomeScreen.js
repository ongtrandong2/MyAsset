/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';

import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function WelcomeScreen({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.body}>
      <View style={styles.title_view}>
        <View style={styles.icon1_view}>
          <Image
            style={styles.icon_money}
            source={require('../assets/images/icon_money.png')}
            resizeMode="stretch"
          />

          <View />
        </View>

        <View>
          <Text style={styles.title}>Welcome to React Native!</Text>

        </View>


        <View style={styles.lable_view}>
          <View style={styles.lable}>
            <Text style={styles.text}>MY ASSET</Text>
          </View>
        </View>
      </View>

      <Image
        style={styles.image}
        source={require('../assets/images/tai-chinh-gia-dinh.jpeg')}
        resizeMode="stretch"
      />
      <Text style={{ color: 'black', fontSize: 40, fontWeight: 'bold' }}>
        {' '}
        Welcome
      </Text>
      <Button title="Next" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },

  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },

  title_view: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 50,
  },

  icon1_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 10,
    height: 30,
  },

  icon_money: {
    width: 70,
    height: 70,
  },

  lable_view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginRight: 20,
  },

  lable: {
    borderWidth: 4,
    borderRadius: 20,
    borderColor: '#FFC700',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 300,
    height: 300,
    margin: 10,
  },
});
