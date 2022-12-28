import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, SectionList, Pressable, Modal, TextInput, ToastAndroid } from "react-native";
import React, { useState } from "react";
import HeaderDrawer from "../components/Header_Drawer";
import scale from "../constants/scale";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeData, changeData } from "../Redux/IncomeOutcome";
import { IncreaseCurrentUse } from "../Redux/PlanData";

import CustomButton from '../components/CustomButton';


export default function History({ navigation }) {
  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();
  const weekday = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const currentDate = new Date();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newIndex, setNewIndex] = useState();
  const [newTime, setNewTime] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [newisIncome, setNewisIncome] = useState(true);
  var result = [];

  IncomeOutcome.slice(0).reverse().map((item, index) => {
    if ((result.map(itemr => itemr.title.date)).indexOf(moment(item.time).format('YYYY-MM-DD')) === -1) {
      const newObject = {
        title: {
          date: '',
          totalIncome: 0,
          totalOutcome: 0,
        },
        data: []
      }
      newObject.title.date = moment(item.time).format('YYYY-MM-DD');
      newObject.title.totalIncome = item.isIncome ? Number(item.value) : 0;
      newObject.title.totalOutcome = item.isIncome ? 0 : Number(item.value);
      newObject.data.push({
        key: item.key,
        name: item.name,
        value: item.value,
        isIncome: item.isIncome,
        isPossession: item.isPossession,
        time: item.time,
      })
      result.push(newObject);
    }
    else if ((result.map(itemr => itemr.title.date)).indexOf(moment(item.time).format('YYYY-MM-DD')) > -1) {
      let newIndex = (result.map(itemr => itemr.title.date)).indexOf(moment(item.time).format('YYYY-MM-DD'))
      result[newIndex].title.totalIncome += item.isIncome ? Number(item.value) : 0;
      result[newIndex].title.totalOutcome += item.isIncome ? 0 : Number(item.value);
      result[newIndex].data.push({
        key: item.key,
        name: item.name,
        value: item.value,
        isIncome: item.isIncome,
        isPossession: item.isPossession,
        time: item.time,
      })
    }
  })
  //console.log(result);
  //console.log(result[0].data[2].isIncome)
  //console.log(IncomeOutcome);
  let index;
  const onRemoveData = (keyDelete) => {
    index = (IncomeOutcome.map(item => item.key)).indexOf(keyDelete);
    dispatch(removeData(index));
  }

  const onChangeData = (keyChange, name, value, time, isIncome) => {
    setShowModal(true);
    setNewName(name);
    setNewValue(value);
    index = (IncomeOutcome.map(item => item.key)).indexOf(keyChange);
    setNewIndex(index);
    setNewTime(time);
    setOldValue(value);
    setNewisIncome(isIncome);

  }
  //console.log(newTime);
  //console.log(newisIncome);
  const onConfirmChange = () => {
    if (newValue !== "") {
      dispatch(changeData({
        index: newIndex,
        value: newValue,
      }))
      if (newisIncome === false) {
        let d1 = new Date(moment(newTime).format("YYYY-MM-DD"));
        planData.map((item, index) => {
          let d2 = new Date(item.dateStart);
          let d3 = new Date(item.dateFinish);
          if (d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()) {
            dispatch(IncreaseCurrentUse({
              index: index,
              value: -Number(oldValue),
            }))
            dispatch(IncreaseCurrentUse({
              index: index,
              value: Number(newValue),
            }))
          }
        })
      }
      setShowModal(false);
      ToastAndroid.showWithGravity(
        'Cập nhật thông tin thành công!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  //console.log(IncomeOutcome);
  //console.log(newIndex, newName, newValue)
  const RenderItem = ({item,index}) => {
    //console.log(props.item)
    return (
      <View style={styles.item_view}>
        {/* <Text style={styles.text}>{index + 1}. {item.name}</Text> */}
        {item.isPossession ?
          (item.isIncome ? (<Text style={styles.text}>{index + 1}. {item.name} - BÁN</Text>)
            : (<Text style={styles.text}>{index + 1}. {item.name} - MUA</Text>)

          ) : (<Text style={styles.text}>{index + 1}. {item.name}</Text>)}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ paddingRight: 20 }}>
            {item.isIncome === true ?
              (<Text style={[styles.text, { color: '#00CC00' }]}>+ {item.value} VND</Text>)
              :
              (<Text style={[styles.text, { color: '#DF2828' }]}>- {item.value} VND</Text>)
            }
          </View>
          <Pressable
            android_ripple={{ color: '#bbbbbb' }}
            style={{ marginRight: 7 }}
            onPress={() => onChangeData(item.key, item.name, item.value, item.time, item.isIncome)}
          >
            <MaterialCommunityIcons
              name='pencil-outline'
              size={18}
              color={'#000000'}
            />
          </Pressable>
          <Pressable
            android_ripple={{ color: '#bbbbbb' }}
            onPress={() => onRemoveData(item.key)}
          >
            <AntDesign
              name='delete'
              size={18}
              color={'#000000'}
            />
          </Pressable>
        </View>
      </View>
    )

  }

  return (
    <KeyboardAvoidingView style={styles.view}>
      <>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          title="SỔ THU CHI"
        />
        <View style={{ paddingTop: 10 }}>
          <SectionList
            keyExtractor={(item, index) => index.toString()}
            sections={result}
            renderSectionHeader={({ section }) => {
              //const d = new Date(section.title.date);
              let day;
              let compare = (new Date(moment(currentDate).format('DD-MM-YYYY'))).getTime() - (new Date(moment(section.title.date).format('DD-MM-YYYY'))).getTime();
              //if ((new Date(moment(currentDate).format('DD-MM-YYYY'))).getTime() === (new Date(moment(section.title.date).format('DD-MM-YYYY'))).getTime()) {
              if (compare === 0) {
                day = "Hôm nay";
              }
              else if (compare === 86400000) {
                day = "Hôm qua";
              }
              else {
                day = weekday[(new Date(section.title.date)).getDay()];
              }
              return (
                <View style={styles.title_view}>
                  <Text style={styles.text}>{day}  {moment(section.title.date).format('DD-MM-YYYY')}</Text>
                  <Text style={[styles.text, { color: '#00CC00' }]}>+ {section.title.totalIncome} VND</Text>
                  <Text style={[styles.text, { color: '#DF2828' }]}>- {section.title.totalOutcome} VND</Text>
                </View>)
            }}
            renderItem={({ item, index }) => (
              <RenderItem item={item} index={index} />
            )}
          />
        </View>
      </>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        statusBarTranslucent
        animationType='fade'
      >
        <Pressable
          style={styles.modal_view}
          onPress={() => {
            setShowModal(false),
              setNewName(''),
              setNewValue('')
          }}
        />

        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <View style={styles.modal_bigrow}>
              <View style={styles.modal_row}>
                <Text style={styles.modal_text}>1. Mục thu/chi: </Text>
                <TextInput
                  style={{
                    width: '60%',
                    borderBottomWidth: 1,
                    fontSize: scale(20),
                    height: scale(30),
                    padding: 0,
                    paddingHorizontal: 4,
                    textAlign: 'center',
                    fontFamily: 'Inter-Bold'
                  }}
                  editable={false}
                  placeholder={newName}
                  placeholderTextColor={'#000000'}
                />
              </View>

              <View style={styles.modal_row}>
                <Text style={styles.modal_text}>2. Số tiền </Text>
                <TextInput
                  style={{
                    width: '60%',
                    borderBottomWidth: 1,
                    fontSize: scale(18),
                    height: scale(30),
                    padding: 2,
                    paddingHorizontal: 4,
                    textAlign: 'center',

                    fontFamily: 'Inter-Bold'

                  }}
                  //placeholder = {newValue}
                  //placeholderTextColor = {'#000000'}
                  onChangeText={setNewValue}
                  value={newValue}
                  keyboardType={'numeric'}
                />
              </View>

              <CustomButton
                //style={{ height: scale(40), width: '30%', borderColor: 'orange', marginTop: 20 }}
                colorPress={'#FFC700'}
                colorUnpress={'#ffeba3'}
                text_style={styles.text_style}
                title={'LƯU'}
                onPressFunction={onConfirmChange}
              />
            </View>

          </View>
        </View>
      </Modal>


    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
  title_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffeba3',
    padding: 5,
    paddingHorizontal: 10,
  },
  item_view: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: scale(16),
    color: '#000000',
    fontFamily: 'Inter-Medium',
  },

  //Modal of change data 
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
    borderWidth: 1,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal_bigrow: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,


  },
  modal_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
    paddingVertical: 10,
    //borderWidth: 1,
  },

  modal_text: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Inter-Medium',
  },

  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontFamily: 'Inter-Bold',
  },

})

