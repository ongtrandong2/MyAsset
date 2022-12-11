import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import scale from '../constants/scale';

const Header = props => {
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
        <Text style={styles.text}> MY ASSET</Text>
        <View style={styles.option_view}>
          {/* <View style={styles.box}>
            <Pressable
              onPress={props.onPressFunctionUser}
              android_ripple={{color: '#bbbbbb'}}>
              
              <Image
                style={styles.icon}
                source={require('../assets/images/user2.png')}
                resizeMode="stretch"
              />
            </Pressable>
          </View> */}

          <View style={styles.box}>
            <Pressable
              onPress={props.onPressFunctionBack}
              android_ripple={{color: '#bbbbbb'}}>
              <Image
                style={styles.icon}
                source={require('../assets/images/Back.png')}
                resizeMode="stretch"
              />
            </Pressable>
          </View>

          {/* <View style={styles.box}>
            <Pressable
              onPress={props.onPressFunctionSetting}
              android_ripple={{color: '#bbbbbb'}}>
             
              <Image
                style={{height: 16, width: 5}}
                source={require('../assets/images/Setting.png')}
                resizeMode="stretch" m
              />
            </Pressable>
          </View> */}
        </View>
      </View>

      <View header_view>
        {/* <Text style = {[{fontSize: {...props.fontSize}},styles.title]}>{props.title}</Text> */}

        <Text
          style={[{fontSize: props.fontSize}, styles.title, {...props.style}]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    //height:'10%',
    alignItems: 'center',
    justifyContent: 'center',
    //flex:1,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(10),
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(30),
    //backgroundColor:'pink'
  },

  text: {
    color: 'black',
    fontSize: scale(25),
    fontFamily: 'Wallpoet-Regular',
  },

  iconmoney_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  option_view: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  box: {
    width: '30%',
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',
  },

  icon_money: {
    width: scale(50),
    height: scale(50),
  },

  title: {
    color: 'black',
  },

  icon: {
    width: scale(16),
    height: scale(16),
    //color: 'blue',
  },
});

export default Header;
