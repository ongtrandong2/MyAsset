import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
 
} from 'react-native';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';

const HeaderDrawer = (props) => {
  
  return (
    <View style={styles.view}>
      <View style={styles.header_view}>
        <View style={styles.iconmoney_view}>
          <Image
            style={styles.icon_money}
            source={require('../assets/images/icon_money.png')}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.text}>MY ASSET</Text>

        <View style={styles.option_view}>

          <View style={styles.box}>
            <Pressable
              onPress={props.onPress}
              android_ripple={{ color: '#bbbbbb' }}>
              {/* <Image
                style={{ height: scale(25), width: scale(25) }}
                //source={require('../assets/images/Setting.png')}
                source={{uri:'https://img.icons8.com/ios-filled/50/null/menu-rounded.png'}}
                resizeMode="stretch"
              /> */}
              <Feather
                  name = 'menu'
                  size ={24}
                  color = 'black'
                  style ={{
                    position:'absolute'
                  }}
              />
            </Pressable>
          </View>



        </View>
      </View>

      <View header_view>
        <Text style={[{ fontSize: props.fontSize }, styles.title,{...props.style}]}>
          {props.title}
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    //height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 10, //
    paddingHorizontal:10,
    //backgroundColor:'pink',
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal:scale(10),
  },

  text: {
    color: 'black',
    fontSize: scale(20),
    fontFamily: 'Wallpoet-Regular',
  },

  iconmoney_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue'
  },

  option_view: {
    flex: 3,
    flexDirection:'row',
    justifyContent: 'flex-end',
  },

  box: {
    width: '30%',
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon_money: {
    width: scale(50),
    height: scale(50),
  },

  title: {
    color: 'black',
  },

  icon: {
    width: scale(20),
    height: scale(20),
  },

 
  
});

export default HeaderDrawer;
