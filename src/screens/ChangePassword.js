import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
export default function ChangePassword({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection('Accounts')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setCurrentPassword(snapshot.data().password);
        } else {
          //console.log('No such document!');
        }
      });
  });
  const onChangePassword = async (
    oldPassword,
    newPassword,
    confirmPassword,
  ) => {
    console.log('1');
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      ToastAndroid.showWithGravity(
        'Vui lòng nhập dữ liệu!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      console.log('2');
    } else if (oldPassword !== currentPassword) {
      console.log(currentPassword);
      console.log(oldPassword);
      ToastAndroid.showWithGravity(
        'Mật khẩu cũ không chính xác!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      console.log('3');
    } else if (newPassword === oldPassword) {
      ToastAndroid.showWithGravity(
        'Mật khẩu mới không được trùng với mật khẩu cũ!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      console.log('4');
    } else if (newPassword !== confirmPassword) {
      ToastAndroid.showWithGravity(
        'Mật khẩu mới không trùng với mật khẩu xác nhận!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      console.log('5');
    } else {
      //var user = firebase.auth().currentUser;
      console.log('7');
      firebase
        .auth()
        .currentUser.updatePassword(newPassword)
        .then(() => {
          //Alert.alert('Thành công!', 'Đổi mật khẩu thành công!');
          ToastAndroid.showWithGravity(
            'Đổi mật khẩu thành công!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        })
        .catch(error => {
          console.log(error);
        })
        .catch(error => {
          //console.log(error);
        })
        .then(() => {
          console.log('8');
          firebase
            .firestore()
            .collection('Accounts')
            .doc(firebase.auth().currentUser.uid)
            .set({ password: newPassword }, { merge: true });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <Header
          onPressFunctionBack={() => navigation.navigate('InfoScreen')}
          fontSize={scale(18)}
          title="ĐỔI MẬT KHẨU"
          style={{ color: 'black', fontFamily: 'Inter-Bold' }}
        />
        <View style={[styles.row, { paddingTop: scale(35) }]}>
          <View style={styles.title}>
            <Text style={styles.text}>1. Mật khẩu cũ</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.change_box}>
            <TextInput
              style={styles.textInputStyle}
              value={oldPassword}
              onChangeText={value => setOldPassword(value)}
              secureTextEntry={!showOld}
            />
            <TouchableOpacity
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowOld(!showOld)}>
              <Feather
                name={showOld ? 'eye' : 'eye-off'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.row, { paddingTop: scale(30) }]}>
          <View style={styles.title}>
            <Text style={styles.text}>2. Mật khẩu mới</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.change_box}>
            <TextInput
              style={styles.textInputStyle}
              value={newPassword}
              onChangeText={value => setNewPassword(value)}
              secureTextEntry={!showNew}
            />
            <TouchableOpacity
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowNew(!showNew)}>
              <Feather
                name={showNew ? 'eye' : 'eye-off'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {newPassword.length < 6 && newPassword != "" ? (
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Feather
              name="x-circle"
              size={20}
              color="red"
              style={{
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: scale(18),
                fontWeight: '500',
              }}>
              Mật khẩu phải có tối đa 6 ký tự!
            </Text>
          </View>
        ) : null}


        <View style={[styles.row, { paddingTop: scale(30) }]}>
          <View style={styles.title}>
            <Text style={styles.text}>3. Xác nhận mật khẩu mới</Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.change_box}>
            <TextInput
              style={styles.textInputStyle}
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowConfirm(!showConfirm)}>
              <Feather
                name={showConfirm ? 'eye' : 'eye-off'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingTop: scale(30),
            alignItems: 'center',
            paddingBottom: scale(30),
          }}>
          <CustomButton
            title={'Lưu thay đổi'}
            //style={{height: scale(40), width: scale(220)}}
            colorPress={'#FFC700'}
            colorUnpress={'#ffd954'}
            text_style={styles.text_style}
            onPressFunction={() => {
              onChangePassword(oldPassword, newPassword, confirmPassword);
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
  },
  text: {
    fontSize: scale(18),
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: scale(30),
    paddingVertical: scale(5),
    alignItems: 'center',
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  change_box: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#FFC700',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: scale(20),
    fontSize: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
  box: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FFC700',
    borderRadius: 20,
    width: '100%',
  },
  textInputStyle: {
    fontSize: scale(18),
    color: '#000',
    paddingVertical: 10,
    width: '90%',
    //borderWidth: 1,
  },
});