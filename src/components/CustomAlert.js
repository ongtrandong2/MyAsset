import { View, Text, Modal, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import scale from "../constants/scale";

const CustomAlert = (props) => {
    return (
        <Modal
            visible={props.showModal}
            onRequestClose={() => {
                props.setShowModal(false);
            }}
            transparent
            statusBarTranslucent
            animationType="fade"
        >
            <Pressable
                style={styles.modal_view}
                onPress={() => props.setShowModal(false)}
            />
            <View style={styles.modal_container}>
                <View style={[styles.modal_box, { ...props.modal_box_styles }]}>
                    <Text style={[
                        styles.modal_title,
                        { ...props.title_styles }
                    ]}>
                        {props.title || 'ALERT'}
                    </Text>

                    <Text style={[
                        styles.modal_message,
                        { ...props.message_styles }
                    ]}>
                        {props.message || 'This is an alert message'}
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        {props.ButtonList.map((item, index) => (
                            <View style={styles.button_container} key={index.toString()}>
                                <TouchableOpacity
                                    style={[styles.button_item, { ...item.button_item_styles }]}
                                    onPress={item.onPress}
                                >
                                    <Text style={{ fontSize: scale(20), fontFamily: 'Inter-Regular', color: '#000' }}>{item.text}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modal_view: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor: '#232f34',
        //opacity: 0.32,
        backgroundColor: '#00000099',

    },
    modal_container: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(350),
        width: '80%',
        alignSelf: 'center',
    },
    modal_box: {
        width: '100%',
        //elevation: 24,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
    },
    modal_title: {
        color: 'black',
        fontSize: scale(25),
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        paddingTop: scale(20)
    },
    modal_message: {
        color: '#000',
        fontSize: scale(20),
        paddingVertical: 20,
        fontFamily: 'Inter-Medium',
        textAlign: 'center'
    },
    button_container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_item: {
        backgroundColor: '#ffeba3',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'orange',
        //paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
})
export default CustomAlert;

