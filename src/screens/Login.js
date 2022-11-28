import React from 'react';
import { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  StatusBar,
} from 'react-native';
import LoginGoogle from '../auth/GoogleSignIn';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onRegister = () => {
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
          //console.log(pass2);
          if (pass == pass2.password) {
            //console.log('success');
            navigation.navigate('HomeScreen');
          } else {
            //console.log('wrong password');
            Alert.alert(
              'Waring',
              'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
            );
          }
        } else {
          //console.log('user not found');
          Alert.alert(
            'Waring',
            'Tài khoản không tồn tại. Vui lòng đăng kí tài khoản mới!',
          );
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <KeyboardAvoidingView style={styles.body} >
      <ScrollView>
        <View style={styles.title_view}>
          <View style={styles.icon1_view}>
            <Image
              style={styles.icon_money}
              source={require('../assets/images/icon_money.png')}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.label_view}>
            <View style={styles.label}>
              <Text style={{ fontFamily: 'Wallpoet-Regular', color: 'black', fontSize: scale(20) }}>MY ASSET</Text>
            </View>
          </View>
        </View>

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
            placeholderStyle={{color: 'grey'}}
            onChangeText={value => setName(value)}
            value={name}
            right={
              <TextInput.Icon icon={require('../assets/images/user2.png')} />
            }
          />
        </View>

        <View style={styles.body_view}>
          <TextInput
            style={styles.TextInput_style}
            placeholder="Mật khẩu"
            placeholderTextColor={'grey'}
            secureTextEntry={passwordVisible}
            onChangeText={value => setPassword(value)}
            value={password}
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

        <View style={[styles.body_view,{paddingTop:scale(10)}]}>
          <View style={styles.forgetpass}>
            <Pressable>
              <Text style={[{textAlign: 'center', opacity: 0.5}, styles.text]}>
                Quên mật khẩu
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.body_view}>
          <CustomButton
            style={{width: 150, height: 40}}
            title={'Đăng nhập'}
            onPressFunction={() => {
              LoginUser(name, password);
            }}
          />
        </View>

        <View style={[styles.body_view,{padding:10}]}>
            <CustomButton
              style={{width: '60%', height: scale(40)}}
              title={'Đăng kí tài khoản mới'}
              onPressFunction={onRegister}
            />
        </View>

        {/* <View style={styles.body_view}> */}
          <LoginGoogle navigation={navigation} />
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    //paddingBottom:20,
  },

  text: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  image: {
    width: '80%',
    height: 300,
    //marginTop: 5,
    alignItems: 'center',
  },

  title_view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    backgroundColor: '#ffffff',
  },

  label: {
    borderWidth: 4,
    borderRadius: 20,
    borderColor: '#FFC700',
    height: scale(50),
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
  },

  label_view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
    //marginRight: 20,
    backgroundColor:'#ffffff',
  },

  icon1_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffffff'

  },

  icon_money: {
    width: scale(70),
    height:scale(70),
  },

  body_view: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 1,
    padding: scale(3),
  },

  TextInput_style: {
    borderBottomColor: 'black',
    width: '70%',
    backgroundColor: '#ffffff',
    //fontSize:18,
  },

  forgetpass: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '50%',
    backgroundColor: '#ffffff',
  },
});
