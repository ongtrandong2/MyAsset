import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
export default function ChangePassword({navigation}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
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
            .set({password: newPassword}, {merge: true});
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
          style={{color: 'black', fontFamily: 'Inter-Bold'}}
        />
        <View style={[styles.row, {paddingTop: scale(35)}]}>
          <View style={styles.title}>
            <Text style={styles.text}>1. Mật khẩu cũ</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.change_box}
            placeholder="Mật khẩu cũ"
            placeholderTextColor={'grey'}
            secureTextEntry={passwordVisible}
            
            onChangeText={value => setOldPassword(value)}
            value={oldPassword}
          />
        </View>

        <View style={[styles.row, {paddingTop: scale(30)}]}>
          <View style={styles.title}>
            <Text style={styles.text}>2. Mật khẩu mới</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.change_box}
            placeholder="Mật khẩu mới "
            placeholderTextColor={'grey'}
            secureTextEntry={passwordVisible}
            onChangeText={value => setNewPassword(value)}
            value={newPassword}
          />
        </View>

        <View style={[styles.row, {paddingTop: scale(30)}]}>
          <View style={styles.title}>
            <Text style={styles.text}>3. Xác nhận mật khẩu mới</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.change_box}
            placeholder="Mật khẩu cũ"
            placeholderTextColor={'grey'}
            secureTextEntry={passwordVisible}
            onChangeText={value => setConfirmPassword(value)}
            value={confirmPassword}
          />
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
            onPressFunction={() =>
              onChangePassword(oldPassword, newPassword, confirmPassword)
            }
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
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
});
