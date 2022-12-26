import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import scale from '../constants/scale';

const CustomDrawerItem = props => {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => props.navigation.navigate(props.component)}
      //activeOpacity={0.5}
      //underlayColor='#dddddd'
    >
      <Image source={props.icon} resizeMode={'stretch'} />
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = props => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/avatar2.png')}
          style={{height: scale(100), width: scale(100)}}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          alignItem: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
        }}></View>
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: '#ffffff'}}>
        <CustomDrawerItem
          style={styles.itemContainer}
          label={'Thông tin cá nhân'}
          icon={require('../assets/images/user2.png')}
          navigation={props.navigation}
          component={'InfoScreen'}
        />
        <CustomDrawerItem
          style={styles.itemContainer}
          label={'Tổng quan'}
          icon={require('../assets/images/Home.png')}
          navigation={props.navigation}
          component={'HomeScreen'}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.signOutContainer}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={[styles.text, {marginLeft: 0}]}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: scale(20),
    marginLeft: scale(20),
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: scale(-5),
  },

  container: {
    flex: 1,
    //backgroundColor:'#fffffff',
    flexDirection: 'column',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: scale(150),
    paddingTop: scale(50),
    paddingBottom: scale(30),
    marginTop: scale(10),
    //backgroundColor:'blue'
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: scale(50),
    alignSelf: 'center',
    //borderBottomWidth:1,
    borderBottomColor: '#000000',
    marginVertical: scale(10),
    //backgroundColor:'blue',
    //justifyContent:'center',
  },

  signOutContainer: {
    height: scale(50),
    width: '60%',
    bottom: scale(50),
    //paddingRight:30,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
export default CustomDrawer;
