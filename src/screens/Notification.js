import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Pressable } from "react-native";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import scale from '../constants/scale';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const Notification = ({ navigation }) => {
    const planData = useSelector(state => state.planData);
    return (
        <KeyboardAvoidingView style={styles.view}>
            <ScrollView>
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            { backgroundColor: pressed ? '#e4e6eb' : '#fff' }
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name='arrow-back'
                            size={24}
                            color={'#000'}
                        />
                    </Pressable>
                    <Text style={[styles.text, { marginLeft: 10, fontFamily: 'Inter-Bold' }]}>
                        THÔNG BÁO
                    </Text>
                </View>

                {planData.map((item, index) => {
                    let exceedMoney = item.currentuse - item.budget;
                    if(item.isExceed === true) {
                        return (
                            <View style={styles.row} key = {index}>
                                <MaterialCommunityIcons
                                    name='alarm'
                                    size={20}
                                    color='black'
                                />
                                <Text style={[styles.text, { marginLeft: 10, fontSize: scale(18) }]}>
                                Kế hoạch từ ngày  {moment(item.dateStart).format('DD/MM/YYYY')} đến ngày {moment(item.dateFinish).format('DD/MM/YYYY')} vượt định mức 
                                    <Text style={{ marginLeft: 10, fontSize: scale(18), color: 'red' }}> {exceedMoney}
                                        <Text style={{ marginLeft: 10, fontSize: scale(18), color: '#000' }}> VND</Text>
                                    </Text>
                                </Text>
                            </View>
                        )
                    }
                    
                })}


            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'hsl(0,0%,75%)',
        paddingVertical: 10,
        paddingRight: 20,

    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: scale(20),
        color: '#000',
    }
});
export default Notification;
