import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

import {useEffect} from 'react';
import {useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {doc, getDoc} from 'firebase/firestore';
export default function InfoScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    firebase
      .firestore()
      .collection('Accounts')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setEmail(snapshot.data().email);
        } else {
          console.log('No such document!');
        }
      });
  });
  return (
    <View style={styles.view}>
      <HeaderDrawer
        onPress={() => navigation.openDrawer('HomeScreen')}
        fontSize={scale(20)}
        title="THÔNG TIN CÁ NHÂN"
        style = {{color:'black', fontWeight: 'bold'}}
      />

      <View style={styles.big_row}>
        <View style={styles.title}>
          <View style={styles.circle}>
            <Text style={{ fontSize: scale(50), fontWeight: 'bold', color: "black" }}>{name.charAt(0)}</Text>
          </View>

          <View style={styles.name_box}>
            <Text style={{ fontSize: scale(30), fontWeight: 'bold', color: 'black' }}>{name}</Text>
          </View>
        </View>


        

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: scale(20), height: scale(20), marginRight: 5 }}
              source={require('../assets/images/user2.png')}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: scale(50), width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Tên đăng nhập</Text>
            </View>
          </View>

          <View style={styles.right_box}>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: scale(30), height: scale(30), marginRight: scale(5),justifyContent:'flex-end' }}
              source={{uri:'https://img.icons8.com/ios/50/null/secured-letter--v1.png'}}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: scale(40), width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Email</Text>
            </View>
          </View>

          <View style={[styles.right_box,{height:scale(60),paddingBottom:scale(2)}]}>
            <Text style={styles.text}>{email}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: scale(20), height: scale(20), marginRight: scale(5) }}
              source={require('../assets/images/key.png')}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: scale(40), width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Mật khẩu</Text>
            </View>
          </View>

          <View style={styles.right_box}>
            <Pressable
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              android_ripple={{color: '#CCFFFF'}}
              style={({pressed}) => [{backgroundColor: pressed ? '#CCFFFF' : 'white', marginBottom:2}]}
            >
                <Text style={styles.press_text}>Đổi mật khẩu</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style = {[styles.big_row, {paddingTop:scale(20)}]}>
          <CustomButton
              title = {'Chỉnh sửa thông tin cá nhân'}
              style = {{height: scale(40), width: '80%'}}
              onPressFunction={()=>{navigation.navigate('ChangeInfo')}}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },

  text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },

  big_row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    //padding:10,
    //backgroundColor:'pink',
    //paddingHorizontal:10,
    width: '95%',
    marginTop: scale(20),
    //height: scale(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexWrap:'wrap',

  },
  title: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  circle: {

    width: scale(100),
    height: scale(100),
    borderRadius: scale(100),
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name_box: {
    width: '70%',
    height: scale(100),
    //backgroundColor:'yellow',
    //flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',


  },

  left_box: {
    //width: 140,
    flex:1.25,
    height: scale(60),
    //backgroundColor:'blue',
    //marginLeft: 10,
    alignItems: 'center',
    //justifyContent:'center',
    flexDirection: 'row',
  },

  right_box: {
    //width: 140,
    flex:1.75,
    height: scale(50),
    //backgroundColor:'pink',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    //padding: 5,
  },
  press_text:{
    fontSize: scale(20),
    color: '#0000CC',
    //fontStyle:'italic',
    fontFamily: 'Itim-Regular',
    textDecorationLine: 'underline',
  },
})
