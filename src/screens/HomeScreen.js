import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import moment from 'moment';
import CustomModal from '../components/CustomModal';

import {useSelector, useDispatch} from 'react-redux';
import {ShowModal} from '../Redux/ModalNumber';

export default function HomeScreen({navigation}) {
  const money = useSelector(state => state.totalMoney.value);
  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const planData = useSelector(state => state.planData);
  const isShowModal = useSelector(state => state.modalNumber.IsShowModal);
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();

  //const [currentDate, setCurrentDate] = useState(new Date(moment(currentDate).format("YYYY-MM-DD")));
  const [currentDate, setCurrentDate] = useState(new Date());
  let d1 = new Date(moment(currentDate).format('YYYY-MM-DD')); //

  //console.log(IncomeOutcome);
  let plan = planData.filter(item => {
    let d2 = new Date(moment(item.dateStart).format('YYYY-MM-DD'));
    let d3 = new Date(moment(item.dateFinish).format('YYYY-MM-DD'));
    return d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime();
  });

  plan.sort(
    (a, b) =>
      new Date(...a.dateStart.split('-')) - new Date(...b.dateStart.split('-')),
  );
  
  //console.log(plan);
  // let d ="";
  // if(currentDate.getMonth()+1 < 10) {
  //   d = '0' + (currentDate.getMonth() + 1).toString();
  // } else d = (currentDate.getMonth() + 1).toString();

  // let plan = planData.filter(item =>{
  //   let currentMonth = "";
  //   if (((new Date(item.dateStart)).getMonth() + 1 ) < 10 )
  //     currentMonth = '0' + (new Date(item.dateStart).getMonth() + 1).toString();
  //   else currentMonth = (new Date(item.dateStart).getMonth() + 1).toString();
  //   return (currentMonth === d);
  // });

  // console.log(plan);
  
  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          //fontSize={scale(20)}
          title="TỔNG QUAN"
          style={{color: 'black', fontFamily: 'Inter-Bold'}}
        />

        <View style={styles.row}>
          <Text
            style={{
              color: '#BB2424',
              fontSize: scale(18),
              fontFamily: 'Inter-Bold',
            }}>
            {money} VNĐ
          </Text>
        </View>

        <View style={styles.row}>
          <Text
            style={{
              color: '#BB2424',
              fontSize: scale(13),
              fontFamily: 'Inter-Medium',
            }}>
            Tổng số dư
          </Text>
        </View>

        <View style={styles.big_row}>
          <Text
            style={{
              color: '#000000',
              fontSize: scale(15),
              fontFamily: 'Inter-Bold',
            }}>
            KẾ HOẠCH
          </Text>
        </View>

        {plan.length === 0 ? (
          <View style={styles.big_row}>
            <Text
              style={{
                fontSize: scale(18),
                color: '#CDCACA',
                fontFamily: 'Inter-Regular',
              }}>
              Chưa có kế hoạch cho tháng này!
            </Text>
          </View>
        ) : (
          <>
            {plan.slice(0, 1).map((item, index) => {
              return (
                <View key={index}>
                  <View style={[styles.big_row, {marginTop: scale(10)}]}>
                    <View style={styles.slider_view}>
                      <View style={styles.figure_view}>
                        <Text style={{fontSize: scale(13), color: 'black'}}>
                          {moment(item.dateStart).format('DD/MM/YYYY')} -{' '}
                          {moment(item.dateFinish).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                      <View style={styles.progressBar}>
                        <Animated.View
                          style={
                            ([StyleSheet.absoluteFill],
                            {
                              backgroundColor: item.isExceed
                                ? 'hsl(0,74%,52%)'
                                : '#FF9900',
                              width: String(item.percentage_of_use) + '%',
                              borderRadius: 5,
                            })
                          }
                        />
                      </View>

                      <View style={styles.figure_view}>
                        <Text style={[styles.text, {color: 'red'}]}>
                          {item.currentuse}
                        </Text>
                        <Text style={[styles.text, {color: 'red'}]}>
                          {item.budget} VND
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}

        <View style={styles.big_row}>
          <Text
            style={[
              styles.text,
              {fontFamily: 'Inter-Bold', fontSize: scale(15)},
            ]}>
            THU CHI GẦN ĐÂY
          </Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.box_view}>
            <ScrollView>
              {IncomeOutcome.map((item, index) => {
                return (
                  <View key={index}>
                    {item.isDifferent ? null : (
                      <View style={styles.figure_view}>
                        {item.isPossession ? (
                          item.isIncome ? (
                            <Text style={[styles.text, {fontWeight: '500'}]}>
                              {item.name} - BÁN
                            </Text>
                          ) : (
                            <Text style={[styles.text, {fontWeight: '500'}]}>
                              {item.name} - MUA
                            </Text>
                          )
                        ) : (
                          <Text style={[styles.text, {fontWeight: '500'}]}>
                            {item.name}
                          </Text>
                        )}

                        {item.isIncome === true ? (
                          <Text
                            style={[
                              styles.text,
                              {color: '#00CC00', fontWeight: '500'},
                            ]}>
                            + {item.value} VND
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.text,
                              {color: '#DF2828', fontWeight: '500'},
                            ]}>
                            - {item.value} VND
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                );
              })
                .reverse()
                .slice(0, 8)}
            </ScrollView>
          </View>
        </View>

        <View style={styles.big_row}>
          <Text
            style={[
              styles.text,
              {fontFamily: 'Inter-Bold', fontSize: scale(15), marginTop: 5},
            ]}>
            TÀI SẢN
          </Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.box_view}>
            <ScrollView>
              {possessionData
                .map((item, index) => {
                  return (
                    <View key={index}>
                      <View style={styles.figure_view}>
                        <Text style={[styles.text, {fontWeight: '500'}]}>
                          {' '}
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            {color: 'hsl(36,100%,52%)', fontWeight: '500'},
                          ]}>
                          {item.value} VND
                        </Text>
                      </View>
                    </View>
                  );
                })
                .reverse()
                .slice(0, 8)}
            </ScrollView>
          </View>
        </View>
        {/* <View style={{ paddingTop: 200 }}>
        
        </View> */}
      </ScrollView>
      <View
        style={{
          height: scale(100),
          bottom: 0,
          backgroundColor: '#fff',
        }}
      />

      <Modal
        visible={isShowModal}
        onRequestClose={() => dispatch(ShowModal(false))}
        transparent
        //statusBarTranslucent
        animationType="fade">
        <CustomModal />
      </Modal>
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
    fontSize: scale(14),
    color: '#000000',
    fontFamily: 'Inter-Bold',
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
  },

  box_view: {
    width: '90%',
    height: scale(200),
    backgroundColor: '#FFEFB6',
    padding: scale(10),
    borderRadius: scale(30),
  },

  figure_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 1,
  },

  progressBar: {
    height: scale(10),
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: scale(5),
    flexDirection: 'row',
  },
});
