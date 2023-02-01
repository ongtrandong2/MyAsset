/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import scale from '../constants/scale';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { resetPlan } from '../Redux/PlanData';
import { resetPossession } from '../Redux/PossessionData';
import { resetImage } from '../Redux/UserImage';
import { resetTotalMoney } from '../Redux/TotalMoney';
import { deleteIO } from '../Redux/IncomeOutcome';
import { resetYear } from '../Redux/Year';



const CustomDrawerItem = props => {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => props.navigation.navigate(props.component)}
      //activeOpacity={0.5}
      //underlayColor='#dddddd'
    >
      {/* <Image
        source={props.icon}
        //resizeMode={'contain'}
        style={{
          height: 20,
          width: 20,
          resizeMode: 'contain',
        }}
      /> */}
      <props.icon_type name={props.icon_name} size={20} color="#000" />
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.log(error))
      .then(() =>{
        dispatch(deleteIO());
        dispatch(resetPlan());
        dispatch(resetPossession());
        dispatch(resetImage());
        dispatch(resetTotalMoney());
        dispatch(resetYear());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [navigation.navigate('Login')],
          }),
        );
      }
    )
      .catch(error => console.log(error));
  };
  const userImage = useSelector(state => state.userImage.value);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          //source={require('../assets/images/avatar2.png')}
          source={{uri: userImage}}
          style={{
            height: scale(100),
            width: scale(100),
            borderRadius: scale(100),
            borderWidth: 1,
            borderColor: 'hsl(0,0%,80%)',
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'hsl(0,0%,70%)',
          alignItem: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
        }}></View>
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: '#ffffff'}}>
        <CustomDrawerItem
          style={styles.itemContainer}
          label={'Thông tin cá nhân'}
          //icon={require('../assets/images/user2.png')}
          icon_type={Feather}
          icon_name={'user'}
          navigation={props.navigation}
          component={'InfoScreen'}
        />
        <CustomDrawerItem
          style={styles.itemContainer}
          label={'Tổng quan'}
          //icon={require('../assets/images/Home.png')}
          icon_type={AntDesign}
          icon_name={'home'}
          navigation={props.navigation}
          component={'HomeScreen'}
        />
        <CustomDrawerItem
          style={styles.itemContainer}
          label={'Hướng dẫn sử dụng'}
          //icon={require('../assets/images/guide.png')}
          icon_type={AntDesign}
          icon_name={'book'}
          navigation={props.navigation}
          component={'UserGuide'}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.signOutContainer}
        onPress={() => {
          onSignOut();
        }}>
        <Text style={[styles.text, {marginLeft: 0}]}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: scale(18),
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
    alignSelf: 'center',
    borderBottomColor: '#000000',
    //marginVertical: scale(10),
    paddingVertical: 15,
    //borderWidth: 1,
  },

  signOutContainer: {
    //height: scale(50),
    width: '60%',
    bottom: scale(50),
    //paddingRight:30,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(0,0%,70%)',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
export default CustomDrawer;
