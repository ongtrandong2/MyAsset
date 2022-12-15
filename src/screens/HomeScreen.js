import React, { useState, useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import { ShowModal } from '../Redux/ModalNumber';

export default function HomeScreen({ navigation }) {
  const money = useSelector(state => state.totalMoney.value);
  const IncomeOutcome = useSelector(state => state.IncomeOutcome);
  const planData = useSelector(state => state.planData);
  const isShowModal = useSelector(state => state.modalNumber.IsShowModal);
  const possessionData = useSelector(state => state.possessionData);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('50%');
  //const [currentDate, setCurrentDate] = useState(new Date(moment(currentDate).format("YYYY-MM-DD")));
  const [currentDate, setCurrentDate] = useState(new Date());
  let d1 = new Date(moment(currentDate).format("YYYY-MM"));

  let plan = planData.filter(item => {
    let d2 = new Date(moment(item.dateStart).format("YYYY-MM"));
    let d3 = new Date(moment(item.dateFinish).format("YYYY-MM"));
    return (
      d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()
    )
  })

  plan.sort ((a,b)=>  new Date(...a.dateStart.split("-")) - new Date(...b.dateStart.split("-"))); 
 
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
          <Text style={{ color: '#000000', fontSize: scale(18), fontFamily: 'Itim-Regular' }}>
            KẾ HOẠCH
          </Text>
        </View>

        { plan.length === 0 ? (
          <View style = {styles.big_row}>
            <Text style = {{ fontSize: scale(20) ,  color: '#CDCACA', fontFamily: 'Itim-Regular'}}>Chưa có kế hoạch cho tháng này!</Text> 
          </View>
        ) :(
        <>
        {plan.slice(0,1).map((item, index) => {
          return (
            <View key={index}>
              <View style={[styles.big_row, { marginTop: scale(20) }]}>
                <View style={styles.slider_view}>
                  <View style={[styles.figure_view, { height: scale(20) }]}>
                    <Text style={{ fontSize: scale(15), color: 'black' }}>{moment(item.dateStart).format('DD/MM/YYYY')}  -  {moment(item.dateFinish).format('DD/MM/YYYY')}</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <Animated.View
                      style={
                        ([StyleSheet.absoluteFill],
                        {
                          backgroundColor: '#FF9900',
                          width:String(item.percentage_of_use)+"%",
                          borderRadius: 5,
                        })
                      }
                    />
                  </View>

                  <View style={styles.figure_view}>
                    <View style={styles.name_view}>
                      <Text style={[styles.text, { color: 'red' }]}>{item.currentuse}</Text>
                    </View>

                    <View style={styles.money_view}>
                      <Text style={[styles.text, { color: 'red' }]}>{item.budget} VND</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
       </> )}


        <View style={styles.big_row}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>THU CHI GẦN ĐÂY</Text>
        </View>

        <View style={styles.big_row}>
          <View style={styles.box_view}>
            <ScrollView>
              {IncomeOutcome.slice(0,10).reverse().map((item, index) => {
                return (
                  <View key={index}>
                      <View style={styles.figure_view}>
                        <View style={styles.name_view}>
                          { item.isPossession  ? 
                                ( item.isIncome ? (<Text style={styles.text}>{item.name} - BÁN</Text>)
                                               : (<Text style={styles.text}>{item.name} - MUA</Text>)
                              
                           ) : ( <Text style={styles.text}>{item.name}</Text> )}
                          
                        </View>

                        <View style={styles.money_view}>
                          {item.isIncome === true ?
                            (<Text style={[styles.text, { color: '#00CC00' }]}>+ {item.value} VND</Text>)
                            :
                            (<Text style={[styles.text, { color: '#DF2828' }]}>- {item.value} VND</Text>)
                          }
                        </View>
                      </View>

                    

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

              {possessionData.slice(0,10).reverse().map((item, index) => {
                return (
                   <View key={index}>
                      <View style={styles.figure_view}>
                        <View style={styles.name_view}>
                          
                          <Text style={styles.text}> {item.name}</Text>
                        </View>

                        <View style={styles.money_view}>
                          
                          <Text style={[styles.text, { color: 'hsl(36,100%,52%)' }]}> {item.value} VND</Text>
                        </View>
                      </View>
                  </View>
                );
              })}

             
            </ScrollView>
          </View>
        </View>
        {/* <View style={{ paddingTop: 200 }}>
        
        </View> */}
      </ScrollView>

      <Modal
        visible={isShowModal}
        onRequestClose={() => dispatch(ShowModal(false))}
        transparent
        //statusBarTranslucent
        animationType='fade'
      >
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
    borderRadius: scale(30),
   
  },

  figure_view: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    width: '100%',
    height: scale(30),
    marginBottom: scale(5),
  },

  name_view: {
    flex: 1,
    //paddingHorizontal: scale(5),
    //backgroundColor:'pink',

  },

  money_view: {
    flex: 1,
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
  /// Modal 

});
