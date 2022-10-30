import React from "react";
import {View, StyleSheet, Text} from 'react-native';

export default function PossessionScreen () {
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>Possession Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        
    },

    text:{
        fontSize:20,
        color:'#000000',
    },

})
