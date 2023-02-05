import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {err} from 'react-native-svg/lib/typescript/xml';

export default function Forgot({navigation}) {
  const [email, setEmail] = useState('');
  const ForgotPassword = email => {
    if (email === '') {
      //console.log('Vui lòng nhập đầy đủ thông tin!');
      ToastAndroid.showWithGravity(
        'Vui lòng nhập đầy đủ thông tin!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          //console.log('Email sent!'),
          ToastAndroid.showWithGravity(
            'Email đã được gửi. Vui lòng đặt lại mật khẩu qua email và đăng nhập lại bằng mật khẩu đó!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        })
        .catch(err => {
          Alert.alert(err.message);
        })
        .then(() => {
          navigation.navigation('LoginScreen');
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      //console.log('Email không hợp lệ!');
      ToastAndroid.showWithGravity(
        'Email không hợp lệ!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <Header
          onPressFunctionBack={() => navigation.navigate('Login')}
          fontSize={scale(18)}
          title="QUÊN MẬT KHẨU"
          style={{color: 'black', fontFamily: 'Inter-Bold'}}
        />

        <View style={[styles.row, {paddingTop: scale(35)}]}>
          <View style={styles.title}>
            <Text style={styles.text}>1. Email:</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.change_box}
            placeholderTextColor="grey"
            placeholder="Nhập email của bạn"
            onChangeText={value => setEmail(value)}
            value={email}
          />
        </View>

        <View style={{paddingTop: scale(30), alignItems: 'center'}}>
          <CustomButton
            title={'Xác Nhận'}
            //style={{ height: scale(40), width: '60%' }}
            colorPress={'#FFC700'}
            colorUnpress={'#ffd954'}
            text_style={styles.text_style}
            onPressFunction={() => {
              ForgotPassword(email);
            }}
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(18),
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  row: {
    flexDirection: 'row',
    //justifyContent:'space-between'
    paddingHorizontal: scale(30),
    paddingVertical: scale(5),
  },
  title: {
    //width:200,
    flex: 2,
    //height:30,
    //backgroundColor:'blue',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  change_box: {
    flex: 2,
    //height:30,
    backgroundColor: 'white',
    borderColor: '#FFC700',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: scale(20),
    fontSize: scale(18),
    color: '#000',
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
});
