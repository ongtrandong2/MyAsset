import React , { useState } from'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default function ChangeInfo({navigation}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    
    return(
        <View style = {styles.view}>
            <Header
                onPressFunctionBack={()=>navigation.navigate('InfoScreen')}
                fontSize={20}
                title="THAY ĐỔI THÔNG TIN CÁ NHÂN"
            />
            <ScrollView>
                <View style = {[styles.row,{paddingTop:30}]}> 
                    <View style = {styles.title}>
                        <Text style = {styles.text}>1.Tên người dùng</Text>
                    </View>
                </View>
                
                <View style = {styles.row}>
                    <TextInput
                        style = {styles.change_box}
                        onChangeText = {(value)=>setName(value)}
                        value = {name}
                    />
                </View>

                <View style = {[styles.row,{paddingTop:30}]}> 
                    <View style = {styles.title}>
                        <Text style = {styles.text}>2.Email</Text>
                    </View>
                </View>
                
                <View style = {styles.row}>
                    <TextInput
                        style = {styles.change_box}
                        onChangeText = {(value)=>setEmail(value)}
                        value = {email}
                    />
                </View>

                <View style = {{paddingTop:30, alignItems:'center'}}>
                    <CustomButton
                        title = {'Lưu thông tin cá nhân'}
                        style = {{height: 40, width: 220}}
                        //onPressFunction = {}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor:'#ffffff',
        flexDirection:'column',
        paddingTop:50,

    },
    text:{
        fontSize:20,
        color:'black',
        fontFamily:'Itim-Regular'
    },
    row:{
        flexDirection:'row',
        //justifyContent:'space-between'
        paddingHorizontal:30,
        paddingVertical:5,
    },
    title:{
        //width:200,
        flex:2,
        //height:30,
        //backgroundColor:'blue',
        alignItems:'flex-start',
        justifyContent:'center',

    },

    change_box:{
        flex:2,
        //height:30,
        backgroundColor:'white',
        borderColor:'#FFC700',
        borderWidth:2,
        borderRadius:20,
        paddingHorizontal:20,
        fontSize:18,
    },
})