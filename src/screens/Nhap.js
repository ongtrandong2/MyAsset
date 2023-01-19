import { View, Text } from "react-native";
import React from "react";
import DropDownComponent from "../components/DropDownComponent";
import { useState } from "react";

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
