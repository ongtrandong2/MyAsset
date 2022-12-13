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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import scale from '../constants/scale';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import randomColor from '../constants/randomColor';
import {PieChart, LineChart} from 'react-native-chart-kit';
import {useSelector, useDispatch} from 'react-redux';
import {UpdateYear} from '../Redux/Year';

export default function Outcome() {
  const [isMonth, setIsMonth] = useState(true);
  const currentTime = new Date();
  let d = currentTime.getFullYear();
  const [itemSelected, setItemSelected] = useState('01');
  const [yearSelected, setYearSelected] = useState(2022);
  let total = 0;
  let total_ByYear = 0;

  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const YEAR = useSelector(state => state.year);
  const dispatch = useDispatch();

  let Outcome = IncomeOutcome.filter(item => {
    return (
      item.isIncome === false &&
      item.isPossession === false &&
      moment(item.time).format('MM') === itemSelected
    );
  });

  //console.log(Outcome)
  ///
  var result = [];
  Outcome.map(item => {
    if (result.map(itemr => itemr.name).indexOf(item.name) === -1) {
      const newData = {
        name: item.name,
        value: Number(item.value),
        color: randomColor(),
        legendFontColor: 'black',
        legendFontSize: 15,
        legendFontFamily: 'Itim-Regular',
      };
      result.push(newData);
    } else if (result.map(itemr => itemr.name).indexOf(item.name) > -1) {
      let newIndex = result.map(itemr => itemr.name).indexOf(item.name);
      result[newIndex].value += Number(item.value);
    }
  });

  result.map(item => {
    total += item.value;
  });

  //console.log(result);
  //console.log(total);
  const MONTH = [
    {month: '01'},
    {month: '02'},
    {month: '03'},
    {month: '04'},
    {month: '05'},
    {month: '06'},
    {month: '07'},
    {month: '08'},
    {month: '09'},
    {month: '10'},
    {month: '11'},
    {month: '12'},
  ];

  if (YEAR.indexOf(d) === -1) {
    dispatch(UpdateYear(d));
  }

  let Outcome_ByYear = IncomeOutcome.filter(item => {
    return (
      item.isIncome === false &&
      item.isPossession === false &&
      moment(item.time).format('YYYY') === yearSelected.toString()
    );
  });

  //console.log(Outcome_ByYear);

  const result_ByYear = [
    {month: '01', value: 0},
    {month: '02', value: 0},
    {month: '03', value: 0},
    {month: '04', value: 0},
    {month: '05', value: 0},
    {month: '06', value: 0},
    {month: '07', value: 0},
    {month: '08', value: 0},
    {month: '09', value: 0},
    {month: '10', value: 0},
    {month: '11', value: 0},
    {month: '12', value: 0},
  ];

  Outcome_ByYear.map(item => {
    let newIndex = result_ByYear
      .map(itemr => itemr.month)
      .indexOf(moment(item.time).format('MM'));
    result_ByYear[newIndex].value += Number(item.value);
  });

  result_ByYear.map(item => {
    total_ByYear += item.value;
  });

  //console.log(result_ByYear);
  //console.log(result_ByYear.map(item => item.value))
  return (
    <KeyboardAvoidingView style={styles.view}>
      <View>
        {isMonth ? (
          <>
            <View style={styles.big_row}>
              <FlatList
                keyExtractor={item => item.month.toString()}
                horizontal
                data={MONTH}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
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
              <ScrollView style={{height: '30%'}}>
                <View style={styles.big_row}>
                  <Text style={styles.text}>TỔNG: {total} VND</Text>
                  <Text style={styles.text}>Chi tiết</Text>
                  {result.map((item, index) => {
                    return (
                      <View style={styles.row} key={index}>
                        <View style={{flexDirection: 'row'}}>
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
        ) : (
          <>
            <View style={styles.big_row}>
              <FlatList
                keyExtractor={item => item.toString()}
                horizontal
                data={YEAR}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
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
                  labels: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                  ],
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
              <ScrollView style={{height: '30%'}}>
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
        )}
      </View>

      <View style={styles.bottom_tab}>
        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderRightWidth: 2,
              backgroundColor: isMonth ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setIsMonth(true)}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/images/piechart.png')}
              style={{height: 30, width: 30}}
              resizeMode="stretch"
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={[styles.text, {fontSize: scale(30)}]}>THÁNG</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottom_item,
            {
              borderLeftWidth: 2,
              backgroundColor: !isMonth ? '#ffeba3' : '#ffffff',
            },
          ]}
          onPress={() => setIsMonth(false)}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/images/linechart.png')}
              style={{height: 30, width: 30}}
              resizeMode="stretch"
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={[styles.text, {fontSize: scale(30)}]}>NĂM</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'Itim-Regular',
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
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
});




