<<<<<<< HEAD
import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import scale from '../constants/scale';

const CheckboxComponent = ({onPress, width, height, value, checked}) => {
  return (
    <TouchableOpacity
      //onPress={()=>setCheck(!isCheck)}
      onPress={onPress}>
      <View
        style={{
          borderWidth: 1,
          width: width,
          height: height,
        }}
      />

      {value === checked ? (
        <Entypo
          name="check"
          size={24}
          color="hsl(145,75%,41%)"
          style={{position: 'absolute'}}
        />
      ) : null}
=======
import { TouchableOpacity, View, } from "react-native";
import React from "react";
import Entypo from 'react-native-vector-icons/Entypo';
import scale from '../constants/scale';

const CheckboxComponent = ({onPress,width,height,value,checked}) => {
  return (
    <TouchableOpacity
        //onPress={()=>setCheck(!isCheck)}
        onPress={onPress}
        
    >
        <View
            style = {{
                borderWidth: 1,
                width: width,
                height: height,
                
            }}
        />

        { value === checked ? (
            <Entypo
                name = 'check'
                size = {24}
                color = "hsl(145,75%,41%)"
                style ={{position: 'absolute',}}
            />
        ): null}
        
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
    </TouchableOpacity>
  );
};

export default CheckboxComponent;
