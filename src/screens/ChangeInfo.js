import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';
import {firebase} from '@react-native-firebase/firestore';

export default function ChangeInfo({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const changeInfo = async (email, name) => {
    console.log('Change info');
    if (email === '' || name === '') {
      //console.log('Vui lòng nhập đầy đủ thông tin!');
      ToastAndroid.showWithGravity(
        'Vui lòng nhập đầy đủ thông tin!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else if (email === firebase.auth().currentUser.email) {
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            name: name,
          },
          {merge: true},
        )
        .then(() => {
          console.log('User updated!');
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
          onPressFunctionBack={() => navigation.navigate('InfoScreen')}
          fontSize={scale(18)}
          title="THAY ĐỔI THÔNG TIN CÁ NHÂN"
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
            onChangeText={value => setEmail(value)}
            value={email}
          />
        </View>

        <View style={[styles.row, {paddingTop: scale(30)}]}>
          <View style={styles.title}>
            <Text style={styles.text}>2. Tên người dùng mới: </Text>
          </View>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.change_box}
            onChangeText={value => setName(value)}
            value={name}
          />
        </View>

        <View style={{paddingTop: scale(30), alignItems: 'center'}}>
          <CustomButton
            title={'Lưu thông tin cá nhân'}
            //style={{ height: scale(40), width: '60%' }}
            colorPress={'#FFC700'}
            colorUnpress={'#ffd954'}
            text_style={styles.text_style}
            onPressFunction={() => {
              changeInfo(email, name);
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
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
});
