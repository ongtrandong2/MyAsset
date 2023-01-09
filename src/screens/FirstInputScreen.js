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
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function FirstInput({navigation}) {
  //const money = useSelector(state => state.totalMoney.value);
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();

  const [textMoney, setTextMoney] = useState(0);
  const [textName, setTextName] = useState('');
  const [textValue, setTextValue] = useState('');
  const [note, setNote] = useState('');

  //console.log(possessionData);

  const check = () => {
    if (textName !== '' && textValue !== '') {
      //setNumber(number + 1);
      dispatch(
        addPossession({
          key: generateUUID(),
          name: textName,
          value: textValue,
          note: note,
        }),
      );
    }
    setTextName('');
    setTextValue('');
    setNote('');
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

        <View style={styles.row}>
          <Text style={[styles.text_style, {fontSize: scale(22)}]}>
            Số tiền
          </Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.input_box}>
            <TextInput
              style={[styles.text_input, {borderBottomWidth: 0.5}]}
              //underlineColor='black'
              activeUnderlineColor="#A9A9A9"
              placeholder="0"
              placeholderTextColor={'grey'}
              onChangeText={value => setTextMoney(value)}
              value={textMoney}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={[styles.text_style, {fontSize: scale(20)}]}>
            Tài sản
          </Text>
        </View>

        <View style={styles.big_row}>
          {possessionData.map((item, index) => (
            <View style={styles.input_box} key={index}>
              <View style={styles.figure_container}>
                <Text style={[styles.text_style, {color: 'red'}]}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.figure_container}>
                <Text style={styles.text_style}>{item.value}</Text>
              </View>
              <View style={styles.figure_container}>
                <Text style={styles.text_style}>{item.note}</Text>
              </View>
              <Pressable
                style={styles.bin_view}
                onPress={() => dispatch(removePossession(index))}
                android_ripple={{color: '#bbbbbb'}}>
                <EvilIcons name="trash" size={24} color={'#000'} />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.big_row}>
          <View style={styles.input_box}>
            <TextInput
              style={styles.text_input}
              //underlineColor='grey'
              //activeUnderlineColor='#A9A9A9'
              placeholder="Tên"
              placeholderTextColor={'grey'}
              onChangeText={setTextName}
              value={textName}
            />
            <TextInput
              style={styles.text_input}
              //underlineColor='grey'
              //activeUnderlineColor='#A9A9A9'
              placeholder="Trị giá"
              placeholderTextColor={'grey'}
              onChangeText={setTextValue}
              value={textValue}
            />
            <TextInput
              style={styles.text_input}
              //underlineColor='grey'
              //activeUnderlineColor='#A9A9A9'
              placeholder="Ghi chú"
              placeholderTextColor={'grey'}
              onChangeText={setNote}
              value={note}
            />
          </View>
        </View>

        <View style={[styles.big_row, {paddingTop: 10}]}>
          <CustomButton
            colorPress={'#FFC700'}
            colorUnpress={'#ffeba3'}
            text_style={styles.text_style}
            title={'Lưu'}
            onPressFunction={check}
          />
        </View>

        <View style={[styles.big_row, {paddingTop: 10}]}>
          <CustomButton
            //style={{ width: '40%', height: scale(40) }}
            title={'Hoàn tất'}
            colorPress={'#FFC700'}
            colorUnpress={'#ffeba3'}
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
    backgroundColor: '#fff',
    paddingBottom: scale(10),
  },
  text_style: {
    color: '#000',
    fontSize: scale(20),
    fontFamily: 'Inter-Medium',
  },
  title: {
    fontSize: scale(30),
    color: '#FFC700',
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginVertical: 20
  },
  row: {
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
    alignItems: 'flex-start',
    //borderWidth:1,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  input_box: {
    width: '80%',
    borderRadius: 20,
    borderColor: '#FFC700',
    backgroundColor: '#fffdf7',
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  text_input: {
    fontSize: scale(20),
    width: '90%',
    //borderBottomWidth: 0.5,
    //borderBottomColor: '#A9A9A9',
    padding: 2,
    backgroundColor: '#fffdf7',
    height: scale(30),
    marginVertical: 10,
  },
  figure_container: {
    width: '90%',
    backgroundColor: '#fffdf7',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
    marginVertical: 10,
  },
  bin_view: {
    alignItems: 'center',
    marginTop: 5,
  },
  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
