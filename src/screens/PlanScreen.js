import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Animated,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import CustomButton from '../components/CustomButton';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPlan,
  IncreaseCurrentUse,
  removePlan,
  updatePlan,
  setIsShowHistory,
} from '../Redux/PlanData';
import generateUUID from '../constants/generateUUID';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';
import CustomAlert from '../components/CustomAlert';
import Income from './Income';
export default function PlanScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelect, setDateSelect] = useState('');
  const [isDatePickerFinishVisible, setDatePickerFinishVisibility] =
    useState(false);
  const [dateFinish, setDateFinish] = useState('');
  const [budget, setBudget] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [showPen, setShowPen] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  //const [numberOfExceed, setNumberOfExceed] =useState(0);
  let numberOfExceed = 0;
  planData.map((item, index) => {
    if (item.isExceed === true)
      numberOfExceed++;

  })

  //console.log(numberOfExceed);
  //console.log(planData[0].history[0]);
  //console.log(planData);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDateSelect(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showDatePicker_Finish = () => {
    setDatePickerFinishVisibility(true);
  };

  const hideDatePicker_Finish = () => {
    setDatePickerFinishVisibility(false);
  };

  const handleConfirm_Finish = date => {
    //console.warn("A date has been picked: ", date);
    setDateFinish(moment(date).format('YYYY-MM-DD'));
    hideDatePicker_Finish();
  };

  const onConfirmPlan = () => {
    if (dateSelect !== '' && dateFinish !== '' && budget !== '') {
      setCurrentDate(new Date());
      let d = new Date(moment(currentDate).format('YYYY-MM-DD'));
      let d1 = new Date(dateSelect);
      let d2 = new Date(dateFinish);

      if (d1.getTime() > d2.getTime()) {
        //Alert.alert('Warning','Ngày bắt đầu lớn hơn ngày kết thúc! Vui lòng nhập lại dữ liệu!',);
        ToastAndroid.showWithGravity(
          'Ngày bắt đầu lớn hơn ngày kết thúc!\n\t\t\t\t\tVui lòng nhập lại dữ liệu!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } else if (d.getTime() > d1.getTime()) {
        //Alert.alert('Warning','Ngày bắt đầu bé hơn ngày hiện tại! Vui lòng nhập lại dữ liệu!',);
        ToastAndroid.showWithGravity(
          'Ngày bắt đầu bé hơn ngày hiện tại!\n\t\t\t\t\t\tVui lòng nhập lại dữ liệu!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } else {
        dispatch(
          addPlan({
            key: generateUUID(),
            dateStart: dateSelect,
            dateFinish: dateFinish,
            budget: budget,
            currentuse: 0,
            percentage_of_use: 0,
            isExceed: false,
          }),
        );
        setDateSelect('');
        setDateFinish('');
        setBudget('');
      }
    }
  };

  const onChangePlan = ({ index, item }) => {
    setDateSelect(item.dateStart);
    setDateFinish(item.dateFinish);
    setBudget(item.budget);
    //onConfirmPlan(index,item.currentuse, item.percentage_of_use, item.isExceed);
    //onConfirmPlan({ index, item });
    setNewData({
      index: index,
      newCurrentuse: item.currentuse,
      newPercent: item.percentage_of_use,
      newIsexceed: item.isExceed,
      oldBudget: item.budget,
      dateStart: item.dateStart,
      dateFinish: item.dateFinish,
    });
    setCurrentDate(new Date());
    setShowModalUpdate(true);
  };
  const onConfirmChange = () => {
    dispatch(
      updatePlan({
        index: newData.index,
        dateStart: newData.dateStart,
        dateFinish: newData.dateFinish,
        budget: budget,
        currentuse: newData.newCurrentuse,
        percentage_of_use: newData.newPercent,
        isExceed: newData.newIsexceed,
        oldBudget: newData.oldBudget,
        time_change: moment(currentDate).format('YYYY-MM-DD HH:mm:ss'),
      }),
    );
    dispatch(
      IncreaseCurrentUse({
        index: newData.index,
        value: 0,
      }),
    );
    setShowModalUpdate(false);
    ToastAndroid.showWithGravity(
      'Sửa đổi kế hoạch thành công!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const onDetelePlan = (index, item) => {
    //console.log(item);
    setShowModalDelete(true);
    setDataDelete({
      index: index,
      newDateStart: item.dateStart,
      newDateFinish: item.dateFinish,
      newPercent: item.percentage_of_use,
      newCurrentuse: item.currentuse,
      newBudget: item.budget,
    });
  };
  //console.log(dataDelete);
  useEffect(() => {
    planData.map((item, index) => {
      if (item.isExceed === true) {
        let exceedMoney = item.currentuse - item.budget;
        PushNotification.localNotification({
          channelId: 'plan',
          title: 'Thông báo',
          message:
            'Kế hoạch từ ngày ' +
            moment(item.dateStart).format('DD/MM/YYYY') +
            ' đến ngày ' +
            moment(item.dateFinish).format('DD/MM/YYYY') +
            ' vượt định mức ' +
            exceedMoney +
            ' VND',
        });
      }
    });
  }, [numberOfExceed]);

  //console.log(planData);
  const RenderItem = ({ item, index }) => {
    if (item.history.length === 0) {
      return (
        <View style={{ alignSelf: 'center' }}>
          <Text style={[styles.text, { color: 'grey' }]}>
            Chưa có lần chỉnh sửa nào cho kế hoạch này!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ alignSelf: 'flex-start' }}>
          {item.history.map((item_h, index_h) => {
            let compare = item_h.newBudget - item_h.oldBudget;
            let temp = 0;
            if (compare > 0) {
              temp = compare;
            } else temp = -compare;
            return (
              <View key={index_h.toString()}>
                <Text style={[styles.text]}>
                  {moment(item_h.timechange).format('DD/MM/YYYY')}: Định mức
                  {compare > 0 ? (
                    <Text style={[styles.text, { color: 'hsl(111,84%,36%)' }]}>
                      {' '}
                      tăng {temp} VND
                    </Text>
                  ) : (
                    <Text style={[styles.text, { color: 'hsl(0,74%,52%)' }]}>
                      {' '}
                      giảm {temp} VND
                    </Text>
                  )}
                </Text>

                <Text style={styles.text}>
                  {'\t\t\t\t\t\t\t\t\t\t'} {item_h.oldBudget} VND ⟶{' '}
                  {item_h.newBudget} VND
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
  };

  const PenAnimation = () => {
    if (showPen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 120,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    PenAnimation();
  }, [showPen]);

  let offsetY = 0;
  const handleOnScroll = ({ nativeEvent }) => {
    //console.log(nativeEvent.contentOffset)
    const newOffset = nativeEvent.contentOffset.y;
    offsetY < newOffset ? setShowPen(false) : setShowPen(true);
    offsetY = newOffset;
  };
  //console.log(showPen);

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView onScroll={handleOnScroll}>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          title="KẾ HOẠCH"
        />
        {planData.length === 0 ? (
          <View style={[styles.big_row, { alignItems: 'center' }]}>
            <Text
              style={{
                fontSize: scale(40),
                color: '#CDCACA',
                fontFamily: 'Inter-Medium',
              }}>
              Chưa có dữ liệu
            </Text>
          </View>
        ) : (
          <>
            {planData.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.big_row}>
                    <View style={styles.slider_view}>
                      <View style={[styles.figure_view, { paddingBottom: 3 }]}>
                        <Text style={styles.text}>
                          {moment(item.dateStart).format('DD/MM/YYYY')} -{' '}
                          {moment(item.dateFinish).format('DD/MM/YYYY')}
                        </Text>
                        <View style={styles.updatebox}>
                          <Pressable
                            android_ripple={{ color: '#bbbbbb' }}
                            style={{ marginRight: 7 }}
                            onPress={() => onChangePlan({ index, item })}>
                            <MaterialCommunityIcons
                              name="pencil-outline"
                              size={20}
                              color={'#1C1B1F'}
                            />
                          </Pressable>
                          <Pressable
                            android_ripple={{ color: '#bbbbbb' }}
                            //onPress={() => dispatch(removePlan(index))}
                            onPress={() => onDetelePlan(index, item)}>
                            <AntDesign
                              name="delete"
                              size={20}
                              color={'#1C1B1F'}
                            />
                          </Pressable>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.progressBar}
                        onPress={() => {
                          dispatch(setIsShowHistory(index));
                        }}>
                        <Animated.View
                          style={
                            ([StyleSheet.absoluteFill],
                            {
                              backgroundColor:
                                item.isExceed === true
                                  ? 'hsl(0,74%,52%)'
                                  : 'hsl(111,84%,36%)',
                              width: String(item.percentage_of_use) + '%',
                              borderRadius: 100,
                            })
                          }
                        />
                      </TouchableOpacity>
                      <View style={styles.figure_view}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color: item.isExceed
                                ? 'hsl(0,74%,52%)'
                                : 'hsl(111,84%,36%)',
                            },
                          ]}>
                          {item.currentuse}
                        </Text>
                        <Text style={[styles.text, { color: 'rgb(255,153,0)' }]}>
                          {item.budget} VND
                        </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        {item.isExceed ? (
                          <Text
                            style={[
                              styles.text,
                              { color: 'hsl(0,74%,52%)', fontSize: scale(16) },
                            ]}>
                            Vượt định mức: {item.currentuse - item.budget}
                          </Text>
                        ) : null}
                      </View>

                      {item.isShowHistory === true && (
                        <RenderItem item={item} index={index} />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
      <View
        style={{
          height: scale(100),
          bottom: 0,
          backgroundColor: '#fff',
          //borderWidth:1,
        }}
      />

      <Animated.View
        style={[styles.floatingbutton, { transform: [{ translateY: animation }] }]}>
        <Pressable
          onPress={() => {
            setShowModal(true);
            setDateSelect('');
            setDateFinish('');
            setBudget('');
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#FFC700' : 'white' },
            { ...styles.wrapper },
            { ...styles.shadow },
          ]}>
          <Image
            source={require('../assets/images/pen.png')}
            resizeMode="stretch"
            style={{
              height: scale(30),
              width: scale(30),
              borderRadius: scale(30),
            }}
          //style = {styles.circle}
          />
        </Pressable>
      </Animated.View>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        //statusBarTranslucent
        animationType="fade">
        <Pressable
          style={styles.modal_view}
          onPress={() => setShowModal(false)}
        />

        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView>
                <View style={styles.modal_bigrow}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: scale(23),
                      fontFamily: 'Inter-Bold',
                    }}>
                    Kế hoạch mới
                  </Text>
                  <View style={styles.modal_row}>
                    <Text style={styles.text_modal}>1. Ngày bắt đầu : </Text>
                    <TextInput
                      style={styles.textInput_style}
                      onChangeText={setDateSelect}
                      placeholderTextColor={'black'}
                      textColor="blue"
                      activeUnderlineColor="black"
                      editable={false}
                      value={dateSelect}
                      right={
                        <TextInput.Icon
                          icon={{
                            uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                          }}
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
                      placeholderTextColor="black"
                      textColor="blue"
                      editable={false}
                      activeUnderlineColor="black"
                      value={dateFinish}
                      right={
                        <TextInput.Icon
                          icon={{
                            uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                          }}
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
                    <Text style={styles.text_modal}>3. Định mức : </Text>
                    <TextInput
                      style={styles.textInput_style}
                      onChangeText={setBudget}
                      value={budget}
                      placeholderTextColor="black"
                      //underlineStyle={{ borderWidth: 0 }}
                      textColor="blue"
                      activeUnderlineColor="black"
                      keyboardType="numeric"
                    />
                  </View>

                  <CustomButton
                    colorPress={'#FFC700'}
                    colorUnpress={'#ffeba3'}
                    text_style={styles.text_style}
                    title={'LƯU'}
                    onPressFunction={onConfirmPlan}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
      <CustomAlert
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        ButtonList={[
          { text: 'Hủy', onPress: () => setShowModalDelete(false) },
          {
            text: 'Đồng ý',
            onPress: () => {
              dispatch(removePlan(dataDelete.index)), setShowModalDelete(false);
            },
          },
        ]}
        title={'Xóa kế hoạch'}
        message={
          'Xoá kế hoạch từ ngày ' +
          moment(dataDelete.newDateStart).format('DD/MM/YYYY') +
          ' đến ngày ' +
          moment(dataDelete.newDateFinish).format('DD/MM/YYYY') +
          '\nChi tiết kế hoạch sẽ xóa: ' +
          '\nNgân sách: ' +
          dataDelete.newBudget +
          '\nSố tiền đã sử dụng: ' +
          dataDelete.newCurrentuse
        }
      />
      <Modal
        visible={showModalUpdate}
        onRequestClose={() => setShowModalUpdate(false)}
        transparent>
        <Pressable
          style={styles.modal_view}
          onPress={() => setShowModalUpdate(false)}
        />

        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView>
                <View style={styles.modal_bigrow}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: scale(20),
                      fontFamily: 'Inter-Bold',
                    }}>
                    Sửa đổi kế hoạch
                  </Text>
                  <View style={styles.modal_row}>
                    <Text style={styles.text_modal}>1. Ngày bắt đầu : </Text>
                    <TextInput
                      style={styles.textInput_style}
                      editable={false}
                      value={newData.dateStart}
                      //placeholder={newData.dateStart}
                      textColor="#000"
                    />
                  </View>

                  <View style={styles.modal_row}>
                    <Text style={styles.text_modal}>2. Ngày kết thúc: </Text>
                    <TextInput
                      style={styles.textInput_style}
                      editable={false}
                      value={newData.dateFinish}
                      textColor="#000"
                    />
                  </View>

                  <View style={styles.modal_row}>
                    <Text style={styles.text_modal}>3. Định mức : </Text>
                    <TextInput
                      style={styles.textInput_style}
                      onChangeText={setBudget}
                      value={budget}
                      placeholderTextColor="black"
                      //underlineStyle={{ borderWidth: 0 }}
                      textColor="blue"
                      activeUnderlineColor="black"
                      keyboardType="numeric"
                    />
                  </View>

                  <CustomButton
                    colorPress={'#FFC700'}
                    colorUnpress={'#ffeba3'}
                    text_style={styles.text_style}
                    title={'LƯU'}
                    onPressFunction={onConfirmChange}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
  },

  text: {
    fontSize: scale(13),
    color: '#000000',
    fontFamily: 'Inter-Medium',
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
    borderColor: 'hsl(0,0%,80%)',

  },

  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },

  big_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: scale(30),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },

  slider_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  figure_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'green',
    width: '100%',
    alignItems: 'flex-end',
    //alignItems: 'center',
  },

  updatebox: {
    flexDirection: 'row',
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
    height: '120%',
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'hsl(0,0%,80%)',
    elevation: 10,
  },
  modal_bigrow: {
    alignItems: 'center',
    //flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'center',
  },

  modal_row: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //borderWidth:1
  },
  textInput_style: {
    fontSize: scale(16),
    borderBottomColor: 'black',
    width: '50%',
    backgroundColor: '#ffffff',
    height: scale(30),
  },

  text_modal: {
    //fontSize: scale(20),
    fontSize: 15,
    color: '#000000',
    //fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },

  text_style: {
    color: 'black',
    fontSize: scale(16),
    fontFamily: 'Inter-Bold',
  },
});
