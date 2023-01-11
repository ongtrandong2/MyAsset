import React, {useEffect, useState} from 'react';

import { View, StyleSheet, Text, TextInput, Keyboard, Alert, ToastAndroid, } from 'react-native';
import {Directions, ScrollView} from 'react-native-gesture-handler';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import {firebase} from '@react-native-firebase/auth';

export default function RegisterScreen({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const CheckData = () => {
    if (
      name.length === 0 ||
      password.length === 0 ||
      confirm.length === 0 ||
      email.length === 0
    ) {
      //Alert.alert('Warning!', 'Vui lòng nhập dữ liệu!');
      ToastAndroid.showWithGravity(
        'Vui lòng nhập dữ liệu!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else if (
      password.length != 0 &&
      confirm.length != 0 &&
      password != confirm
    ) {
      //Alert.alert('Warning!', 'Xác nhận mật khẩu không khớp!');
      ToastAndroid.showWithGravity(
        'Xác nhận mật khẩu không khớp!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .auth()
            .currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: 'https://myasset-5493e.firebaseapp.com',
            })
            .then(() => {
              //Alert.alert('Đã gửi email xác nhận!\nVui lòng kiểm tra email và thư rác\nđể có link xác nhận!',);
              ToastAndroid.showWithGravity(
                'Đã gửi email xác nhận!\nVui lòng kiểm tra email \nvà thư rác để có link xác nhận!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            })
            .catch(error => {
              Alert.alert(error.message);
            })
            .then(() => {
              firebase
                .firestore()
                .collection('Accounts')
                .doc(firebase.auth().currentUser.uid)
                .set({
                  name: name,
                  password: password,
                  email: email,
                  verified: true,
                });
            });
        })
        .catch(error => {
          Alert.alert(error.message);
        })
        .then(() => {
          navigation.navigate('Login');
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <Header
          onPressFunctionBack={onPressHandler}
          fontSize={scale(25)}
          title={'Đăng kí tài khoản mới'}
          style={{ color: 'black', fontFamily: 'Inter-Bold' }}
        />
        <View style={styles.text_view}>
          <Text style={styles.text}>
            1. Tên người dùng: 
            <Text style={{color: 'red'}}> *</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textinput_style}
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={styles.text_view}>
          <Text style={styles.text}>
            2. Email:
            <Text style={{color: 'red'}}> *</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textinput_style}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View style={styles.text_view}>
          <Text style={styles.text}>
            3. Mật khẩu:
            <Text style={{color: 'red'}}> *</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textinput_style}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
        </View>

        <View style={styles.text_view}>
          <Text style={styles.text}>
            4. Xác nhận mật khẩu:
            <Text style={{color: 'red'}}> *</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textinput_style}
            secureTextEntry
            onChangeText={value => setConfirm(value)}
          />
        </View>

        <View style={styles.row_button}>
          <CustomButton
            style={{width: '40%', height: scale(40)}}
            title={'Tạo tài khoản'}
            colorPress={'#FFC700'}
            colorUnpress={'#FFC700'}
            text_style={styles.text_style}
            onPressFunction={CheckData}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   flexDirection: 'column',
  //   backgroundColor: '#ffffff',
  // },

  view: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingTop: scale(20),
  },

  text: {
    color: 'black',
    fontSize: scale(20),
  },

  row: {
    flexDirection: 'row',
    //margin: 5,
    justifyContent: 'center',
  },

  row_button: {
    flexDirection: 'row',
    marginTop: scale(20),
    justifyContent: 'center',
  },

  text_view: {
    alignItems: 'flex-start',
    marginHorizontal: scale(45),
    marginTop: scale(20),
  },

  textinput_style: {
    borderWidth: 2,
    borderColor: '#FFC700',
    width: '80%',
    height: scale(50),
    borderRadius: 10,
    marginTop: scale(10),
    padding: scale(10),
    fontSize: scale(20),
  },

  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontFamily:'Inter-Bold',
  },
});
