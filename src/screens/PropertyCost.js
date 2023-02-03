import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { firebase } from '@react-native-firebase/firestore';

import CustomButton from '../components/CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { IncreaseTotal, DecreaseTotal } from '../Redux/TotalMoney';
import { addPossession, removePossession } from '../Redux/PossessionData';

import generateUUID from '../constants/generateUUID';
import scale from '../constants/scale';

import { addData } from '../Redux/IncomeOutcome';
import { IncreaseCurrentUse } from '../Redux/PlanData';
import { ShowTab } from '../Redux/ModalNumber';
import moment from 'moment';
import CheckboxComponent from '../components/CheckboxComponent';

export default function PropertyCost() {
  const [isFocus, setIsFocus] = useState(false);
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [sellName, setSellName] = useState('');
  const [sellValue, setSellValue] = useState('');
  const [note, setNote] = useState('');
  const [flag, setFlag] = useState(false);

  const [checked, setChecked] = useState('first');
  const [currentDate, setCurrentDate] = useState(new Date()); //
  const [isTab1, setIsTab1] = useState(true);
  const [keyDelete, setKeyDelete] = useState();

  const possessionData = useSelector(state => state.possessionData);
  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();

  //console.log(keyDelete);
  //console.log(possessionData);
  const onSavePurchase = () => {
    if (purchaseName !== '' && purchaseValue !== '') {
      setCurrentDate(new Date());
      dispatch(
        addPossession({
          key: generateUUID(),
          name: purchaseName,
          value: purchaseValue,
          note: note,
        }),
      );

      // dispatch(
      //   addData({
      //     key: generateUUID(),
      //     name: purchaseName,
      //     value: purchaseValue,
      //     isIncome: false,
      //     isPossession: true,
      //     time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
      //     isDifferent: false,
      //   }),
      // );
      if (checked === 'first') {
        dispatch(DecreaseTotal(Number(purchaseValue)));
        dispatch(
          addData({
            key: generateUUID(),
            name: purchaseName,
            value: purchaseValue,
            isIncome: false,
            isPossession: true,
            time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
            isDifferent: false,
          }),
        );
        let d1 = new Date(moment(currentDate).format('YYYY-MM-DD'));
        planData.map((item, index) => {
          let d2 = new Date(item.dateStart);
          let d3 = new Date(item.dateFinish);
          if (d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()) {
            dispatch(
              IncreaseCurrentUse({
                index: index,
                value: Number(purchaseValue),
              }),
            );
          }
        });
      } else if (checked === 'second') {
        dispatch(
          addData({
            key: generateUUID(),
            name: purchaseName,
            value: purchaseValue,
            isIncome: false,
            isPossession: true,
            time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
            isDifferent: true,
          }),
        );
      }

      setPurchaseName('');
      setPurchaseValue('');
      setNote('');
      //setChecked('first');
    } else {
      ToastAndroid.showWithGravity(
        'Vui lòng nhập đầy đủ dữ liệu!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const onSaveSell = () => {
    if (sellName !== '' && sellValue !== '') {
      let index = possessionData.map(index => index.key).indexOf(keyDelete);
      //console.log(index);
      dispatch(removePossession(index));
      //setNumber1(number1+1);
      setCurrentDate(new Date());
      dispatch(
        addData({
          key: generateUUID(),
          name: sellName,
          value: sellValue,
          isIncome: true,
          isPossession: true,
          time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
          isDifferent: false,
        }),
      );
      dispatch(IncreaseTotal(Number(sellValue)));
      setSellName('');
      setSellValue('');
    } else {
      ToastAndroid.showWithGravity(
        'Vui lòng nhập đầy đủ dữ liệu!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <View style={styles.tab_view}>
          <TouchableOpacity
            style={styles.tab_item}
            onPress={() => dispatch(ShowTab(false))}>
            <Text style={styles.tab_text}>SINH HOẠT</Text>
            <View
              style={{
                width: '70%',
                height: 3,
                backgroundColor: '#fff',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab_item}
            onPress={() => dispatch(ShowTab(true))}>
            <Text style={styles.tab_text}>TÀI SẢN</Text>
            <View
              style={{
                width: '70%',
                height: 3,
                backgroundColor: '#FFC700',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tab_view}>
          <TouchableOpacity
            style={[
              styles.title_view,
              {
                backgroundColor: isTab1 ? '#FFEFB6' : '#ffffff',
              },
            ]}
            onPress={() => setIsTab1(true)}>
            <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>MUA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.title_view,
              {
                borderLeftWidth: 3,
                borderLeftColor: 'hsl(36,100%,52%)',
                backgroundColor: !isTab1 ? '#FFEFB6' : '#ffffff',
              },
            ]}
            onPress={() => setIsTab1(false)}>
            <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>BÁN</Text>
          </TouchableOpacity>
        </View>

        {isTab1 ? (
          <>
            <View style={styles.row}>
              <View style={[styles.sub_row, { marginTop: 10 }]}>
                <Text style={styles.text}>1.Tên hiện vật:</Text>

                <TextInput
                  style={styles.textInput_box}
                  onChangeText={setPurchaseName}
                  value={purchaseName}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>2.Nguồn tiền:</Text>

                <View style={styles.checkbox_row}>
                  <CheckboxComponent
                    value="first"
                    onPress={() => setChecked('first')}
                    width={20}
                    height={20}
                    checked={checked}
                  />
                  <Text style={styles.text}>Cá nhân</Text>

                  <CheckboxComponent
                    value="second"
                    onPress={() => setChecked('second')}
                    width={20}
                    height={20}
                    checked={checked}
                  />
                  <Text style={styles.text}>Khác</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.sub_row}>
                <View style={{ width: '10%' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: 'black',
                      marginRight: 5,
                    }}
                  />
                  <Text style={styles.text}>Số tiền:</Text>
                </View>

                <TextInput
                  style={styles.textInput_box}
                  onChangeText={value => setPurchaseValue(value)}
                  value={purchaseValue}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>3.Ghi chú:</Text>

                <TextInput
                  style={styles.textInput_box}
                  onChangeText={setNote}
                  value={note}
                />
              </View>
            </View>
            <View
              style={[
                styles.row,
                { paddingTop: scale(10), paddingBottom: scale(100) },
              ]}>
              <CustomButton
                //style={{ height: scale(40), width: '20%', borderColor: 'orange' }}
                colorPress={'#FFC700'}
                colorUnpress={'#ffeba3'}
                text_style={styles.text_style}
                title={'LƯU'}
                onPressFunction={() => onSavePurchase()}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <View style={[styles.sub_row, { marginTop: 10 }]}>
                <Text style={styles.text}>1.Tên hiện vật:</Text>

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={{ fontSize: scale(18), color: 'black' }}
                  selectedTextStyle={styles.selectedTextStyle}
                  //inputSearchStyle={styles.inputSearchStyle}
                  data={possessionData}
                  dropdownPosition="auto"
                  maxHeight={250}
                  labelField="name" //extract the data from data item
                  valueField="key" // extract the primay key from data item
                  placeholder={!isFocus ? sellName : '...'}
                  searchPlaceholder="Search..."
                  value={sellName} //
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setKeyDelete(item.key); //
                    setSellName(item.name);
                    setIsFocus(false);
                  }}

                //onChange={(item)=>Check(item)}
                />
              </View>
            </View>

            <View style={[styles.row, { paddingTop: 10 }]}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>2.Số tiền: </Text>
                <TextInput
                  style={styles.textInput_box}
                  onChangeText={setSellValue}
                  value={sellValue}
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={[styles.row, { paddingTop: scale(10) }]}>
              <CustomButton
                //style={{ height: scale(40), width: '20%', borderColor: 'orange' }}
                colorPress={'#FFC700'}
                colorUnpress={'#ffeba3'}
                text_style={styles.text_style}
                title={'LƯU'}
                onPressFunction={() => onSaveSell()}
              />
            </View>
          </>
        )}
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
    fontSize: scale(18),
    color: '#000000',
    fontWeight: '500',
  },
  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
  tab_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  tab_item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  tab_text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  title_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: scale(5),
    borderTopColor: 'hsl(36,100%,52%)',
    borderBottomColor: 'hsl(36,100%,52%)',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(5),
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(5),
  },

  sub_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },

  textInput_box: {
    //marginHorizontal: 10,
    height: scale(30),
    width: '60%',
    //backgroundColor:'pink',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: scale(2),
    fontSize: scale(18),
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
    justifyContent: 'space-between',
  },
});
