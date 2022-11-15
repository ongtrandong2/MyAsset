import React from "react";
import {View, StyleSheet, Text} from "react-native";

export default function InfoScreen({navigation}){
    return(
        <View style={styles.body}>
            <Text style ={styles.text}>
                InfoScreen
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
    },

    text:{
        fontSize:20,
        color:'#000000',
        
    },

})