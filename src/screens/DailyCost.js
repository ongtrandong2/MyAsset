import React, {useState} from 'react';
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
} from 'react-native';

import CustomButton from '../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {IncreaseTotal, DecreaseTotal} from '../Redux/TotalMoney';
import generateUUID from '../constants/generateUUID';
import scale from '../constants/scale';
import {addData, addDataFirebase, deleteIO} from '../Redux/IncomeOutcome';
import {IncreaseCurrentUse} from '../Redux/PlanData';
import {ShowTab} from '../Redux/ModalNumber';
import moment from 'moment';

const data_in = [
  {key: '1', value: 'Tiền Lương'},
  {key: '2', value: 'Cho thuê'},
  {key: '3', value: 'Bán hàng'},
  {key: '4', value: 'Tiền thưởng'},
  {key: '5', value: 'Cổ phiếu'},
  {key: '6', value: 'Phiếu giảm giá'},
  {key: '7', value: 'Vietlott'},
  {key: '8', value: 'Tiền lì xì'},
  {key: '9', value: 'Khác'},
];

const data_out = [
  {key: '1', value: 'Ăn uống'},
  {key: '2', value: 'Quần áo'},
  {key: '3', value: 'Mua Sắm'},
  {key: '4', value: 'Giao thông'},
  {key: '5', value: 'Nhà ở'},
  {key: '6', value: 'Du lịch'},
  {key: '7', value: 'Giáo dục'},
  {key: '8', value: 'Khác'},
];
export default function DailyCost() {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [incomeName, setIncomeName] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [outcomeName, setOutcomeName] = useState('');
  const [outcomeValue, setOutcomeValue] = useState('');
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);

  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date()); //
  const [isTab1, setIsTab1] = useState(true);

  const onSaveIncome = () => {
    if (incomeName !== '' && incomeValue !== '') {
      setCurrentDate(new Date());
      const dataIC = {
        key: generateUUID(),
        name: incomeName,
        value: incomeValue,
        isIncome: true,
        isPossession: false,
        time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
      };
      dispatch(addData(dataIC));
      dispatch(addDataFirebase(dataIC));
      // dispatch(deleteIO());
      dispatch(IncreaseTotal(Number(incomeValue)));
      setIncomeName('');
      setIncomeValue('');
    }
  };

  const onSaveOutcome = () => {
    if (outcomeName !== '' && outcomeValue !== '') {
      setCurrentDate(new Date());
      const dataOC = {
        key: generateUUID(),
        name: outcomeName,
        value: outcomeValue,
        isIncome: false,
        isPossession: false,
        time: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
      };
      dispatch(addData(dataOC))
      dispatch(addDataFirebase(dataOC));
      // dispatch(deleteIO());
      dispatch(DecreaseTotal(Number(outcomeValue)));
      let d1 = new Date(moment(currentDate).format('YYYY-MM-DD'));
      planData.map((item, index) => {
        let d2 = new Date(item.dateStart);
        let d3 = new Date(item.dateFinish);
        if (d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()) {
          dispatch(
            IncreaseCurrentUse({
              index: index,
              value: Number(outcomeValue),
            }),
          );
        }
      });
      setOutcomeName('');
      setOutcomeValue('');
    }
  };

  const CheckOut = props => {
    if (props.value === 'Khác') {
      setFlag(true);
      setOutcomeName('');
    } else {
      setOutcomeName(props.value);
    }
    setIsFocus(false);
  };

  const CheckIn = props => {
    if (props.value === 'Khác') {
      setFlag1(true);
      setIncomeName('');
    } else {
      setIncomeName(props.value);
    }
    setIsFocus1(false);
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <View style={styles.tab_view}>
          <TouchableOpacity
            style={styles.tab_item}
            onPress={() => dispatch(ShowTab(false))}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: '#FFC700',
                borderBottomWidth: 5,
                width: '70%',
              }}>
              <Text style={styles.tab_text}>SINH HOẠT</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab_item}
            onPress={() => dispatch(ShowTab(true))}>
            <Text style={styles.tab_text}>TÀI SẢN</Text>
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
            <Text style={[styles.text, {fontWeight: 'bold'}]}>CHI TIÊU</Text>
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
            <Text style={[styles.text, {fontWeight: 'bold'}]}>THU NHẬP</Text>
          </TouchableOpacity>
        </View>

        {isTab1 ? (
          <>
            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>1.Khoản chi:</Text>

                {flag === true ? (
                  <View style={styles.customDropList}>
                    <TextInput
                      style={[
                        styles.textInput_box,
                        {
                          borderBottomWidth: 0,
                          width: '90%',
                          padding: 0,
                          fontSize: scale(18),
                        },
                      ]}
                      placeholder="Nhập Khoản chi khác"
                      onChangeText={setOutcomeName}
                      value={outcomeName}
                    />
                    <Pressable
                      onPress={() => setFlag(false)}
                      android_ripple={{color: 'grey'}}>
                      <Image
                        style={{height: scale(20), width: scale(20)}}
                        source={{
                          uri: 'https://img.icons8.com/pastel-glyph/64/null/expand-arrow.png',
                        }}
                        resizeMode="stretch"
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={{fontSize: scale(18), color: 'black'}}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data_out}
                    //search //show or hide the input seacrh
                    dropdownPosition="auto"
                    maxHeight={250}
                    labelField="value" //extract the data from data item
                    valueField="key" // extract the primay key from data item
                    placeholder={!isFocus ? outcomeName : '...'}
                    searchPlaceholder="Search..."
                    value={outcomeName} //
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => CheckOut(item)}
                  />
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>2.Số tiền: </Text>
                <TextInput
                  style={styles.textInput_box}
                  onChangeText={setOutcomeValue}
                  value={outcomeValue}
                />
              </View>
            </View>
            <View style={[styles.row, {paddingTop: scale(10)}]}>
              <CustomButton
                style={{height: scale(40), width: '20%', borderColor: 'orange'}}
                colorPress={'#FFC700'}
                colorUnpress={'#ffeba3'}
                text_style={styles.text_style}
                title={'LƯU'}
                onPressFunction={onSaveOutcome}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>1.Khoản thu :</Text>

                {flag1 === true ? (
                  <View style={styles.customDropList}>
                    <TextInput
                      style={[
                        styles.textInput_box,
                        {
                          borderBottomWidth: 0,
                          width: '90%',
                          padding: 0,
                          fontSize: scale(18),
                        },
                      ]}
                      placeholder="Nhập Khoản thu khác"
                      onChangeText={setIncomeName}
                      value={incomeName}
                    />
                    <Pressable
                      onPress={() => setFlag1(false)}
                      android_ripple={{color: 'grey'}}>
                      <Image
                        style={{height: scale(20), width: scale(20)}}
                        source={{
                          uri: 'https://img.icons8.com/pastel-glyph/64/null/expand-arrow.png',
                        }}
                        resizeMode="stretch"
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={{fontSize: scale(18), color: 'black'}}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data_in}
                    maxHeight={250}
                    labelField="value"
                    valueField="key"
                    placeholder={!isFocus1 ? incomeName : '...'}
                    value={incomeName}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={item => CheckIn(item)}
                  />
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.sub_row}>
                <Text style={styles.text}>2.Số tiền:</Text>
                <TextInput
                  style={styles.textInput_box}
                  onChangeText={setIncomeValue}
                  value={incomeValue}
                />
              </View>
            </View>

            <View style={[styles.row, {paddingTop: scale(10)}]}>
              <CustomButton
                style={{height: scale(40), width: '20%', borderColor: 'orange'}}
                colorPress={'#FFC700'}
                colorUnpress={'#ffeba3'}
                text_style={styles.text_style}
                title={'LƯU'}
                onPressFunction={() => onSaveIncome()}
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
    fontSize: scale(20),
    color: '#000000',
  },
  text_style: {
    color: 'black',
    fontSize: scale(20),
    fontFamily: 'Itim-Regular',
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
    //height: scale(50),
    paddingTop: scale(10),
    width: '50%',
    backgroundColor: '#ffffff',
  },
  tab_text: {
    fontSize: scale(25),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },
  title_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: scale(50),
    //backgroundColor: '#FFEFB6',
    marginTop: scale(10),
    borderTopColor: 'hsl(36,100%,52%)',
    borderBottomColor: 'hsl(36,100%,52%)',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 5,
    paddingTop: scale(5),
    backgroundColor: '#ffffff',
    //backgroundColor:'blue',
    paddingHorizontal: scale(5),
  },

  sub_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //height: scale(50),
    paddingVertical: scale(10),
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
});
