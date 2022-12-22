import React from 'react';
import {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import LoginGoogle from '../auth/GoogleSignIn';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  const LoginUser = async (email, password) => {
    if (email.length === 0 || password.length === 0) {
      //Alert.alert('Warning!', 'Vui lòng nhập dữ liệu!');
      ToastAndroid.showWithGravity(
        'Vui lòng nhập dữ liệu!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (firebase.auth().currentUser.emailVerified) {
            navigation.navigate('Drawer');
          } else {
            //Alert.alert('Warning!', 'Vui lòng xác nhận email!');
            ToastAndroid.showWithGravity(
              'Vui lòng xác nhận email!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }
        })
        .catch(error => {
          //Alert.alert('Warning!', error.message);
          ToastAndroid.showWithGravity(
            'Tài khoản hoặc mật khẩu chưa đúng!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        });
    }
  };

  useEffect(()=>{
    createChannels();
  },[])

  const createChannels = () =>{
    PushNotification.createChannel({
      channelId: "plan",
      channelName: "plan-channel",

    })
  }
  return (
    <KeyboardAvoidingView style={styles.body}>
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
              <Text
                style={{
                  fontFamily: 'Wallpoet-Regular',
                  color: 'black',
                  fontSize: scale(20),
                }}>
                MY ASSET
              </Text>
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
            placeholder="Email"
            placeholderTextColor={'grey'}
            onChangeText={value => setEmail(value)}
            value={email}
            left={
              <TextInput.Icon
                icon={() => <Fontisto name="email" size={24} color="black" />}
              />
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
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons name="md-key-outline" size={24} color="black" />
                )}
              />
            }
            right={
              <TextInput.Icon
                icon={
                  passwordVisible
                    ? () => <Feather name="eye-off" size={24} color="black" />
                    : () => <Feather name="eye" size={24} color="black" />
                }
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        <View style={[styles.body_view, {paddingTop: scale(10)}]}>
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
            style={{width: '40%', height: scale(40)}}
            title={'Đăng nhập'}
            colorPress={'#FFC700'}
            colorUnpress={'#ffdc61'}
            text_style={styles.text_style}
            onPressFunction={() => {
              LoginUser(email, password);
            }}
          />
        </View>

        <View style={[styles.body_view, {padding: 10}]}>
          <CustomButton
            style={{width: '60%', height: scale(40)}}
            title={'Đăng kí tài khoản mới'}
            colorPress={'#FFC700'}
            colorUnpress={'#ffdc61'}
            text_style={styles.text_style}
            onPressFunction={onRegister}
          />
        </View>
   
      <LoginGoogle navigation={navigation} />
    
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
    backgroundColor: '#ffffff',
  },

  label_view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
    marginRight: scale(100),
    backgroundColor: '#ffffff',
  },

  icon1_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffffff',
  },

  icon_money: {
    width: scale(70),
    height: scale(70),
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
    width: '80%',
    //height:scale(60),
    backgroundColor: '#ffffff',
    fontSize: scale(20),
  },

  forgetpass: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '50%',
    backgroundColor: '#ffffff',
  },
  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
    