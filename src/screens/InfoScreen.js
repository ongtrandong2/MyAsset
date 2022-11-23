import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default function InfoScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Header
        onPressFunctionBack={() => navigation.navigate('HomeScreen')}
        fontSize={20}
        title="THÔNG TIN CÁ NHÂN"
      />


      <View style={styles.big_row}>

        <View style={styles.title}>
          <View style={styles.circle}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', color: "black" }}>Đ</Text>
          </View>

          <View style={styles.name_box}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>ĐÔNG ĐÔNG</Text>
          </View>
        </View>


        <View style={[styles.row, { height: 10 }]}>

        </View>

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={require('../assets/images/user2.png')}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: 40, width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Tên đăng nhập</Text>
            </View>
          </View>

          <View style={styles.right_box}>
            <Text style={styles.text}>Đông Đông</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: 30, height: 30, marginRight: 5,justifyContent:'flex-end' }}
              source={{uri:'https://img.icons8.com/ios/50/null/secured-letter--v1.png'}}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: 40, width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Email</Text>
            </View>
          </View>

          <View style={[styles.right_box,{width:200}]}>
            <Text style={styles.text}>dongdong@gmail.com</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left_box}>
            <Image
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={require('../assets/images/key.png')}
              resizeMode="stretch"
            />
            {/* <Text style = {{fontSize:30}}>Hello</Text> */}
            <View style={{ height: 40, width: '90%', justifyContent: 'flex-end', }} >
              <Text style={styles.text}>Mật khẩu</Text>
            </View>
          </View>

          <View style={styles.right_box}>
            <Pressable
              onPress={()=>{navigation.navigate('ChangePassword')}}
              android_ripple={{color: '#CCFFFF'}}
              style={({pressed}) => [{backgroundColor: pressed ? '#CCFFFF' : 'white'}]}
            >
                <Text style={styles.press_text}>Đổi mật khẩu</Text>
            </Pressable>
          </View>

        </View>
      </View>

      <View style = {[styles.big_row, {paddingTop:30}]}>
          <CustomButton
              title = {'Chỉnh sửa thông tin cá nhân'}
              style = {{height: 40, width: 250}}
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
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Itim-Regular'
  },

  big_row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    //padding:10,
    //backgroundColor:'pink',
    //paddingHorizontal:10,
    width: '90%',
    marginTop: 10,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'

  },
  title: {
    flexDirection: 'row',
    //backgroundColor:'pink',
    width: '90%',
    height: 100,
    marginTop: 30,
    justifyContent: 'space-between',
    //justifyContent:'center',
    alignItems: 'center',
    padding: 10,

  },

  circle: {

    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'yellow',
    //marginLeft:10,
    alignItems: 'center',
    justifyContent: 'center',

  },

  name_box: {
    width: 200,
    height: 40,
    //backgroundColor:'yellow',

  },

  left_box: {
    width: 140,
    height: 40,
    //backgroundColor:'blue',
    marginLeft: 10,
    alignItems: 'center',
    //justifyContent:'center',
    flexDirection: 'row',

  },

  right_box: {
    width: 140,
    height: 50,
    //backgroundColor:'pink',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 5,
  },
  press_text:{
    fontSize: 20,
    color: '#0000CC',
    //fontStyle:'italic',
    fontFamily: 'Itim-Regular',
    textDecorationLine:'underline',

  },

});

