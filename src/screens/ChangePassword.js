import React , { useState } from'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default function ChangePassword({navigation}){
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    

    return(
        <View style = {styles.view}>
            <Header
                onPressFunctionBack={()=>navigation.navigate('InfoScreen')}
                fontSize={20}
                title="ĐỔI MẬT KHẨU"
            />
            <ScrollView>
                <View style = {[styles.row,{paddingTop:30}]}> 
                    <View style = {styles.title}>
                        <Text style = {styles.text}>1. Mật khẩu cũ</Text>
                    </View>
                </View>
                
                <View style = {styles.row}>
                    <TextInput
                        style = {styles.change_box}
                        onChangeText = {(value)=>setOldPassword(value)}
                        value = {oldPassword}
                    />
                </View>

                <View style = {[styles.row,{paddingTop:30}]}> 
                    <View style = {styles.title}>
                        <Text style = {styles.text}>2. Mật khẩu mới</Text>
                    </View>
                </View>
                
                <View style = {styles.row}>
                    <TextInput
                        style = {styles.change_box}
                        onChangeText = {(value)=>setNewPassword(value)}
                        value = {newPassword}
                    />
                </View>

                <View style = {[styles.row,{paddingTop:30}]}> 
                    <View style = {styles.title}>
                        <Text style = {styles.text}>3. Xác nhận mật khẩu mới</Text>
                    </View>
                </View>
                
                <View style = {styles.row}>
                    <TextInput
                        style = {styles.change_box}
                        onChangeText = {(value)=>setConfirmPassword(value)}
                        value = {confirmPassword}
                    />
                </View>


                <View style = {{paddingTop:30, alignItems:'center', paddingBottom:30}}>
                    <CustomButton
                        title = {'Lưu thay đổi'}
                        style = {{height: 40, width: 220}}
                        //onPressFunctionBack = {}
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
        paddingTop:30,

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

