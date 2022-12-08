import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import { firebase } from '@react-native-firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { NavigationHelpersContext } from '@react-navigation/native';

export default function InfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    firebase
      .firestore()
      .collection('Accounts')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setEmail(snapshot.data().email);
        } else {
          console.log('No such document!');
        }
      });
  });

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          title={"THÔNG TIN CÁ NHÂN"}
          style={{
            fontSize: scale(25),
            fontWeight: 'bold',
          }}
        />
        <View style={styles.big_row}>
          <View style={styles.title}>
            <View style={styles.circle}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>{name.charAt(0)}</Text>
            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>{name}</Text>
          </View>
        </View>

        <View style={[styles.big_row,{paddingTop: 30}]}>
          <View style={styles.row}>
            <View style={styles.left_box}>
              <Feather
                name='user'
                size={24}
                color='black'
                style={{ paddingBottom: 3, paddingRight: 3 }}
              />
              <Text style={styles.text}>Tên đăng nhập </Text>
            </View>

            <View style={styles.right_box}>
              <Text style={styles.text} numberOfLines={2}>{name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left_box}>
              <Feather
                name='mail'
                size={24}
                color='black'
                style={{ paddingBottom: 3, paddingRight: 3 }}
              />
              <Text style={styles.text}>Email</Text>
            </View>

            <View style={styles.right_box}>
              <Text style={styles.text} numberOfLines={2}>{email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left_box}>
              <Image
                style={{ width: scale(20), height: scale(20), marginRight: 5, marginBottom: 5 }}
                source={require('../assets/images/key.png')}
                resizeMode="stretch"
              />
              <Text style={styles.text}>Mật khẩu</Text>
            </View>

            <View style={styles.right_box}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}
                android_ripple={{ color: '#CCFFFF' }}
                style={({ pressed }) => [{ backgroundColor: pressed ? '#CCFFFF' : 'white' }]}
              >
                <Text style={styles.press_text}>Đổi mật khẩu</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.big_row, { paddingTop: 30}]}>
          <CustomButton
            title={'Chỉnh sửa thông tin cá nhân'}
            style={{ height: scale(40), width: '70%' }}
            colorPress = {'#FFC700'}
            colorUnpress = {'#ffdc61'}
            text_style={styles.text_style}
            onPressFunction={() => { navigation.navigate('ChangeInfo') }}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 12,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',

  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  circle: {
    height: scale(100),
    width: scale(100),
    backgroundColor: 'yellow',
    borderRadius: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Itim-Regular',

  },

  left_box: {
    flexDirection: 'row',
    alignItems: 'flex-end',

  },

  right_box: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  press_text: {
    fontSize: scale(20),
    color: '#0000CC',
    fontFamily: 'Itim-Regular',
    textDecorationLine: 'underline',
  },
  text_style:{
    color: 'black',
    fontSize: scale(18),
    fontWeight: 'bold',
},


})
