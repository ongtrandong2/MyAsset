import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Animated,
  KeyboardAvoidingView
} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
//import {TotalMoney} from '../Redux/TotalMoney';
//import { addPossession } from '../Redux/PossessionData';
//import {addIncome} from '../Redux/IncomeData';




export default function HomeScreen({ navigation }) {
  const money = useSelector(state => state.totalMoney.value);

  const incomeData = useSelector(state => state.incomeData);
  const outcomeData = useSelector(state => state.outcomeData);
  const IncomeOutCome = useSelector(state => state.IncomeOutCome);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('50%');

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(20)}
          title="TỔNG QUAN"
          style={{ color: 'black', fontWeight: 'bold' }}
        />

        <View style={styles.row}>
          <Text style={{ color: '#BB2424', fontSize: scale(20), fontWeight: 'bold' }}>
            {money} VNĐ
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={{ color: '#BB2424', fontSize: scale(15) }}>Tổng số dư</Text>
        </View>

        <View style={styles.big_row}>
          <Text style={{ color: '#000000', fontSize: scale(15) }}>
            Upgrade this function
          </Text>
        </View>



        <View style={styles.big_row}>
          <View style={styles.slider_view}>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {
                    backgroundColor: '#FF9900',
                    width: number ? number : '50%',
                    borderRadius: 5,
                  })
                }
              />
            </View>

            <View style={styles.figure_view}>
              <View style={styles.name_view}>
                <Text style={[styles.text, { color: 'red' }]}>50000</Text>
              </View>

              <View style={styles.money_view}>
                <Text style={[styles.text, { color: 'red' }]}>{money} VND</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.big_row}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>THU CHI GẦN ĐÂY</Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.box_view}>
            <ScrollView>
              {IncomeOutCome.slice(0).reverse().map((item, index) => {
                return (
                  <View key={index}>
                    {item.isPossession === false && (
                      <View style={styles.figure_view}>
                        <View style={styles.name_view}>
                          <Text style={styles.text}>{item.name}</Text>
                        </View>

                        <View style={styles.money_view}>
                          {item.isIncome === true ? 
                            (<Text style={[styles.text, { color: '#00CC00' }]}>+ {item.value} VND</Text>) 
                            :
                            (<Text style={[styles.text, { color: '#DF2828' }]}>- {item.value} VND</Text>)
                          }
                        </View>
                      </View>

                    )}

                  </View>
                );
              })}

              
            </ScrollView>
          </View>
        </View>


        <View style={styles.big_row}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>TÀI SẢN</Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.box_view}>
            <ScrollView>

              {IncomeOutCome.slice(0).reverse().map((item, index) => {
                return (
                  <View key={index}>
                    {item.isPossession === true && (
                      <View style={styles.figure_view}>
                        <View style={styles.name_view}>
                          {item.isIncome === false ? 
                              (<Text style={styles.text}>+ {item.name}</Text>)
                              :
                              (<Text style={styles.text}>- {item.name}</Text>)
                          }
                        </View>

                        <View style={styles.money_view}>
                          {item.isIncome === true ? 
                              (<Text style={[styles.text, { color: '#00CC00' }]}>+ {item.value} VND</Text>)
                              : 
                              (<Text style={[styles.text, { color: '#DF2828' }]}>- {item.value} VND</Text>)
                          }
                        </View>
                      </View>

                    )}

                  </View>
                );
              })}


            </ScrollView>
          </View>
        </View>
        <View style={{ paddingTop: 200 }}>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    //paddingBottom: 100,
  },

  text: {
    fontSize: scale(15),
    color: '#000000',
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    //justifyContent:'center',
    //marginLeft:20,
    paddingLeft: scale(20),
  },

  big_row: {
    marginTop: scale(5),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slider_view: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'pink',
    width: '90%',
    height: scale(50),
  },

  box_view: {
    width: '90%',
    height: scale(200),
    backgroundColor: '#FFEFB6',
    padding: scale(10),
    borderRadius: scale(10),
  },

  figure_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'green',
    width: '95%',
    height: scale(30),
    marginBottom: scale(5),
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
});
