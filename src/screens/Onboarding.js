import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {addData, deleteIO, removeData} from '../Redux/IncomeOutcome';
import {addPlan} from '../Redux/PlanData';

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
  // useEffect(() => {
  //   dataIORef.orderBy('time', 'desc').onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
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
  //   console.log('useEffect');
  // }, []);
  function getData() {
    dataIORef.orderBy('time', 'desc').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {name, value, isIncome, isPossession, time} = doc.data();
        dispatch(
          addData({
            key: doc.id,
            name,
            value,
            isIncome,
            isPossession,
            time,
          }),
        );
      });
    });
    console.log('getData');
    dataPlanRef.onSnapshot(querySnapshot => {
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
  }
  return (
    //   getData(),
    //   (
    <View>
      <Text>Onboarding</Text>
    </View>
    //   )
  );
}
export default Onboarding;
