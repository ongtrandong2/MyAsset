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
        
    </TouchableOpacity>
  );
};

export default CheckboxComponent;
