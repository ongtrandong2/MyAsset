import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import HeaderTab from '../components/Header_Tab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomButton from '../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import {Checkbox, RadioButton} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {addIncome} from '../Redux/IncomeData';
import {addOutcome} from '../Redux/OutcomeData';
import {IncreaseTotal, DecreaseTotal} from '../Redux/TotalMoney';

const data_in = [
  {key: '1', value: 'Tiền Lương'},
  {key: '2', value: 'Cho thuê'},
  {key: '3', value: 'Bán hàng'},
  {key: '4', value: 'Tiền thưởng'},
  {key: '5', value: 'Cổ phiếu'},
  {key: '6', value: 'Phiếu giảm giá'},
  {key: '7', value: 'Vietlott'},
];

const data_out = [
  {key: '1', value: 'Ăn uống'},
  {key: '2', value: 'Quần áo'},
  {key: '3', value: 'Mua Sắm'},
  {key: '4', value: 'Giao thông'},
  {key: '5', value: 'Nhà ở'},
  {key: '6', value: 'Du lịch'},
  {key: '7', value: 'Giáo dục'},
];

function Outcome() {
  const [isFocus, setIsFocus] = useState(false);
  const [outcomeName, setOutcomeName] = useState('');
  const [outcomeValue, setOutcomeValue] = useState('');

  const outcomeData = useSelector(state => state.outcomeData);
  const dispatch = useDispatch();

  //console.log(outcomeData);

  const onSaveData = () => {
    if (outcomeName !== '' && outcomeValue !== '') {
      dispatch(
        addOutcome({
          key: outcomeData.length,
          name: outcomeName,
          value: outcomeValue,
        }),
      );

      dispatch(DecreaseTotal(Number(outcomeValue)));
    }

    setOutcomeName('');
    setOutcomeValue('');
  };

  return (
    <View style={styles.view}>
      <ScrollView>
        <View style={styles.title_view}>
          <Text style={styles.text}>SINH HOẠT</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản chi:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={{fontSize: 18}}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data_out}
              //search = {false}//show or hide the input seacrh
              maxHeight={300}
              labelField="value" //extract the data from data item
              valueField="key" // extract the primay key from data item
              placeholder={!isFocus ? 'Chọn khoản chi' : '...'}
              searchPlaceholder="Search..."
              value={outcomeName} //
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setOutcomeName(item.value); //
                setIsFocus(false);
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền: </Text>
            <TextInput
              style={styles.textInput_box}
              onChangeText={setOutcomeValue}
              value={outcomeValue}
            />
          </View>
        </View>
        <View style={styles.row}>
          <CustomButton
            style={{height: 30, width: 100}}
            title={'Lưu'}
            onPressFunction={onSaveData}
          />
        </View>

        <View style={[styles.title_view, {marginTop: 10}]}>
          <Text style={styles.text}>TÀI SẢN</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>
              1.Tên hiện vật:
            </Text>

            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>2.Số tiền: </Text>

            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.sub_row}>
            <Text style={{fontSize: 20, color: '#000000'}}>3.Ghi chú: </Text>
            <TextInput style={styles.textInput_box} />
          </View>
        </View>

        <View style={styles.row}>
          <CustomButton
            style={{height: 30, width: 100}}
            title={'Lưu'}
            onPressFunction={() => onSaveData()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Income() {
  const [isFocus, setIsFocus] = useState(false);
  const [incomeName, setIncomeName] = useState('');
  const [incomeValue, setIncomeValue] = useState('');

  const incomeData = useSelector(state => state.incomeData);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState('first');

  //console.log(incomeData);

  const onSaveIncome = () => {
    if (incomeName !== '' && incomeValue !== '') {
      dispatch(
        addIncome({
          key: incomeData.length,
          name: incomeName,
          value: incomeValue,
        }),
      );

      dispatch(IncreaseTotal(Number(incomeValue)));
    }
    setIncomeName('');
    setIncomeValue('');
  };

  return (
    <View style={styles.view}>
      <View style={styles.title_view}>
        <Text style={styles.text}>SINH HOẠT</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.sub_row}>
          <Text style={{fontSize: 20, color: '#000000'}}>1.Khoản thu :</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data_in}
            search={false}
            maxHeight={300}
            labelField="value"
            valueField="key"
            placeholder={!isFocus ? 'Chọn khoản thu' : '...'}
            //searchPlaceholder="Search..."
            value={incomeName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setIncomeName(item.value);
              setIsFocus(false);
            }}
          />
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

      <View style={styles.row}>
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

          <TextInput style={styles.textInput_box} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.sub_row}>
          <Text style={{fontSize: 20, color: '#000000'}}>2.Nguồn tiền:</Text>

          <View style={styles.checkbox_row}>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              color={'black'}
            />
            <Text style={{fontSize: 20, color: '#000000', marginTop: 4}}>
              Cá nhân
            </Text>
          </View>

          <View style={styles.checkbox_row}>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
              color={'black'}
            />
            <Text style={{fontSize: 20, color: '#000000', marginTop: 4}}>
              Khác
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.row}></View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function PostScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FF5C00',
        inactiveTintColor: '#CCCCCC',
        showLabel: true, // hide the name of the App
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
      }}>
      <Tab.Screen name="CHI TIÊU" component={Outcome} />
      <Tab.Screen name="THU NHẬP" component={Income} />
    </Tab.Navigator>
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
    marginTop: 10,
    //padding:10,
    backgroundColor: '#ffffff',
    //backgroundColor:'blue',
  },

  sub_row: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    //marginTop:10,
    height: 50,
    //marginHorizontal: 45,
    //backgroundColor:'pink',
    width: '90%',
    padding: 10,
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
});
