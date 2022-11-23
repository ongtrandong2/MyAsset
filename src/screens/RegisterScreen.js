import React, {useState} from 'react';

import {View, StyleSheet, Text, TextInput, Keyboard, Alert} from 'react-native';
import {Directions, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';

export default function RegisterScreen({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const CheckData = () => {
    if (
      name.length === 0 ||
      username.length === 0 ||
      password.length === 0 ||
      confirm.length === 0
    ) {
      Alert.alert('Warning!', 'Vui lòng nhập dữ liệu!');
    } else if (
      password.length != 0 &&
      confirm.length != 0 &&
      password != confirm
    ) {
      Alert.alert('Warning!', 'Xác nhận mật khẩu không khớp!');
    } else {
      firestore()
        .collection('Accounts')
        .doc(username)
        .set({name: name, password: password, email: email})
        .then(() => {
          navigation.navigate('Success');
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      {/* <SafeAreaView> */}
      <Header onPressFunctionBack={onPressHandler} />
      <ScrollView>
        {/* <View style = {styles.container}> */}
        <View style={styles.row}>
          <Text style={{color: 'black', fontSize: 30, marginBottom: 10}}>
            Đăng kí tài khoản mới
          </Text>
        </View>

        <View style={styles.text_view}>
          <Text style={styles.text}>
            1. Tên người dùng
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
            2. Tên đăng nhập
            <Text style={{color: 'red'}}> *</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.textinput_style}
            onChangeText={value => setUsername(value)}
          />
        </View>

        <View style={styles.text_view}>
          <Text style={styles.text}>
            3. Email
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
            4. Mật khẩu
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
            5. Xác nhận mật khẩu
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
            style={{width: 150, height: 40}}
            title={'Tạo tài khoản'}
            onPressFunction={CheckData}
          />
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  text: {
    color: 'black',
    fontSize: 20,
  },

  row: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
  },

  row_button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },

  text_view: {
    textAlign: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 45,
    marginTop: 20,
  },

  textinput_style: {
    borderWidth: 2,
    borderColor: '#FFC700',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    fontSize: 20,
  },
});
