import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";


const CustomButton = (props) =>{
    return(
        <Pressable
            onPress = {props.onPressFunction}
            hitSlop={{ top:10, bottom:10, left:10, right:10 }}
            android_ripple={{color: '#996600'}}
            style = {({ pressed })=>[
                {backgroundColor: pressed ? '#996600' : '#FFC700'},
                styles.button,{...props.style}
             
            ]}
            
        >
            <Text style = {styles.text}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 15,
        fontWeight:'bold'
      },

    button: {
        borderWidth:2,
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center',
    }
    
})
export default CustomButton;