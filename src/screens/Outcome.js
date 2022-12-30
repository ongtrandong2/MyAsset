import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import scale from '../constants/scale';
import moment from 'moment';
import randomColor from "../constants/randomColor";
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from "react-redux";
import { UpdateYear } from "../Redux/Year";
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default function Outcome() {
  const [option, setOption] = useState('month');
  const [itemSelected, setItemSelected] = useState('01');
  const [yearSelected, setYearSelected] = useState(2022);
  const [showModal, setShowModal] = useState(false);
  const [isShowCalendar, setShowCalendar] = useState(false);
  const [isShowCalendarFinish, setShowCalendarFinish] = useState(false);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [acceptDateStart, setAcceptDateStart] = useState();
  const [acceptDateEnd, setAcceptDateEnd] = useState();
  //const [result_ByOption, setResult_ByOption] = useState([]);

  const currentTime = new Date();
  let d = currentTime.getFullYear();
  let total = 0;
  let total_ByYear = 0;
  let total_ByOption = 0;

  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const YEAR = useSelector(state => state.year);
  const dispatch = useDispatch();

  let Outcome = IncomeOutcome.filter((item) => {
    return (
      item.isIncome === false && moment(item.time).format('MM') === itemSelected
    )
  })

  //console.log(Outcome)
  ///
  let result = [];
  Outcome.map((item) => {
    if ((result.map(itemr => itemr.name)).indexOf(item.name) === -1) {
      const newData = {
        name: item.name,
        value: Number(item.value),
        color: randomColor(),
        legendFontColor: 'black',
        legendFontSize: 15,
        legendFontFamily: 'Inter-Regular',
      }
      result.push(newData);
    }
    else if ((result.map(itemr => itemr.name)).indexOf(item.name) > -1) {
      let newIndex = (result.map(itemr => itemr.name).indexOf(item.name))
      result[newIndex].value += Number(item.value);
    }
  })

  result.map((item) => {
    total += item.value;
  })

  //console.log(result);
  //console.log(total);
  const MONTH = [
    { month: '01' },
    { month: '02' },
    { month: '03' },
    { month: '04' },
    { month: '05' },
    { month: '06' },
    { month: '07' },
    { month: '08' },
    { month: '09' },
    { month: '10' },
    { month: '11' },
    { month: '12' },
  ]


  if (YEAR.indexOf(d) === -1) {
    dispatch(UpdateYear((d)));
  }

  let Outcome_ByYear = IncomeOutcome.filter((item) => {
    return (
      item.isIncome === false && moment(item.time).format("YYYY") === yearSelected.toString()
    )
  })

  //console.log(Outcome_ByYear);

  const result_ByYear = [
    { month: '01', value: 0 },
    { month: '02', value: 0 },
    { month: '03', value: 0 },
    { month: '04', value: 0 },
    { month: '05', value: 0 },
    { month: '06', value: 0 },
    { month: '07', value: 0 },
    { month: '08', value: 0 },
    { month: '09', value: 0 },
    { month: '10', value: 0 },
    { month: '11', value: 0 },
    { month: '12', value: 0 },
  ]

  Outcome_ByYear.map((item) => {
    let newIndex = (result_ByYear.map(itemr => itemr.month)).indexOf(moment(item.time).format('MM'))
    result_ByYear[newIndex].value += Number(item.value);
  })

  result_ByYear.map((item) => {
    total_ByYear += item.value;
  })

  //console.log(result_ByYear);
  //console.log(result_ByYear.map(item => item.value))


  const handleConfirm = (date) => {
    setDateStart(moment(date).format('YYYY-MM-DD'));
    setShowCalendar(false);
  }

  const handleConfirm_Finish = (date) => {
    setDateEnd(moment(date).format('YYYY-MM-DD'));
    setShowCalendarFinish(false);
  }

  const onConfirm = () => {
    let d1 = new Date(dateStart);
    let d2 = new Date(dateEnd);
    if (d1.getTime() >= d2.getTime()) {
      Alert.alert(
        'Warning',
        'Ngày bắt đầu lớn hơn ngày kết thúc! Vui lòng nhập lại dữ liệu!',
      );
    }
    else {
      setAcceptDateStart(d1);
      setAcceptDateEnd(d2);
      setDateStart('');
      setDateEnd('');
      setShowModal(false);

    }

  }
  //console.log(acceptDateStart);
  //console.log(result_ByOption);

  let result_ByOption = [];
  if (acceptDateStart !== undefined && acceptDateEnd !== undefined) {
    //console.log(acceptDateStart.getTime() );
    let Outcome_ByOption = IncomeOutcome.filter((item) => {
      let d = new Date(moment(item.time).format('YYYY-MM-DD'));
      return (
        item.isIncome === false && d.getTime() >= acceptDateStart.getTime() && d.getTime() <= acceptDateEnd.getTime()
      )
    })
    //console.log(Outcome_ByOption);
    Outcome_ByOption.map((item) => {
      if (result_ByOption.map(itemr => itemr.name).indexOf(item.name) === -1) {
        const newData = {
          name: item.name,
          value: Number(item.value),
          color: randomColor(),
          legendFontColor: 'black',
          legendFontSize: 15,
          legendFontFamily: 'Inter-Regular',
        }
        result_ByOption.push(newData);
      }
      else if (result_ByOption.map(itemr => itemr.name).indexOf(item.name) > -1) {
        let newIndex = (result_ByOption.map(itemr => itemr.name).indexOf(item.name))
        result_ByOption[newIndex].value += Number(item.value);
      }
    })
  }

  //console.log(result_ByOption);
  result_ByOption.map(item => {
    total_ByOption += item.value;
  })

  return (
    <KeyboardAvoidingView style={styles.view}>
      <View>
        {option === 'month' ? (
          <>
            <View style={styles.big_row}>
              <FlatList
                keyExtractor={item => item.month.toString()}
                horizontal
                data={MONTH}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.month_container}>
                      <TouchableOpacity
                        style={[
                          styles.month_item,
                          {
                            backgroundColor:
                              itemSelected === item.month
                                ? 'hsl(47,100%,78%)'
                                : '#ffffff',
                          },
                        ]}
                        onPress={() => setItemSelected(item.month)}>
                        <Text style={styles.text}>
                          {item.month}/{d}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.big_row}>
              <PieChart
                data={result}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  //backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  //marginVertical: 8,
                  borderRadius: 16,
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
              //absolute //for the absolute number remove if you want percentage
              />
            </View>
            {result.length === 0 ? null : (
              <ScrollView style={{ height: '30%' }}>
                <View style={styles.big_row}>
                  <Text style={styles.text}>TỔNG: {total} VND</Text>
                  <Text style={styles.text}>Chi tiết</Text>
                  {result.map((item, index) => {
                    return (
                      <View style={styles.row} key={index}>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              height: 20,
                              width: 20,
                              backgroundColor: item.color,
                              marginRight: 5,
                            }}
                          />
                          <Text style={styles.text}>{item.name}</Text>
                        </View>
                        <Text style={styles.text}>{item.value} VND</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </>
        ) : option === 'year' ? (
          <>
            <View style={styles.big_row}>
              <FlatList
                keyExtractor={item => item.toString()}
                horizontal
                data={YEAR}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.month_container}>
                      <TouchableOpacity
                        style={[
                          styles.month_item,
                          {
                            backgroundColor:
                              yearSelected === item
                                ? 'hsl(47,100%,78%)'
                                : '#ffffff',
                          },
                        ]}
                        onPress={() => setYearSelected(item)}>
                        <Text style={styles.text}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.big_row}>
              <LineChart
                data={{
                  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
                  datasets: [
                    {
                      data: result_ByYear.map(item => item.value),
                    },
                  ],
                }}
                width={Dimensions.get('window').width} // from react-native
                height={scale(220)}
                //height={220}
                //yAxisLabel="$"
                //yAxisSuffix="VND"
                withShadow={false}
                //withVerticalLines = {false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  fillShadowGradientFrom: '#ffffff',
                  fillShadowGradientFromOpacity: 0,
                  fillShadowGradientFromOffset: 0,
                  fillShadowGradientTo: '#ffffff',

                  strokeWidth: 3,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 0) => `rgb(91, 155, 213)`,

                  labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    //stroke: "#000000"
                    stroke: 'rgb(91, 155, 213)',
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>

            {result_ByYear.length === 0 ? null : (
              <ScrollView style={{ height: '30%' }}>
                <View style={styles.big_row}>
                  <Text style={styles.text}>TỔNG: {total_ByYear} VND</Text>
                  {result_ByYear.map((item, index) => {
                    return (
                      <View style={styles.row} key={index}>
                        <Text style={styles.text}>Tháng {item.month}</Text>
                        <Text style={styles.text}>{item.value} VND</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </>
        ) : (
          <>
            {acceptDateStart === undefined ? null : (
              <>
                <View style={styles.big_row}>
                  <View style={styles.month_container}>
                    <View style={[styles.month_item, { backgroundColor: 'hsl(47,100%,78%)' }]}>
                      <Text style={styles.text}>{moment(acceptDateStart).format('DD/MM/YYYY')} - {moment(acceptDateEnd).format('DD/MM/YYYY')} </Text>
                    </View>
                  </View>
                </View>

                {result_ByOption.length === 0 ? (
                  <View style={styles.big_row}>
                    <Text
                      style={{
                        fontSize: scale(30),
                        color: '#CDCACA',
                        fontFamily: 'Inter-Medium',
                        textAlign: 'center',
                      }}>
                      Chưa có dữ liệu thống kê cho thời gian này!
                    </Text>
                  </View>
                ) : (
                <View style={styles.big_row}>
                  <PieChart
                    data={result_ByOption}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={{
                      //backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    style={{
                      //marginVertical: 8,
                      borderRadius: 16,
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                  //absolute //for the absolute number remove if you want percentage
                  />
                </View>)}

                {result_ByOption.length === 0 ? null : (
                  <ScrollView style={{ height: '30%' }}>
                    <View style={styles.big_row}>
                      <Text style={styles.text}>TỔNG: {total_ByOption} VND</Text>
                      <Text style={styles.text}>Chi tiết</Text>
                      {result_ByOption.map((item, index) => {
                        return (
                          <View style={styles.row} key={index}>
                            <View style={{ flexDirection: 'row' }}>
                              <View
                                style={{
                                  height: 20,
                                  width: 20,
                                  backgroundColor: item.color,
                                  marginRight: 5,
                                }}
                              />
                              <Text style={styles.text}>{item.name}</Text>
                            </View>
                            <Text style={styles.text}>{item.value} VND</Text>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}
              </>
            )}

          </>
        )}
      </View>

      <View style={styles.bottom_tab}>
        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderRightWidth: 2,
              backgroundColor: option === 'month' ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setOption('month')}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/piechart.png')}
              style={{ height: 30, width: 30 }}
              resizeMode="stretch"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={[styles.text, { fontSize: scale(20) }]}>THÁNG</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderHorizontalWidth: 2,
              backgroundColor: option === 'year' ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setOption('year')}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/linechart.png')}
              style={{ height: 30, width: 30 }}
              resizeMode="stretch"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={[styles.text, { fontSize: scale(20), paddingLeft: 5 }]}>NĂM</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderLeftWidth: 2,
              backgroundColor: option === 'optional' ? '#ffeba3' : '#ffffff',
              paddingLeft: 5,
            },
          ]}
          onPress={() => { setOption('optional'), setShowModal(true) }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/optional.png')}
              style={{ height: 30, width: 30 }}
              resizeMode="stretch"
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={[styles.text, { fontSize: scale(18), fontFamily: 'Inter-Medium', paddingLeft: 5 }]}>TÙY CHỌN</Text>
          </View>
        </TouchableOpacity>
      </View>


      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        //statusBarTranslucent
        animationType='fade'
      >
        <Pressable
          style={[styles.modal_view, { flex: 2 }]}
          onPress={() => setShowModal(false)}
        />

        <View style={[styles.modal_view, { flex: 1 }]}>
          <View style={styles.modal_box}>
            <View style={styles.big_row}>
              <Text style={{
                color: '#000',
                fontSize: scale(20),
                fontFamily: 'Inter-Bold',
                paddingTop: 10
              }}>
                Tùy chọn thời gian thống kê
              </Text>
              <View style={styles.modal_row}>
                <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>Ngày bắt đầu: </Text>
                <TextInput
                  style={styles.textInput_style}
                  editable={false}
                  placeholderTextColor="black"
                  textColor="blue"
                  activeUnderlineColor="black"
                  onChageText={setDateStart}
                  value={dateStart}
                  right={
                    <TextInput.Icon
                      icon={{
                        uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                      }}
                      onPress={() => setShowCalendar(true)}
                    />
                  }
                />
                <DateTimePickerModal
                  isVisible={isShowCalendar}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={() => setShowCalendar(false)}
                />
              </View>
              <View style={styles.modal_row}>
                <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>Ngày kết thúc: </Text>
                <TextInput
                  style={styles.textInput_style}
                  editable={false}
                  //placeholderTextColor="black"
                  textColor="blue"
                  activeUnderlineColor="black"
                  value={dateEnd}
                  onChageText={setDateEnd}
                  underlineStyle={{ borderWidth: 0 }}
                  right={
                    <TextInput.Icon
                      icon={{
                        uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                      }}
                      onPress={() => setShowCalendarFinish(true)}
                    />
                  }
                />
                <DateTimePickerModal
                  isVisible={isShowCalendarFinish}
                  mode="date"
                  onConfirm={handleConfirm_Finish}
                  onCancel={() => setShowCalendarFinish(false)}
                />
              </View>
            </View>

            <View style={styles.modal_bigrow}>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#FFC700' : '#ffeba3' },
                  { paddingVertical: 5, borderWidth: 2, borderRadius: 20, borderColor: 'orange', paddingHorizontal: 20 }
                ]}
                onPress={onConfirm}
              >
                <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>LƯU</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  big_row: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  month_container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    //borderWidth:1,

  },
  month_item: {
    //backgroundColor: 'hsl(47,100%,78%)',
    borderColor: '#ffc700',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
  },
  text: {
    fontSize: scale(20),
    color: '#000000',
    //fontFamily: 'Itim-Regular',
    fontFamily: 'Inter-Regular',
  },
  bottom_tab: {
    bottom: scale(100),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    //paddingBottom:10,
    

  },
  bottom_item: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'hsl(36,100%,52%)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: '100%' // have no choice but put the height here to keep 3 box have the same height
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  //Modal 
  modal_view: {
    //flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',

  },
  modal_box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modal_bigrow: {
    alignItems: 'center',
    //flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'center',

  },


  modal_row: {
    width: '90%',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textInput_style: {
    fontSize: scale(20),
    paddingVertical: 3,
    //borderBottomWidth: 0.5,
    width: '50%',
    height: scale(25),
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    borderBottomColor: '#000',

  },
});




