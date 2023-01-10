import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {addData, deleteIO, removeData} from '../Redux/IncomeOutcome';
import {addPlan} from '../Redux/PlanData';
import CustomButton from '../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
function Onboarding({navigation}) {
  const dataIORef = firebase
    .firestore()
    .collection('Accounts')
    .doc(firebase.auth().currentUser.uid)
    .collection('InOutData');
  const dataPlanRef = firebase
    .firestore()
    .collection('Accounts')
    .doc(firebase.auth().currentUser.uid)
    .collection('PlanData');
  const dispatch = useDispatch();
  setTimeout(() => {
    navigation.navigate('Drawer');
  }, 1000);
  useEffect(() => {
    dataIORef
      .orderBy('time', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {name, value, isIncome, isPossession, time,isDifferent} = doc.data();
          dispatch(
            addData({
              key: doc.id,
              name,
              value,
              isIncome,
              isPossession,
              time,
              isDifferent,
            }),
          );
        });
      });
    dataPlanRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {
          dateStart,
          dateFinish,
          budget,
          currentuse,
          percentage_of_use,
          isExceed,
        } = doc.data();
        dispatch(
          addPlan({
            key: doc.id,
            dateStart,
            dateFinish,
            budget,
            currentuse,
            percentage_of_use,
            isExceed,
          }),
        );
      });
    });
    console.log('useEffect');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function getData() {
  //   console.log('getdata');
  //   dataIORef.get().then(querySnapshot => {
  //     console.log('chay snapshot');
  //     dispatch(deleteIO());
  //     querySnapshot.forEach(doc => {
  //       console.log('chay tung pt');
  //       const {name, value, isIncome, isPossession, time} = doc.data();
  //       dispatch(
  //         addData({
  //           key: doc.id,
  //           name,
  //           value,
  //           isIncome,
  //           isPossession,
  //           time,
  //         }),
  //       );
  //     });
  //   });
  //   console.log('getData');
  //   dataPlanRef.onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       const {
  //         dateStart,
  //         dateFinish,
  //         budget,
  //         currentuse,
  //         percentage_of_use,
  //         isExceed,
  //       } = doc.data();
  //       dispatch(
  //         addPlan({
  //           key: doc.id,
  //           dateStart,
  //           dateFinish,
  //           budget,
  //           currentuse,
  //           percentage_of_use,
  //           isExceed,
  //         }),
  //       );
  //     });
  //   });
  // }
  return (
    <View>
      <Text>Onboarding</Text>
    </View>
  );
}
export default Onboarding;
