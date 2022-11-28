import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

export default function ChangePassword({ navigation }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    return (
        <KeyboardAvoidingView style={styles.view}>
            <ScrollView>
                <Header
                    onPressFunctionBack={() => navigation.navigate('InfoScreen')}
                    fontSize={scale(20)}
                    title="ĐỔI MẬT KHẨU"
                    style = {{color: 'black', fontWeight: 'bold'}}
                />
                <View style = {[styles.row,{paddingTop:scale(30)}]}> 
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

                <View style = {[styles.row,{paddingTop:scale(30)}]}> 
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

                <View style = {[styles.row,{paddingTop:scale(30)}]}> 
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


                <View style = {{paddingTop:scale(30), alignItems:'center', paddingBottom:scale(30)}}>
                    <CustomButton
                        title = {'Lưu thay đổi'}
                        style = {{height: scale(40), width: scale(220)}}
                        //onPressFunctionBack = {}
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
       
    },
    text: {
        fontSize: scale(20),
        color: 'black',
        fontFamily: 'Itim-Regular'
    },
    row: {
        flexDirection: 'row',
        //justifyContent:'space-between'
        paddingHorizontal: scale(30),
        paddingVertical: scale(5),
    },
    title: {
        //width:200,
        flex: 2,
        //height:30,
        //backgroundColor:'blue',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },

    change_box: {
        flex: 2,
        //height:30,
        backgroundColor: 'white',
        borderColor: '#FFC700',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: scale(20),
        fontSize: scale(18),
    },
})

