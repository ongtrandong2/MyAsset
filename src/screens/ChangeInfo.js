import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

export default function ChangeInfo({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    return (
        <KeyboardAvoidingView style={styles.view}>
            <ScrollView>
            <Header
                    onPressFunctionBack={() => navigation.navigate('InfoScreen')}
                    fontSize={scale(20)}
                    title="THAY ĐỔI THÔNG TIN CÁ NHÂN"
                    style = {{color: 'black', fontWeight: 'bold'}}
                />

                <View style={[styles.row, { paddingTop: scale(30) }]}>
                    <View style={styles.title}>
                        <Text style={styles.text}>1.Tên người dùng</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <TextInput
                        style={styles.change_box}
                        onChangeText={(value) => setName(value)}
                        value={name}
                    />
                </View>

                <View style={[styles.row, { paddingTop: scale(30) }]}>
                    <View style={styles.title}>
                        <Text style={styles.text}>2.Email</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <TextInput
                        style={styles.change_box}
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                    />
                </View>

                <View style={{ paddingTop: scale(30), alignItems: 'center' }}>
                    <CustomButton
                        title={'Lưu thông tin cá nhân'}
                        style={{ height: scale(40), width: '60%' }}
                    //onPressFunction = {}
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
        justifyContent:'center',
       

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
        paddingVertical:scale(5),
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