import React from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import HeaderTab from '../components/Header_Tab';


export default function HomeScreen ({navigation}) {
    return (
        
        <View style = {styles.view}>  
            <HeaderTab
                onPressHandler={()=>navigation.navigate('InfoScreen')}
                fontSize={20}
                title = "TỔNG QUAN"
            /> 

            <View style = {styles.row}>
                <Text style={{color:'#BB2424',fontSize:20,fontWeight:'bold'}}>9,000,000 VNĐ</Text>
            </View>

            <View style ={styles.row}>
                <Text style={{color:'#BB2424',fontSize:15}}>Tổng số dư</Text>
            </View>

            <View style = {styles.big_row}>
                <Text style = {{color:'#000000',fontSize:15}}>Upgrade this function</Text>   
            </View>

            <View style = {styles.big_row}>
                <View style = {styles.slider_view}>
                    <Text>Slider</Text>
                </View>
            </View>
                
            <View style={styles.big_row}>
                <Text style = {styles.text}>THU CHI GẦN ĐÂY</Text>
            </View>

            <View style ={styles.big_row}>
                <View style ={styles.box_view}>
                    <ScrollView>
                        <Text>DATABASE</Text>
                    </ScrollView>
                    
                </View>
            </View>

            <View style = {styles.big_row}>
                <Text style = {styles.text}>TÀI SẢN</Text>
            </View>

            <View style={styles.big_row}>
                <View style={styles.box_view}>
                    <ScrollView>
                        <Text>DATABASE</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    view:{
        flex:1,
        backgroundColor:'#ffffff',
        
        
    },

    text:{
        fontSize:15,
        color:'#000000',
        fontWeight:'bold',
        
    },

    row:{
        flexDirection:'row',
        //justifyContent:'center',
        //marginLeft:20,
        paddingLeft:20,
    },

    big_row:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'center',  
    },
    slider_view:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink',
        width:'90%',
        height:70,
    },

    box_view:{
        width:'90%',
        height:150,
        backgroundColor:'#FFEFB6',
        padding:10,
        borderRadius:10,
    }

})
