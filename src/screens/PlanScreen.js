import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable, KeyboardAvoidingView, ScrollView, Modal, Button, } from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import CustomButton from '../components/CustomButton';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
export default function PlanScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelect, setDateSelect] = useState('');

  const [isDatePickerFinishVisible, setDatePickerFinishVisibility] = useState(false);
  const [dateFinish, setDateFinish] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDateSelect(moment(date).format('DD - MM - YYYY'));
    hideDatePicker();

  };


  const showDatePicker_Finish = () => {
    setDatePickerFinishVisibility(true);
  };

  const hideDatePicker_Finish = () => {
    setDatePickerFinishVisibility(false);
  };

  const handleConfirm_Finish = (date) => {
    //console.warn("A date has been picked: ", date);
    setDateFinish(moment(date).format('DD - MM - YYYY'));
    hideDatePicker_Finish(); // 

  };


  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(20)}
          title="KẾ HOẠCH"
          style={{ color: 'black', fontWeight: 'bold' }}
        />

        <Text style={styles.text}>Plan Screen</Text>

      </ScrollView>


      <View style={styles.floatingbutton}>
        <Pressable
          onPress={() => setShowModal(true)}
          style={({ pressed }) => [{ backgroundColor: pressed ? '#0099FF' : 'white' }, { ...styles.wrapper }, { ...styles.shadow }]}
        >

          <Image
            source={require('../assets/images/pen.png')}
            resizeMode="stretch"
            style={{ height: scale(30), width: scale(30), borderRadius: scale(30) }}
          //style = {styles.circle}
          />


        </Pressable>
      </View>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        statusBarTranslucent
        animationType='fade'
      >

        <Pressable
          style={styles.modal_view}
          onPress={() => setShowModal(false)}
        >
        </Pressable>

        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <ScrollView>
              <View style={styles.modal_bigrow}>

                <Text style={{ color: 'red', fontSize: scale(30), fontWeight: 'bold' }}>Kế hoạch mới</Text>
                <View style={styles.modal_row}>
                  <Text style={styles.text}>1. Tên kế hoạch  : </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setPlanName}
                    value={planName}
                  />
                </View>


                <View style={styles.modal_row}>
                  <Text style={styles.text}>2. Ngày bắt đầu : </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setDateSelect}
                    value={dateSelect}
                    right={
                      <TextInput.Icon
                        icon={{ uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png' }}
                        onPress={showDatePicker}
                      />
                    }
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>

                <View style={styles.modal_row}>
                  <Text style={styles.text}>3. Ngày kết thúc: </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText= {setDateFinish}
                    placeholderTextColor={'black'}
                    value = {dateFinish}  
                    right={
                      <TextInput.Icon
                        icon={{ uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png' }}
                        onPress={showDatePicker_Finish}
                      />
                    }
                  />

                  <DateTimePickerModal
                    isVisible={isDatePickerFinishVisible}
                    mode="date"
                    onConfirm={handleConfirm_Finish}
                    onCancel={hideDatePicker_Finish}
                  />
                </View>

                <CustomButton
                  style={{ height: scale(50), width: '30%', marginTop: 30 }}
                  title='Lưu'
                />

              </View>
            </ScrollView>
          </View>
        </View>


      </Modal>



    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },

  text: {
    fontSize: scale(25),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },


  floatingbutton: {

    position: 'absolute',
    zIndex: 999,
    right: 30,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(70),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },

  shadow: {
    //shadowColor:'#7F5Df0',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: scale(20),
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },

  ///Modal of input plan
  modal_view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal_box: {
    width: '100%',
    height: '120%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,

  },
  modal_bigrow: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
  },

  modal_row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    //justifyContent:'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  textInput_style: {
    //paddingHorizontal: scale(10),
    padding: scale(2),
    paddingLeft: 0,
    fontSize: scale(25),
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '60%',
    backgroundColor: '#ffffff',
    height: scale(40),

  },



});
