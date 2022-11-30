import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, StatusBar, Pressable, Image, KeyboardAvoidingView} from 'react-native';


import CustomButton from '../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import { RadioButton} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {IncreaseTotal, DecreaseTotal} from '../Redux/TotalMoney';
import PossessionData, { addPossession } from '../Redux/PossessionData';

import generateUUID from '../constants/generateUUID';
import scale from '../constants/scale';

import { addData } from '../Redux/IncomeOutcome';
import { IncreaseCurrentUse } from '../Redux/PlanData';
import moment from 'moment';

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
    const [flag, setFlag] = useState(false);
    
  
    const IncomeOutCome = useSelector(state=> state.IncomeOutCome);
    const planData = useSelector (state => state.planData);
    const dispatch = useDispatch();
  
    const [checked, setChecked] = useState('first');
    const [currentDate, setCurrentDate] = useState(new Date()); //
  
    //console.log(incomeData);
    //console.log(possessionData);
    //console.log(IncomeOutCome);
    console.log(planData);
    const onSaveIncome = () => {
      if (incomeName !== '' && incomeValue !== '') {
        setCurrentDate(new Date());
        dispatch(
          addData({
            key: generateUUID(),
            name: incomeName,
            value: incomeValue,
            isIncome: true,
            isPossession: false,
            time: moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
          }),
        );
  
        dispatch(IncreaseTotal(Number(incomeValue)));
       
        setIncomeName('');
        setIncomeValue('');
        
      }
      
    };

    const onSavePossession = () =>{
      if (possessionName!== '' && possessionValue!== '' ) {
        setCurrentDate(new Date());
        dispatch(
          addPossession({
            key: generateUUID(),
            name: possessionName,
            value: possessionValue,
            note: note,
          }),
        );

        dispatch(
          addData({
            key: generateUUID(),
            name: possessionName,
            value: possessionValue,
            isIncome: false, 
            isPossession: true,
            time:moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
          }),
        );

        dispatch(DecreaseTotal(Number(possessionValue)));
        let  d1 = new Date(moment(currentDate).format("YYYY-MM-DD"));
        planData.map((item, index)=>{
            let  d2 = new Date(item.dateStart);
            let  d3 = new Date(item.dateFinish)
            if( d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime())
            {
                dispatch(IncreaseCurrentUse({
                  index: index,
                  value: Number(possessionValue),
                }));
            }
        })
        
        

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
      <KeyboardAvoidingView style={styles.view}>
        <ScrollView>
        
        <View style={styles.title_view}>
          <Text style={styles.text}>SINH HOẠT</Text>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: scale(20), color: '#000000'}}>1.Khoản thu :</Text>

            {flag === true ? (
              <View style={styles.customDropList}>
                <TextInput
                  style={[styles.textInput_box, { borderBottomWidth: 0, width:'90%', padding:0, fontSize:scale(18) }]}
                  placeholder='Nhập Khoản thu khác'
                  onChangeText={setIncomeName}
                  value={incomeName}
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
              data={data_in}
              maxHeight={300}
              labelField="value"
              valueField="key"
              placeholder={!isFocus ? incomeName : '...'}
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
            <Text style={{fontSize: scale(20), color: '#000000'}}>2.Số tiền:</Text>
            <TextInput
              style={styles.textInput_box}
              onChangeText={setIncomeValue}
              value={incomeValue}
            />
          </View>
        </View>
  
        <View style={[styles.row,{paddingTop:scale(10)}]}>
          <CustomButton
            style={{height: scale(30), width: '20%'}}
            title={'Lưu'}
            onPressFunction={() => onSaveIncome()}
          />
        </View>
  
        <View style={[styles.title_view,{marginTop: scale(10) }]}>
          <Text style={styles.text}>TÀI SẢN</Text>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: scale(20), color: '#000000'}}>1.Tên hiện vật:</Text>
  
            <TextInput 
              style={styles.textInput_box} 
              onChangeText = {setPossessionName}
              value={possessionName}
            />
          </View>
        </View>
  
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: scale(20), color: '#000000'}}>2.Nguồn tiền:</Text>
  
            <View style={styles.checkbox_row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('first') , setPossessionValue('')} }
                color={'black'}
              />
              <Text style={{fontSize: scale(20), color: '#000000'}}>Cá nhân</Text>
           
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => {setChecked('second'), setPossessionValue('0')}}
                color={'black'}
              />
              <Text style={{fontSize: scale(20), color: '#000000'}}>Khác</Text>
            </View>
          </View>
        </View>
        

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Image
              style = {{height:scale(10),width:scale(10)}}
              source={require('../assets/images/dot.png')}
              resizeMode='stretch'
              
            />
            <Text style={{fontSize: scale(20), color: '#000000'}}>Số tiền:</Text>
  
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
            <Text style={{fontSize: scale(20), color: '#000000'}}>3.Ghi chú:</Text>
  
            <TextInput 
                style={styles.textInput_box} 
                onChangeText = {setNote}
                value={note}

            />
          </View>
        </View>
              

        <View style={[styles.row,{paddingTop: scale(10), paddingBottom:scale(100)}]}>
          <CustomButton
            style={{ height: 30, width: '20%' }}
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
      justifyContent:'space-between',
      //marginTop:10,
      height: scale(50),
      //marginHorizontal: 45,
      //backgroundColor:'pink',
      width: '90%',
      //padding: 10,
      alignItems: 'flex-end',
    },
  
    textInput_box: {
      //marginHorizontal: 10,
      height: scale(30),
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
      //borderRadius: 8,
      //paddingHorizontal:scale(8),
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
    checkbox_row: {
      flexDirection: 'row',
      //backgroundColor:'blue',
      width: '60%',
      height: scale(30),
      marginHorizontal: scale(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });
  