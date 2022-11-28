import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, StatusBar, Modal, Image, KeyboardAvoidingView } from 'react-native';

import CustomButton from '../components/CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import scale from '../constants/scale';

import { useSelector, useDispatch } from 'react-redux';

import { addOutcome } from '../Redux/OutcomeData';
import {addIncome} from '../Redux/IncomeData';
import { IncreaseTotal, DecreaseTotal } from '../Redux/TotalMoney';
import { addPossession, removePossession } from '../Redux/PossessionData';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import generateUUID from '../constants/generateUUID';


const data_out = [
  { key: '1', value: 'Ăn uống' },
  { key: '2', value: 'Quần áo' },
  { key: '3', value: 'Mua Sắm' },
  { key: '4', value: 'Giao thông' },
  { key: '5', value: 'Nhà ở' },
  { key: '6', value: 'Du lịch' },
  { key: '7', value: 'Giáo dục' },
  { key: '8', value: 'Khác' },
];

export default function Outcome() {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);

  const [outcomeName, setOutcomeName] = useState('');
  const [outcomeValue, setOutcomeValue] = useState('');
  const [possessionName, setPossessionName] = useState('');
  const [possessionValue, setPossessionValue] = useState(''); 
  const [number1, setNumber1] = useState(0);
  const [keyDelete, setKeyDelete] = useState(0);

  const [flag, setFlag] = useState(false);
  
  const outcomeData = useSelector(state => state.outcomeData);
  const possessionData = useSelector(state =>state.possessionData);
  const dispatch = useDispatch();

  //console.log(outcomeData);
  //console.log(keyDelete);
 

  const onSaveOutcome = () => {
    if (outcomeName !== '' && outcomeValue !== '') {
      
      dispatch(
        addOutcome({
          key: generateUUID(),
          name: outcomeName,
          value: outcomeValue,
          flag:1,
        }),
      );

      dispatch(DecreaseTotal(Number(outcomeValue)));
      setOutcomeName('');
      setOutcomeValue('');
    }  
  };

  
  const Check = (props) => {
    if (props.value === 'Khác') {
      setFlag(true);
      setOutcomeName('');
    }
    else {
      setOutcomeName(props.value)
    }
    setIsFocus(false);
  }

  const onSavePossession = () =>{
    if (possessionName!== '' && possessionValue!== '') {
      let index = possessionData.map(index => index.key).indexOf(keyDelete);
      //console.log(index);
      dispatch(removePossession(index));     
     //setNumber1(number1+1);
      dispatch(
        addIncome({
          key: generateUUID(),
          name: possessionName,
          value: possessionValue,
          flag:0,
        }),
      );

      dispatch(IncreaseTotal(Number(possessionValue)));
      setPossessionName('');
      setPossessionValue('');
      
    }
  }

  return (

    <KeyboardAvoidingView style={styles.view}>
     
      <ScrollView>
        <View style={styles.title_view}>
          <Text style={styles.text}>SINH HOẠT</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{ fontSize: scale(20), color: '#000000' }}>1.Khoản chi:</Text>


             {flag === true ? (
              <View style={styles.customDropList}>
                <TextInput
                  style={[styles.textInput_box, { borderBottomWidth: 0, width:'90%', padding:0, fontSize:scale(15) }]}
                  placeholder='Nhập Khoản chi khác'
                  onChangeText={setOutcomeName}
                  value={outcomeName}
                />
                <Pressable
                  onPress={() => setFlag(false)}
                  android_ripple={{ color: 'grey' }}
                >
                  <Image
                    style={{ height: scale(20), width: scale(20) }}
                    source={{ uri: 'https://img.icons8.com/pastel-glyph/64/null/expand-arrow.png' }}
                    resizeMode="stretch"
                  />

                </Pressable>
              </View>

            ) :  


            <Dropdown
              style={styles.dropdown}
              placeholderStyle={{fontSize: scale(18), color:'black'}}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data_out}
              //search //show or hide the input seacrh
              dropdownPosition='auto'
              maxHeight={300}
              labelField="value" //extract the data from data item
              valueField="key" // extract the primay key from data item
              placeholder={!isFocus ? outcomeName: '...'}
              searchPlaceholder="Search..."
              value={outcomeName} //
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              // onChange={item => {
              //     setOutcomeName(item.value); //
              //     setIsFocus(false);
              // }}

              onChange={(item)=>Check(item)}
            />}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{ fontSize: scale(20), color: '#000000' }}>2.Số tiền: </Text>
            <TextInput
              style={styles.textInput_box}
              onChangeText={setOutcomeValue}
              value={outcomeValue}
            />
          </View>
        </View>
        <View style={[styles.row,{paddingTop:scale(10)}]}>
          <CustomButton
            style={{ height: scale(30), width: '20%' }}
            title={'Lưu'}
            onPressFunction={onSaveOutcome}
          />
        </View>

        <View style={[styles.title_view, { marginTop: scale(10) }]}>
          <Text style={styles.text}>TÀI SẢN</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{ fontSize:scale(20), color: '#000000' }}>1.Tên hiện vật:</Text>

            {/* <TextInput 
                style={styles.textInput_box}
                onChangeText={setPossessionName}
                value = {possessionName}
            /> */}
            
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={{fontSize:scale(20), color:'black'}}
              selectedTextStyle={styles.selectedTextStyle}
              //inputSearchStyle={styles.inputSearchStyle}
              data={possessionData}
              dropdownPosition='auto'
              maxHeight={300}
              labelField="name" //extract the data from data item
              valueField="key" // extract the primay key from data item
              placeholder={!isFocus1 ? possessionName: '...'}
              searchPlaceholder="Search..."
              value={possessionName} //
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setKeyDelete(item.key); //
                setPossessionName(item.name);
                setIsFocus(false);
              }}

              //onChange={(item)=>Check(item)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{ fontSize: scale(20), color: '#000000' }}>2.Số tiền: </Text>

            <TextInput 
                style={styles.textInput_box} 
                onChangeText={setPossessionValue}
                value = {possessionValue}
                
            />
          </View>
        </View>

        {/* <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{ fontSize: 20, color: '#000000' }}>3.Ghi chú: </Text>
            <TextInput 
                style={styles.textInput_box} 
                onChangeText={setNote}
                value = {note}
            />
          </View>
        </View> */}

        <View style={[styles.row,{paddingTop:scale(10)}]}>
          <CustomButton
            style={{ height: scale(30), width: '20%' }}
            title={'Lưu'}
            onPressFunction={() => onSavePossession()}
          />
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
   // paddingTop:30,
  },
  text: {
    fontSize: scale(20),
    color: '#000000',
  },
  // tab_view: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   top: 10,
    
  // },
  title_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: scale(50),
    backgroundColor: '#FFEFB6',
    marginTop: scale(10),
    borderTopColor: '#FF5C00',
    borderBottomColor: '#FF5C00',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 5,
    paddingTop:scale(5),
    backgroundColor: '#ffffff',
    //backgroundColor:'blue',
    paddingHorizontal:scale(5),
  },

  sub_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop:10,
    height: scale(50),
    //marginHorizontal: 45,
    //backgroundColor:'pink',
    width: '90%',
    //paddingRight: scale(5),
    alignItems: 'flex-end',
  },

  textInput_box: {
    //marginHorizontal: 10,
    height: scale(30),
    //width: '60%',
    width: '60%',
    //backgroundColor:'pink',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: scale(2),
    fontSize: scale(20),
  },
  /// Drop down Style

  dropdown: {
    height: scale(30),
    width: '60%',
    borderColor: 'black',
    borderBottomWidth: 1,
    //paddingHorizontal: 8,
    
  },


  inputSearchStyle: {
    height: scale(40),
    fontSize: scale(18),
    color: '#000000',
  },

  selectedTextStyle: {
    fontSize: scale(18),
    color: 'black',
  },

  customDropList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'pink',
    
    width: '60%',
    height: scale(30),
    alignItems: 'center',
    borderBottomWidth: 1,
    //paddingHorizontal:10,
  },

  // modal_style: {
  //   width: 300,
  //   height: 100,
  //   borderWidth: 1,
  //   backgroundColor: '#ffffff',
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // }
});
