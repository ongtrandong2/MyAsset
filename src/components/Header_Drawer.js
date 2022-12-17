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
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <View>
          <Text style={styles.text}>MY</Text>
          <Text style={styles.text}>ASSET</Text>
        </View>

        <View style={styles.option_view}>
          {/* <View style={styles.box}>
            <Pressable
              //onPress={props.onPress}
              android_ripple={{ color: '#bbbbbb' }}
            >
              <Ionicons
                name='notifications-outline'
                size={30}
                color='black'
              />
            </Pressable>
          </View> */}
          <View style={styles.box}>
            <Pressable
              onPress={props.onPress}
              android_ripple={{ color: '#bbbbbb' }}
            >
              <Feather
                name='menu'
                size={30}
                color='black'
              />
            </Pressable>
          </View>


        </View>
      </View>

      <View style={styles.header_view}>
        <Text style={[{ fontSize: props.fontSize }, styles.title, { ...props.style }]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal:10,
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //paddingHorizontal:scale(10),
  },

  text: {
    color: 'black',
    fontSize: scale(20),
    fontFamily: 'Wallpoet-Regular',
  },

  iconmoney_view: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },

  option_view: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },

  box: {
    //width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    marginRight: 10,
  },

  icon_money: {
    width: scale(50),
    height: scale(50),
  },

  title: {
    color: '#000000',
    //fontFamily:'Lato-Regular',
    //fontFamily: 'Itim-Regular',
    fontFamily: 'Inter-Bold',
    //fontFamily:'Lato-Bold',
    fontSize: scale(30)
    
  },

});

export default HeaderDrawer;
