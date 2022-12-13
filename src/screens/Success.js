//import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';

import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
<<<<<<< HEAD
=======

>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a

export default function SuccessScreen({navigation}) {
  const onPressHandler_Home = () => {
    navigation.navigate('Login');
  };

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('FirstInput');
    }, 1000);
    return () => {};
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.body}>
        <View style={styles.title_view}>
          <View style={styles.icon1_view}>
            <Image
              style={styles.icon_money}
              source={require('../assets/images/icon_money.png')}
              resizeMode="stretch"
            />
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

        <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>
          Tạo tài khoản mới thành công!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    //marginTop:-3,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    //justifyContent:'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },

  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    //backgroundColor:'blue',
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

  row: {
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    margin: 20,
  },
});
