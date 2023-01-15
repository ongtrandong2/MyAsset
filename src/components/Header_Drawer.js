import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import scale from '../constants/scale';
import Entypo from 'react-native-vector-icons/Entypo';
const HeaderDrawer = props => {
  return (
    <View style={styles.view}>
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/icon_money.png')}
            style={{
              height: scale(50),
              width: scale(50),
              resizeMode: 'contain',
            }}
          />
          <View style={{marginLeft: 5}}>
            <Text style={styles.text}>MY</Text>
            <Text style={styles.text}>ASSET</Text>
          </View>
        </View>
        <Pressable
          style={({pressed}) => [
            {
              height: 30,
              width: 30,
              borderRadius: 50,
              backgroundColor: pressed ? 'hsl(0,0%,90%)' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={props.onPress}>
          <Entypo name="menu" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.title_view}>
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
  },

  title_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    color: 'black',
    fontSize: scale(18),
    fontFamily: 'Wallpoet-Regular',
  },

  title: {
    color: '#000000',
    fontFamily: 'Inter-Bold',
    fontSize: scale(20),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HeaderDrawer;
