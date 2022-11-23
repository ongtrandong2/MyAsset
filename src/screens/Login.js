
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
  StatusBar,
 
} from 'react-native';
import LoginGoogle from '../auth/GoogleSignIn';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';

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
            Alert.alert('Waring','Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu');
          }
        } else {
          //console.log('user not found');
          Alert.alert('Waring','Tài khoản không tồn tại. Vui lòng đăng kí tài khoản mới!')
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.body}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={'transparent'} /> */}
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
            <Text style={[styles.text,{fontFamily:'Wallpoet-Regular'}]}>MY ASSET</Text>
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
            placeholderStyle={{color:'grey'}}
            onChangeText={value => setName(value)}
            value = {name}
            right={
              <TextInput.Icon icon={require('../assets/images/user2.png')} />
            }
          />
        </View>

        <View style={styles.body_view}>
          <TextInput
            style={styles.TextInput_style}
            placeholder="Mật khẩu"
            placeholderStyle={{color:'grey',opacity:0.5}}
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

        <View style={[styles.body_view,{paddingTop:10}]}>
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
              onPressFunction={()=>{LoginUser(name,password)}}
          />
        </View>

        <View style={[styles.body_view,{padding:10}]}>
            <CustomButton
              style={{width: 230, height: 40}}
              title={'Đăng kí tài khoản mới'}
              onPressFunction={onRegister}
            />
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
    //marginTop: 30, //
    paddingTop:35,
    paddingBottom:35,
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
    //margin: 1,
    padding:3,
  },

  TextInput_style: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '70%',
    backgroundColor: '#ffffff',
  },

  forgetpass: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 150,
    backgroundColor: '#ffffff',
  },
});
