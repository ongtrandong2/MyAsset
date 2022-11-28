import React, {useState} from 'react';

import {View, StyleSheet, Text, TextInput, Keyboard, Alert} from 'react-native';
import {Directions, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

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
      confirm.length === 0 ||
      email.length ===0 
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
      
      <ScrollView>
        <Header 
          onPressFunctionBack={onPressHandler} 
          title = {'Đăng kí tài khoản mới'}
          fontSize = {scale(25)}
          />
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
            onChangeText={value => setEmail(value)}
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
            onChangeText={value => setPassword(value)}
          />
        </View>

          <View style={styles.row_button}>
            <CustomButton
              style={{width: '40%', height: scale(40)}}
              title={'Tạo tài khoản'}
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
    backgroundColor : 'white',
    flexDirection:'column',
    paddingTop:scale(20),
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
    borderRadius:10,
    marginTop: scale(10),
    padding: scale(10),
    fontSize: scale(20),
  },
});
