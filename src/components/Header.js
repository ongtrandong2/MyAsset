import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import scale from '../constants/scale';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = props => {
  return (
    <View
      style={styles.view}>
      <View
        style={styles.left}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: scale(50),
              width: scale(50),
              resizeMode: 'contain',
            }}
            source={require('../assets/images/icon_money.png')}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.text}>MY</Text>
            <Text style={styles.text}>ASSET</Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              height: 30,
              width: 30,
              borderRadius: 50,
              backgroundColor: pressed ? 'hsl(0,0%,90%)' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress ={props.onPressFunctionBack}
        >
          <AntDesign name={'back'} size={20} color={'black'} />
        </Pressable>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[{ fontSize: props.fontSize }, styles.title, props.style]}>
          {props.title}
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 5,
    width: '100%',
  },

  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: scale(18),
    fontFamily: 'Wallpoet-Regular',
  },

  title: {
    color: 'black',
  },

});

export default Header;
