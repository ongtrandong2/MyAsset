import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

import {useSelector,useDispatch} from 'react-redux' 
import {UpdateMoney} from '../Redux/TotalMoney';
import {addPossession,removePossession} from '../Redux/PossessionData';

export default function FirstInput1(){
    const money = useSelector((state)=>state.totalMoney.value);
    const possessionData = useSelector((state)=>state.possessionData);
    const dispatch = useDispatch();

    const [textMoney, setTextMoney] = useState(0);

    const [textName,setTextName] = useState('');
    const [textValue, setTextValue] = useState('');

    const AddItem = () => {
        for (let i = 0; i< possessionData.length+1; i++)
        {
            if(i == possessionData.length)
            {   
                <View style = {styles.column}>
                    <View style={[{ height: 200, width: '90%' }, styles.money_box]}>
                        <TextInput
                            style={styles.textInput_item}
                            placeholder= {'Tên'}
                            onChangeText={(value) => setTextName(value)}
                        />
                        <TextInput
                            style={styles.textInput_item}
                            placeholder='Trị giá'
                            onChangeText={(value) => setTextValue(value)}
                        
                        />
                    

                        <View style={styles.bin_view}>
                            <Pressable
                                onPress={()=>dispatch(removePossession(i))}
                                android_ripple={{ color: '#bbbbbb' }}

                            >
                                <Image
                                source={require('../assets/images/bin_icon.png')}
                                resizeMode='stretch'
                                />

                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.icon_plus}>
                        <Pressable
                        
                            onPress={()=>dispatch(addPossession({
                                    key: i, 
                                    name: {textName},
                                    value: {textValue},
                                })
                            )}
                            android_ripple={{ color: '#bbbbbb' }}

                        >   
                            <Image
                                source={require('../assets/images/Plus.png')}        
                                resizeMode='stretch'
                            />

                        </Pressable>
                    </View>
                </View>
                
            }

            else
            {
                <View style={[{ height: 200, width: '90%' }, styles.money_box]}>
                    <Text style={styles.text}>
                        {textName}
                    </Text>
                    <Text style={styles.text}>
                        {textValue}
                    </Text>
                    <View style={styles.bin_view}>
                        <Pressable
                            onPress={()=>dispatch(removePossession(i))}
                            android_ripple={{ color: '#bbbbbb' }}
                        >
                            <Image
                                source={require('../assets/images/bin_icon.png')}
                                resizeMode='stretch'
                            />

                        </Pressable>
                    </View>

                </View>
            }

        }
    }


    return(
        <SafeAreaView style={styles.view}>
            <Header
                //onPressFunctionBack={onPressHandler_Back}
            />
            <ScrollView>
                <View style={styles.row}>
                    <Text style={styles.title}>Vui lòng nhập tài sản của bạn !</Text>
                </View>

                <View style={styles.text_view}>
                    <Text style={styles.text}>Số tiền</Text>
                </View>

                <View style={styles.row}>
                    <View style={[{ height: 50, width: '90%' }, styles.money_box]}>
                        <TextInput
                            style={styles.textInput_style}
                            placeholder='0'
                            placeholderTextColor={'grey'}
                            onChangeText={(value) => setTextMoney(value)}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>


                

                <View style={styles.second_row}>
                    <View style={styles.secondtext_view}>
                        <Text style={styles.text}>Hiện vật </Text>
                    </View>

                    
                </View>

                 {/* Create an array of item list */}
                 {/* {AddItem}   */}
                 <AddItem/>

                <View style={styles.row}>
                    <CustomButton
                        style={{ width: 150, height: 40 }}
                        title={'Hoàn tất'}
                        //onPressFunction={()=>navigation.navigate('HomeScreen')}
                        //onPressFunction={onPressPassData}
                        
                    />
                </View>
                
                
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor:'#ffffff',

    },

    // body: {
    //     flex: 1,
    //     alignItems: 'center',
    //     flexDirection: 'column',
    // },
    row: {
        
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,
        marginHorizontal: 30,


    },
    column:{
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5,
        marginHorizontal: 30,
        alignItems:'center',
    },

    title: {
        fontSize: 30,
        color: '#FFC700',
        textAlign: 'center',
        fontWeight: 'bold',

    },

    text_view: {
        alignItems: 'flex-start',
        marginHorizontal: 45,
        marginTop: 20,

    },

    text: {
        fontSize: 20,
        color: '#000000',

    },

    textInput_style: {
        height: 30,
        width: '80%',
        borderBottomColor: 'black',
        //borderBottomWidth:1,
        backgroundColor: '#ffffff',
        fontSize: 20,
        textAlign: 'left',

    },

    textInput_item: {
        height: 30,
        width: '80%',
        borderBottomColor: 'black',
        //borderBottomWidth:1,
        backgroundColor: '#ffffff',
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 20,
    },

    money_box: {
        borderWidth: 2,
        borderColor: '#FFC700',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',

    },

    second_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,

        height: 50,
        marginHorizontal: 45,


    },

    secondtext_view: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',

    },

    icon_plus: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',

        //marginHorizontal:5,
    },

    bin_view: {
        alignItems: 'center',
        marginTop: 5,
        //backgroundColor:'pink'
    }


})