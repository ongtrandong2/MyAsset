import React,{useState} from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView, Pressable,Animated} from 'react-native';
import HeaderTab from '../components/Header_Tab';

import {useSelector, useDispatch} from 'react-redux';
import {TotalMoney} from './Redux/TotalMoney'


export default function HomeScreen ({navigation, route}) {
    
    const money = useSelector((state)=>state.totalMoney.value);
    const dispatch = useDispatch();
    const[number,setNumber] = useState('50%')

    return (
        
        <View style = {styles.view}>  
            <HeaderTab
                onPressHandler={()=>navigation.navigate('InfoScreen')}
                fontSize={20}
                title = "TỔNG QUAN"
            /> 

            <View style = {styles.row}>
                <Text style={{color:'#BB2424',fontSize:20,fontWeight:'bold'}}>{money} VNĐ</Text>
                
            </View>

            <View style ={styles.row}>
                <Text style={{color:'#BB2424',fontSize:15}}>Tổng số dư</Text>
            </View>

            <View style = {styles.big_row}>
                <Text style = {{color:'#000000',fontSize:15}}>Upgrade this function</Text>   
            </View>

            <View style = {styles.big_row}>
                <View style = {styles.slider_view}>
                    
                    <View style = {styles.progressBar}>
                        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#FF9900", width: number? number:'50%',borderRadius:5}}/>
                    </View>

                    <View style={styles.figure_view}>
                            <View style = {styles.name_view}>
                                <Text style = {[styles.text,{color:'red'}]}>50000</Text>
                            </View>

                            <View style={styles.money_view}>
                                <Text style={[styles.text,{color:'red'}]}>{money} vnđ</Text>
                            </View>
                        </View>
                </View>
            </View>
                
            <View style={styles.big_row}>   
                <Text style = {[styles.text,{fontWeight:'bold'}]}>THU CHI GẦN ĐÂY</Text>
            </View>

            <View style ={styles.big_row}>
                <View style ={styles.box_view}>
                    <ScrollView>
                        <View style={styles.figure_view}>
                            <View style = {styles.name_view}>
                                <Text style = {styles.text}>Ăn uống</Text>
                            </View>

                            <View style={styles.money_view}>
                                <Text style={styles.text}>-25,000vnđ</Text>
                            </View>
                        </View>
                        
                        
                    </ScrollView>
                    
                </View>
            </View>

            <View style = {styles.big_row}>
                <Text style = {[styles.text,{fontWeight:'bold'}]}>TÀI SẢN</Text>
            </View>

            <View style={styles.big_row}>
                <View style={styles.box_view}>
                    <ScrollView>
                    <View style={styles.figure_view}>
                            <View style = {styles.name_view}>
                                <Text style = {styles.text}>Nhà</Text>
                            </View>

                            <View style={styles.money_view}>
                                <Text style={styles.text}>1</Text>
                            </View>
                        </View>
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
        //backgroundColor:'pink',
        width:'90%',
        height:50,
    },

    box_view:{
        width:'90%',
        height:150,
        backgroundColor:'#FFEFB6',
        padding:10,
        borderRadius:10,
    },

    figure_view:{
        flexDirection:'row',
        justifyContent:'space-between',
        //backgroundColor:'green',
        width:'95%',
        height:20,
        marginBottom:5,
    },

    name_view:{
        flex:0.5,
        paddingHorizontal:5,
        //backgroundColor:'pink',
    },

    money_view:{
        flex:0.5,
        paddingHorizontal:5,
        //backgroundColor:'blue',
        alignItems:'flex-end',
    },

    progressBar:{
        height:10,
        width:'100%',
        backgroundColor:'#D9D9D9',
        borderRadius:5,
        flexDirection:'row',
        
    },
    

})
