import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Modal,
} from 'react-native';

const HeaderTab = (props) => {
  const [showModal,setShowModal] = useState(false);

  return (
    <View style={styles.view}>
      <View style={styles.header_view}>
        <View style={styles.iconmoney_view}>
          <Image
            style={styles.icon_money}
            source={require('../assets/images/icon_money.png')}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.text}>MY ASSET</Text>

        <View style={styles.option_view}>
          <View style={styles.box}>
            <Pressable
              onPress={()=>setShowModal(true)}
              android_ripple={{ color: '#bbbbbb' }}>

              <Image
                style={{ height: 25, width: 25 }}
                //source={require('../assets/images/Setting.png')}
                source={{uri:'https://img.icons8.com/ios-glyphs/30/null/menu-2.png'}}
                resizeMode="stretch"
              />
            </Pressable>
          </View>


          <View style={styles.box}>
            <Pressable
              onPress={props.onPressHandler}
              //onPress={()=>navigation.navigate('InfoScreen')}
              android_ripple={{ color: '#bbbbbb' }}>
              <Image
                style={styles.icon}
                source={require('../assets/images/user2.png')}
                resizeMode="stretch"
              />
            </Pressable>
          </View>


        </View>
      </View>

      <View header_view>
        <Text style={[{ fontSize: props.fontSize }, styles.title]}>
          {props.title}
        </Text>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType='fade'
        onRequestClose={()=>setShowModal(false)}
        statusBarTranslucent
      
      >
        <View style={styles.center_view}>
          <View style={styles.mini_view}>
            <View style={styles.modal_view}>
              <View style={styles.mini_row}>
                <Pressable
                  onPress={()=>setShowModal(false)}
                  android_ripple={{ color: 'grey' }}
                //style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : 'white' }]}
                >
                  <Image
                    style={{ height: 25, width: 25, marginRight: 10, borderRadius: 10 }}
                    source={{ uri: 'https://img.icons8.com/material-outlined/24/null/delete-sign.png' }}

                  />
                </Pressable>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.75 }}>
                <Pressable
                  //onPress={() => { navigation.navigate('ChangePassword') }}
                  android_ripple={{ color: '#C6E2FF' }}
                  style={({ pressed }) => [{ backgroundColor: pressed ? '#C6E2FF' : 'white' }]}
                >
                  <Text style={{ fontSize: 20, fontFamily: 'Itim-Regular', color: 'black', textDecorationLine: 'underline', }}>
                    Đăng xuất</Text>
                </Pressable>
              </View>
            </View>

            {/* </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 10, //
    //backgroundColor:'#2F88FF',
    //position:'relative'
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    color: 'black',
    fontSize: 20,
    //fontWeight: "bold",
    fontFamily: 'Wallpoet-Regular',
  },

  iconmoney_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
    //marginLeft: 5,
    height: '50%',
    width: '70%',
  },

  option_view: {
    flex: 3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: 'red',
    marginLeft: 10,
    height: '50%',
    width: '70%',
  },

  box: {
    width: 30,
    height: 30,
    margin: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon_money: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },

  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },

  icon: {
    width: 20,
    height: 20,
    color: 'blue',
  },

  // modal_view: {
  //   marginLeft: 170,
  //   marginTop: 50,
  //   width: 200,
  //   height: 200,
  //   borderWidth: 1,
  //   borderRadius: 20,
  //   backgroundColor: 'white',
  //},
  ///// Modal 
  center_view: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#00000099',
    flexDirection: 'column',

  },

  modal_view: {
    width: 150,
    height: 150,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    //marginRight:5, 
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column',

  },

  mini_view: {
    flexDirection: 'row',
    //paddingTop: 10,
    alignItems: 'flex-end',
    marginRight: 20,
    paddingTop: 100,

  },

  mini_row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //backgroundColor: 'blue',
    justifyContent: 'flex-end',


  },




});

export default HeaderTab;
