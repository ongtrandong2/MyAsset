/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import LoginGoogle from '../auth/GoogleSignIn';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isHaveData, setIsHaveData] = useState(false);
  // useEffect(()=>{
  //   if(firebase.auth().currentUser !== null ){
  //   firebase
  //     .firestore()
  //     .collection('Accounts')
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then(snapshot => {
  //       if(snapshot.exists){
  //         setIsHaveData(snapshot.data().haveData);
  //       } else {
  //         //console.log('No such document!');
  //       }
  //     });}
  // });
  // console.log(isHaveData);
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
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          //console.log('Login!');
          if (firebase.auth().currentUser.emailVerified) {
            // navigation.navigate('Drawer');
            //console.log('Login success!');
            //navigation.navigate('Onboarding');
            firebase
              .firestore()
              .collection('Accounts')
              .doc(firebase.auth().currentUser.uid)
              .get()
              .then(snapshot => {
                if (snapshot.exists) {
                  //setIsHaveData(snapshot.data().haveData);
                  const check = snapshot.data().haveData;
                  if (check === true) {
                    navigation.navigate('Onboarding');
                  } else {
                    firebase
                      .firestore()
                      .collection('Accounts')
                      .doc(firebase.auth().currentUser.uid)
                      .set({haveData: true}, {merge: true});
                    navigation.navigate('FirstInput');
                  }
                } else {
                  console.log('No such document!');
                }
              })
              .catch(error => {
                console.log(error);
              });

            // if (isHaveData === true) {
            //   navigation.navigate('Onboarding');
            // } else {
            //   firebase
            //     .firestore()
            //     .collection('Accounts')
            //     .doc(firebase.auth().currentUser.uid)
            //     .set({ haveData: true }, { merge: true });
            //   navigation.navigate('FirstInput');

            // }
          } else {
            //console.log('Loginfail!');
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

  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'plan',
      channelName: 'plan-channel',
    });
  };
  return (
    <KeyboardAvoidingView style={styles.body}>
      <ScrollView>
        <View style={styles.title_view}>
          <Image
            source={require('../assets/images/icon_money.png')}
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
            }}
          />
          <View style={{marginLeft: 10}}>
            <View style={styles.label}>
              <Text
                style={{
                  color: '#000',
                  fontSize: scale(18),
                  fontFamily: 'Wallpoet-Regular',
                  letterSpacing: 1,
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
            <TouchableOpacity
              onPress={() => {
                firebase
                  .auth()
                  .sendPasswordResetEmail(email)
                  .then(() => {
                    console.log('Email sent!'),
                      ToastAndroid.showWithGravity(
                        'Email đã được gửi đi!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                      );
                  })
                  .catch(err => {
                    Alert.alert(err.message);
                  });
              }}>
              <Text style={[{textAlign: 'center', opacity: 0.5}, styles.text]}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body_view}>
          <CustomButton
            //style={{width: '40%', height: scale(40)}}
            title={'Đăng nhập'}
            colorPress={'#FFC700'}
            colorUnpress={'#FFC700'}
            text_style={styles.text_style}
            onPressFunction={() => {
              LoginUser(email, password);
            }}
          />
        </View>

        <View style={[styles.body_view, {padding: 10}]}>
          <CustomButton
            //style={{width: '60%', height: scale(40)}}
            title={'Đăng kí tài khoản mới'}
            colorPress={'#FFC700'}
            colorUnpress={'#FFC700'}
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
    paddingBottom: 10,
  },

  text: {
    color: 'black',
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },

  image: {
    width: '80%',
    height: 300,
    alignItems: 'center',
  },

  title_view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },

  label: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFC700',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
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
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
});
