import {ScaleFromCenterAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import {interpolate} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

// const Data_Image = [
//   {
//     key: 1,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 2,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 3,
//     source: require('../assets/images/homescreen.png')
//   },
//   {
//     key: 4,
//     source: require('../assets/images/homescreen.png')
//   },
// ]
const Data_Image = [
  {
    key: 1,
    source:
      'https://timo.vn/wp-content/uploads/cach-ghi-so-chi-tieu-trong-gia-dinh.jpg',
  },
  {
    key: 2,
    source:
      'https://img.freepik.com/premium-vector/cute-money-bag-with-dollar-coin-cartoon_138676-1488.jpg',
  },
  {
    key: 3,
    source:
      'https://img.freepik.com/premium-vector/cute-wallet-money-cartoon-vector-icon-illustration-business-finance-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1446.jpg?w=2000',
  },
  {
    key: 4,
    source:
      'https://static.vecteezy.com/system/resources/previews/003/226/897/original/cute-and-happy-wallet-with-money-cartoon-illustration-vector.jpg',
  },
];

const Nhap = () => {
  const [selectedItem,setSelectedItem] = useState('')
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
          //width: '80%',
          //alignSelf: 'center',
          //borderWidth:1
        }}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            fontWeight: '500',
            marginRight: 20,
          }}>
          Choose item:
        </Text>
        <View>
          <DropDownComponent
            width={150}
            heightDropDown = {200}
            list = {data_in}
            selectedItem = {selectedItem}
            setSelectedItem = {setSelectedItem}
          />
        </View>
      </View>
      {/* <View
        style = {{
          height: 50,
          backgroundColor: 'orange',
          opacity: 0.8
        }}
      /> */}
    </View>
  );
};

export default Nhap;
