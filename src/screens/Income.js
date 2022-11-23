import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, StatusBar, Pressable, Image} from 'react-native';


import CustomButton from '../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import { RadioButton} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {addIncome} from '../Redux/IncomeData';
import { addOutcome } from '../Redux/OutcomeData';
import {IncreaseTotal, DecreaseTotal} from '../Redux/TotalMoney';
import PossessionData, { addPossession } from '../Redux/PossessionData';

import generateUUID from '../functions/generateUUID';

const data_in = [
    {key: '1', value: 'Tiền Lương'},
    {key: '2', value: 'Cho thuê'},
    {key: '3', value: 'Bán hàng'},
    {key: '4', value: 'Tiền thưởng'},
    {key: '5', value: 'Cổ phiếu'},
    {key: '6', value: 'Phiếu giảm giá'},
    {key: '7', value: 'Vietlott'},
    {key: '8', value: 'Khác'}
  ];
  

  export default function Income() {
    const [isFocus, setIsFocus] = useState(false);
    const [incomeName, setIncomeName] = useState('');
    const [incomeValue, setIncomeValue] = useState('');
    const [possessionName, setPossessionName] = useState('');
    const [possessionValue, setPossessionValue] = useState('');
    const [note,setNote] = useState('');
    //const [number1, setNumber1] = useState(0);
  
    const possessionData = useSelector(state => state.possessionData);
    //const [number2, setNumber2] = useState(possessionData.length);

    const [flag, setFlag] = useState(false);
    
  
    const incomeData = useSelector(state => state.incomeData);
    const outcomeData = useSelector(state => state.outcomeData);
    const dispatch = useDispatch();
  
    const [checked, setChecked] = useState('first');
  
    //console.log(incomeData);
    //console.log(outcomeData);

    //console.log(possessionValue);

    const onSaveIncome = () => {
      if (incomeName !== '' && incomeValue !== '') {
        dispatch(
          addIncome({
            key: generateUUID(),
            name: incomeName,
            value: incomeValue,
            flag:1,
          }),
        );
  
        dispatch(IncreaseTotal(Number(incomeValue)));
        setIncomeName('');
        setIncomeValue('');
      }
      
    };

    const onSavePossession = () =>{
      if (possessionName!== '' && possessionValue!== '' ) {
        dispatch(
          addPossession({
            key: generateUUID(),
            name: possessionName,
            value: possessionValue,
            note: note,
          }),
        );

          dispatch(
            addOutcome({
              key: generateUUID(),
              name: possessionName,
              value: possessionValue,
              flag:0, //possession => flag = 0 
          }),
        );

        dispatch(DecreaseTotal(Number(possessionValue)));

        setPossessionName('');
        setPossessionValue('');
        setNote('');
        setChecked('first');

      }
     
    }
    const Check = (props) => {
      if (props.value === 'Khác') {
        setFlag(true);
        setIncomeName('');
      }
      else {
        setIncomeName(props.value)
      }
      setIsFocus(false);
    }
    
   
    return (
      <View style={styles.view}>
        <ScrollView>
        
        <View style={styles.title_view}>
          <Text style={styles.text}>SINH HOẠT</Text>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản thu :</Text>

            {flag === true ? (
              <View style={styles.customDropList}>
                <TextInput
                  style={[styles.textInput_box, { borderBottomWidth: 0, width:180, padding:0, fontSize:18 }]}
                  placeholder='Nhập Khoản thu khác'
                  onChangeText={setIncomeName}
                  value={incomeName}
                />
                <Pressable
                  onPress={() => setFlag(false)}
                  android_ripple={{ color: 'grey' }}
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={{ uri: 'https://img.icons8.com/pastel-glyph/64/null/expand-arrow.png' }}
                    resizeMode="stretch"
                  />

                </Pressable>
              </View>

            ) : 
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={{fontSize: 18, color:'black'}}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data_in}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="key"
              placeholder={!isFocus ? incomeName : '...'}
              //searchPlaceholder="Search..."
              value={incomeName}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              // onChange={item => {
              //   setIncomeName(item.value);
              //   setIsFocus(false);
              // }}
              onChange={(item)=>Check(item)}
            />}
          </View>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền:</Text>
            <TextInput
              style={styles.textInput_box}
              onChangeText={setIncomeValue}
              value={incomeValue}
            />
          </View>
        </View>
  
        <View style={[styles.row,{paddingTop:10}]}>
          <CustomButton
            style={{height: 30, width: 100}}
            title={'Lưu'}
            onPressFunction={() => onSaveIncome()}
          />
        </View>
  
        <View style={styles.title_view}>
          <Text style={styles.text}>TÀI SẢN</Text>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>1.Tên hiện vật:</Text>
  
            <TextInput 
              style={styles.textInput_box} 
              onChangeText = {setPossessionName}
              value={possessionName}
            />
          </View>
        </View>
  
        <View style={[styles.row,{paddingVertical:0}]}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Nguồn tiền:</Text>
  
            <View style={styles.checkbox_row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('first') , setPossessionValue('')} }
                color={'black'}
              />
              <Text style={{fontSize: 20, color: '#000000', marginTop: 4}}>Cá nhân</Text>
            </View>
  
            <View style={styles.checkbox_row}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => {setChecked('second'), setPossessionValue('0')}}
                color={'black'}
              />
              <Text style={{fontSize: 20, color: '#000000', marginTop: 4}}>Khác</Text>
            </View>
          </View>
        </View>
        

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Image
              style = {{height:10,width:10}}
              source={require('../assets/images/dot.png')}
              resizeMode='stretch'
              
            />
            <Text style={{fontSize: 20, color: '#000000'}}>Số tiền:</Text>
  
            <TextInput 
                style={styles.textInput_box} 
                editable ={ checked=== "first" ? true: false} 
                //onChangeText = {setPossessionValue}
                //value={possessionValue}
                //value={checked ==="first"? possessionValue : "0"}
                onChangeText = {(value)=>{
                  if(checked === "first")
                  {
                    setPossessionValue(value);
                  }
                  else setPossessionValue('');
                }}
                value = {possessionValue}

            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>3.Ghi chú:</Text>
  
            <TextInput 
                style={styles.textInput_box} 
                onChangeText = {setNote}
                value={note}

            />
          </View>
        </View>
              

        <View style={[styles.row,{paddingTop: 10, paddingBottom:100}]}>
          <CustomButton
            style={{ height: 30, width: 100 }}
            title={'Lưu'}
            onPressFunction={() => onSavePossession()}
          />
        </View>


        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    text: {
      fontSize: 20,
      color: '#000000',
    },
    tab_view: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 10,
    },
    title_view: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 50,
      backgroundColor: '#FFEFB6',
      marginTop: 10,
      borderTopColor: '#FF5C00',
      borderBottomColor: '#FF5C00',
      borderTopWidth: 2,
      borderBottomWidth: 2,
    },
    row: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      //padding:10,
      backgroundColor: '#ffffff',
      //backgroundColor:'blue',
    },
  
    sub_row: {
      flexDirection: 'row',
      justifyContent:'space-between',
      //marginTop:10,
      height: 50,
      //marginHorizontal: 45,
      //backgroundColor:'pink',
      width: '90%',
      //padding: 10,
      alignItems: 'flex-end',
    },
  
    textInput_box: {
      marginHorizontal: 10,
      height: 30,
      width: '60%',
      //backgroundColor:'pink',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      padding: 2,
      fontSize: 20,
    },
    /// Drop down Style
  
    dropdown: {
      height: 30,
      width: '60%',
      borderColor: 'black',
      borderBottomWidth: 1,
      //borderRadius: 8,
      paddingHorizontal: 8,
    },
  
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 18,
    },
  
    inputSearchStyle: {
      height: 40,
      fontSize: 18,
      color: '#000000',
    },
  
    selectedTextStyle: {
      fontSize: 18,
      color: 'black',
    },
  
    checkbox_row: {
      flexDirection: 'row',
      //backgroundColor:'pink',
      width: 100,
      height: 30,
      marginHorizontal: 5,
    },

    customDropList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //backgroundColor:'pink',
      //width:'60%',
      width: 220,
      height: 30,
      alignItems: 'center',
      borderBottomWidth: 1,
      //paddingHorizontal:10,
    },
    checkbox_row: {
      flexDirection: 'row',
      //backgroundColor:'pink',
      width: 100,
      height: 30,
      marginHorizontal: 5,
    },
  
  });
  