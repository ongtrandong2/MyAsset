import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

import {useSelector, useDispatch} from 'react-redux';
import {UpdateMoney} from '../Redux/TotalMoney';
import {addPossession, removePossession} from '../Redux/PossessionData';
import generateUUID from '../constants/generateUUID';
import scale from '../constants/scale';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FirstInput({navigation}) {
  //const money = useSelector(state => state.totalMoney.value);
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();

  const [textMoney, setTextMoney] = useState(0);

  const [textName, setTextName] = useState('');
  const [textValue, setTextValue] = useState('');
  //const [number, setNumber] = useState(0);

  //console.log(possessionData);

  const check = () => {
    if (textName !== '' && textValue !== '') {
      //setNumber(number + 1);
      dispatch(
        addPossession({
          key: generateUUID(),
          name: textName,
          value: textValue,
          note: null,
        }),
      );
    }
    setTextName('');
    setTextValue('');
  };

  const onComplete = () => {
    if (setTextMoney !== '') {
      dispatch(UpdateMoney(Number(textMoney)));
      navigation.navigate('Drawer');
    } else {
      Alert.alert('Warning! Vui lòng nhập dữ liệu');
    }
  };

  const onPressHandler_Back = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <Header
          onPressFunctionBack={onPressHandler_Back}
          title={'Vui lòng nhập tài sản của bạn!'}
          style={styles.title}
        />
        <View style={styles.text_view}>
          <Text style={styles.text}>Số tiền</Text>
        </View>

        <View style={styles.row}>
          <View style={[{height: scale(50), width: '90%'}, styles.money_box]}>
            <TextInput
              style={styles.textInput_style}
              placeholder="0"
              placeholderTextColor={'grey'}
              onChangeText={value => setTextMoney(value)}
              value={textMoney}
              keyboardType={'numeric'}
            />
          </View>
        </View>

        <View style={styles.second_row}>
          <View style={styles.secondtext_view}>
            <Text style={styles.text}>Hiện vật </Text>
          </View>
        </View>

        {/* Create an array of item list */}

        {possessionData.map((item, index) => {
          return (
            <View style={styles.column} key={index}>
              <View
                style={[{height: scale(200), width: '90%'}, styles.money_box]}>
                <View
                  style={[
                    styles.textInput_item,
                    {
                      borderBottomWidth: 1,
                      alignItems: 'center',
                      borderBottomColor: 'grey',
                    },
                  ]}>
                  <Text
                    style={[styles.text, {color: 'red', fontSize: scale(20)}]}>
                    {item.name}
                  </Text>
                </View>

                <View
                  style={[
                    styles.textInput_item,
                    {
                      borderBottomWidth: 1,
                      alignItems: 'center',
                      borderBottomColor: 'grey',
                    },
                  ]}>
                  <Text style={styles.text}>{item.value}</Text>
                </View>
                <View style={styles.bin_view}>
                  <Pressable
                    onPress={() => dispatch(removePossession(index))}
                    android_ripple={{color: '#bbbbbb'}}>
                    <Image
                      source={require('../assets/images/bin_icon.png')}
                      resizeMode="stretch"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.column}>
          <View style={[{height: scale(200), width: '90%'}, styles.money_box]}>
            <TextInput
              style={styles.textInput_item}
              placeholder="Tên"
              placeholderTextColor={'grey'}
              onChangeText={setTextName}
              value={textName}
            />
            <TextInput
              style={styles.textInput_item}
              placeholder="Trị giá"
              placeholderTextColor={'grey'}
              onChangeText={setTextValue}
              value={textValue}
              keyboardType={'numeric'}
            />
          </View>

          <View style={styles.icon_plus}>
            <Pressable
              onPress={() => check()}
              android_ripple={{color: '#bbbbbb'}}>
              <AntDesign
                name="pluscircleo"
                size={30}
                color={'#000000'}
                style={{
                  paddingVertical: 10,
                }}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.row, {paddingBottom: scale(10)}]}>
          <CustomButton
            style={{width: '40%', height: scale(40)}}
            title={'Hoàn tất'}
            colorPress={'#FFC700'}
            colorUnpress={'#ffdc61'}
            text_style={styles.text_style}
            onPressFunction={onComplete}
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
    paddingTop: scale(20),
  },

  // body: {
  //     flex: 1,
  //     alignItems: 'center',
  //     flexDirection: 'column',
  // },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(30),
  },
  column: {
    justifyContent: 'center',
    flexDirection: 'column',
    margin: scale(5),
    marginHorizontal: scale(30),
    alignItems: 'center',
  },

  title: {
    fontSize: scale(30),
    color: '#FFC700',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  text_view: {
    alignItems: 'flex-start',
    marginHorizontal: scale(45),
    marginTop: scale(20),
  },

  text: {
    fontSize: scale(20),
    color: '#000000',
  },

  textInput_style: {
    height: scale(30),
    width: '80%',
    borderBottomColor: 'black',
    //borderBottomWidth:1,
    backgroundColor: '#ffffff',
    fontSize: scale(20),
    textAlign: 'left',
  },

  textInput_item: {
    height: scale(30),
    width: '80%',
    borderBottomColor: 'black',
    backgroundColor: '#ffffff',
    fontSize: scale(20),
    textAlign: 'left',
    marginVertical: scale(20),
  },

  money_box: {
    borderWidth: 2,
    borderColor: '#FFC700',
    borderRadius: 10,
    marginTop: scale(10),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    //backgroundColor:'pink'
  },

  second_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(20),
    paddingHorizontal: scale(45),
  },

  secondtext_view: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  icon_plus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: scale(5),
  },

  bin_view: {
    alignItems: 'center',
    marginTop: scale(5),
  },
  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
