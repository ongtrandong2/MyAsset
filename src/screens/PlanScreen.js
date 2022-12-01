import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable, KeyboardAvoidingView, ScrollView, Modal, Button, Animated, Alert } from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import CustomButton from '../components/CustomButton';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { addPlan} from '../Redux/PlanData';


export default function PlanScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelect, setDateSelect] = useState('');

  const [isDatePickerFinishVisible, setDatePickerFinishVisibility] = useState(false);
  const [dateFinish, setDateFinish] = useState('');
  const [budget, setBudget] = useState('');
  const [number, setNumber] = useState(0);

  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();

  //console.log(planData);
  //console.log(percentage);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDateSelect(moment(date).format('YYYY-MM-DD'));
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
    setDateFinish(moment(date).format('YYYY-MM-DD'));
    hideDatePicker_Finish(); // 

  };

  const onConfirmPlan = () => {
    if (dateSelect !== '' && dateFinish !== '' && budget !== '') {
      const d1 = new Date(dateSelect);
      const d2 = new Date(dateFinish);
      if (d1.getTime() > d2.getTime()) {
        Alert.alert('Warning', 'Ngày bắt đầu lớn hơn ngày kết thúc! Vui lòng nhập lại dữ liệu!');
      }
      else {
        dispatch(
          addPlan({
            dateStart: dateSelect,
            dateFinish: dateFinish,
            budget: budget,
            currentuse: 0,
            percentage_of_use: 0,
            isExceed: false,
          })
        )
        setDateSelect('');
        setDateFinish('');
        setBudget('');
      }
    }
  }


  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(20)}
          title="KẾ HOẠCH"
          style={{ color: 'black', fontWeight: 'bold' }}
        />

        {planData.map((item, index) => {
          return (
            <View key={index}>
              <View style={[styles.big_row, { marginTop: scale(20) }]}>
                <View style={styles.slider_view}>
                  <View style={styles.figure_view}>
                    <Text style={[styles.text, { color: 'red' }]}>{moment(item.dateStart).format('DD/MM/YYYY')}  -  {moment(item.dateFinish).format('DD/MM/YYYY')}</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <Animated.View
                      style={
                        ([StyleSheet.absoluteFill],
                        {
                          backgroundColor: item.isExceed === true ? 'hsl(0,74%,52%)' : "hsl(111,84%,36%)",
                          width: String(item.percentage_of_use)+"%",
                          borderRadius: 5,
                        })
                      }
                    />
                  </View>


                  <View style={styles.figure_view}>
                    <View style={styles.name_view}>
                      <Text style={[styles.text, { color: 'black' }]}>{item.currentuse}</Text>
                    </View>

                    <View style={styles.money_view}>
                      <Text style={[styles.text, { color: 'black' }]}>{item.budget} VND</Text>
                    </View>
                  </View>

                </View>
              </View>


              

            </View>
          )
        })}


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

                <Text style={{ color: 'red', fontSize: scale(25), fontWeight: 'bold' }}>Kế hoạch mới</Text>



                <View style={styles.modal_row}>
                  <Text style={styles.text_modal}>1. Ngày bắt đầu : </Text>
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
                  <Text style={styles.text_modal}>2. Ngày kết thúc: </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setDateFinish}
                    placeholderTextColor={'black'}
                    value={dateFinish}
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


                <View style={styles.modal_row}>
                  <Text style={styles.text_modal}>3.Định mức         : </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setBudget}
                    value={budget}
                  />
                </View>

                <CustomButton
                  style={{ height: scale(50), width: '30%', marginTop: 30 }}
                  title='Lưu'
                  onPressFunction={onConfirmPlan}
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
    fontSize: scale(15),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },



  floatingbutton: {

    position: 'absolute',
    zIndex: 999,
    right: scale(30),
    bottom: scale(150),
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: scale(20),
    },

    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },

  big_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: scale(30)
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },

  slider_view: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'pink',
    width: '90%',
    height: scale(50),
  },

  figure_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'green',
    width: '100%',
    height: scale(30),
    //marginBottom: scale(5),
  },

  name_view: {
    flex: 0.5,
    //paddingHorizontal: scale(5),
    //backgroundColor:'pink',

  },

  money_view: {
    flex: 0.5,
    paddingHorizontal: scale(5),
    //backgroundColor:'blue',
    alignItems: 'flex-end',
  },

  progressBar: {
    height: scale(10),
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: scale(5),
    flexDirection: 'row',
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
    height: '150%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,

  },
  modal_bigrow: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'center',
    
  },

  modal_row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 15,
    width: '100%',
    justifyContent:'center',
    
    
  },
  textInput_style: {
    //paddingHorizontal: scale(10),
    //padding: scale(2),
    //paddingLeft: 0,
    fontSize: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '50%',
    backgroundColor: '#ffffff',
    height: scale(30),

  },

  text_modal: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },



});
