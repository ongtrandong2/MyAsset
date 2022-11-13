import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import HeaderTab from '../components/Header_Tab'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function Outcome(){
    return(
        <View style ={styles.view}>
            <View style ={styles.title_view}>
                <Text style={styles.text}>SINH HOẠT</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.sub_row}>
                    <Text style ={{fontSize:15, color:'#000000'}}>1.Khoản chi :</Text>
                    <TextInput
                        style = {styles.textInput_box}

                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.sub_row}>
                    <Text style ={{fontSize:15, color:'#000000'}}>2.Số tiền:       </Text>
                    <TextInput
                        style = {styles.textInput_box}

                    />
                </View>
            </View>
        </View>
    )
}

function Income(){
    return(
        <View style ={styles.view}>
            <Text style={styles.text}>Income</Text>
        </View>
    )
}

const Tab = createMaterialTopTabNavigator();

export default function PostScreen(){
    return(     
        <Tab.Navigator 
            
            tabBarOptions={{
                activeTintColor:'#FF5C00',
                inactiveTintColor:'#CCCCCC',
                showLabel:true, // hide the name of the App 
                labelStyle:{ fontSize:20,fontWeight:'bold' },
          
            }}
        >
            <Tab.Screen name="CHI TIÊU" component={Outcome}/>
            <Tab.Screen name="THU NHẬP" component={Income}/>
        </Tab.Navigator>
        
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#ffffff'
    },
    text:{
        fontSize:20,
        color:'#000000',
    },
    tab_view:{
        alignItems:'center',
        justifyContent:'center',
        top:10,
    },
    title_view:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:50,
        backgroundColor:'#FFEFB6',
        marginTop:10,
        borderTopColor:'#FF5C00',
        borderBottomColor:'#FF5C00',
        borderWidth:2,
    },
    row:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        //padding:10,
        backgroundColor:'#ffffff',
        //backgroundColor:'blue',
        
        
    },
    
    sub_row:{
        flexDirection:'row',
        //justifyContent:'space-between',
        //marginTop:10,
        height: 50,
        //marginHorizontal: 45,
        //backgroundColor:'pink',
        width:'90%',
        padding:10,
        alignItems:'flex-end',
    
    },

    textInput_box:{
        marginHorizontal:10,
        height:30,
        width:'60%',
        //backgroundColor:'pink',
        borderBottomWidth:1,
        borderBottomColor:'#000000',
        padding:2,
        fontSize:20,
        
    },
    

    

})