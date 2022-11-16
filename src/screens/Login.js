/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import LoginGoogle from '../auth/GoogleSignIn';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onPressHandler = props => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Vui lòng nhập dữ liệu!');
    } else {
      navigation.navigate('WelcomeScreen');
    }
  };

  const onPressHandler_Register = () => {
    navigation.navigate('RegisterScreen');
  };
  const LoginUser = async (user, pass) => {
    firestore()
      .collection('Accounts')
      .doc(user)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists == true) {
          var pass2 = documentSnapshot.data();
          console.log(pass2);
          if (pass == pass2.password) {
            console.log('success');
            navigation.navigate('SuccessScreen');
          } else {
            console.log('wrong password');
          }
        } else {
          console.log('user not found');
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.body}>
      <View style={styles.title_view}>
        <View style={styles.icon1_view}>
          <Image
            style={styles.icon_money}
            source={require('../assets/images/icon_money.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.lable_view}>
          <View style={styles.lable}>
            <Text style={styles.text}>MY ASSET</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.body_view}>
          <Image
            style={styles.image}
            source={require('../assets/images/tai-chinh-gia-dinh.jpeg')}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.body_view}>
          <TextInput
            style={styles.TextInput_style}
            placeholder="Tên đăng nhập"
            onChangeText={value => setName(value)}
            right={
              <TextInput.Icon icon={require('../assets/images/user2.png')} />
            }
          />
        </View>

        <View style={styles.body_view}>
          <TextInput
            style={styles.TextInput_style}
            placeholder="Mật khẩu"
            secureTextEntry={passwordVisible}
            onChangeText={value => setPassword(value)}
            right={
              <TextInput.Icon
                icon={
                  passwordVisible
                    ? require('../assets/images/eye_off.png')
                    : require('../assets/images/eye.png')
                }
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        <View style={styles.body_view}>
          <View style={styles.forgetpass}>
            <Pressable>
              <Text style={[{textAlign: 'center', opacity: 0.5}, styles.text]}>
                Quên mật khẩu
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.body_view}>
          <View style={styles.login_button}>
            <Pressable
              style={{position: 'absolute'}}
              onPress={() => {
                LoginUser(name, password);
              }}
              // onPress={onPressHandler}
              android_ripple={{color: '#996600'}}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.text}> Đăng nhập </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.body_view}>
          <View style={styles.signup_button}>
            <Pressable
              onPress={onPressHandler_Register}
              android_ripple={{color: '#996600'}}>
              <Text style={styles.text}>Đăng kí tài khoản mới</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.body_view}>
          <LoginGoogle navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'flex-start',
    //justifyContent:'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },

  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  image: {
    width: 300,
    height: 300,
    marginTop: 5, //
    alignItems: 'center',
  },

  title_view: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%',
    marginTop: 30, //
    //padding:10,
  },

  lable: {
    borderWidth: 4,
    borderRadius: 20,
    borderColor: '#FFC700',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lable_view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginRight: 20,
  },

  icon1_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 10,
    height: 30,
  },

  icon_money: {
    width: 70,
    height: 70,
  },

  body_view: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    //padding:5,
  },

  TextInput_style: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '70%',
    backgroundColor: '#ffffff',
  },

  login_button: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#BAE8F2',
    backgroundColor: '#FFC700',
    //borderColor: '#331CC2',
    borderColor: '#000000',
  },

  signup_button: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC700',
    borderColor: '#000000',
  },

  forgetpass: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 150,
    backgroundColor: '#ffffff',
  },
});
