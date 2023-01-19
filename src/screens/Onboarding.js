import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {addData} from '../Redux/IncomeOutcome';
import {addPlan} from '../Redux/PlanData';
import {UpdateMoney} from '../Redux/TotalMoney';
import {UpdateYear} from '../Redux/Year';
import {setUserImage} from '../Redux/UserImage';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

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
  const moneyRef = firebase
    .firestore()
    .collection('Accounts')
    .doc(firebase.auth().currentUser.uid)
    .collection('TotalMoney')
    .doc('TotalMoney');
  const avtRef = firebase
    .firestore()
    .collection('Accounts')
    .doc(firebase.auth().currentUser.uid)
    .collection('UserImage')
    .doc('UserImage');
  const yearRef = firebase
    .firestore()
    .collection('Accounts')
    .doc(firebase.auth().currentUser.uid)
    .collection('Year');
  const dispatch = useDispatch();
  setTimeout(() => {
    navigation.navigate('Drawer');
  }, 2000);
  useEffect(() => {
    yearRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {year} = doc.data();
        dispatch(
          UpdateYear({
            yearKey: doc.id,
            year,
          }),
        );
      });
    });
    avtRef.get().then(snapshot => {
      if (snapshot.exists) {
        dispatch(setUserImage(snapshot.data().avt));
      } else {
        console.log('No such document!');
      }
    });
    moneyRef.get().then(querySnapshot => {
      const money = querySnapshot.data().money;
      dispatch(UpdateMoney(money));
    });
    dataIORef
      .orderBy('time', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {name, value, isIncome, isPossession, time, isDifferent} =
            doc.data();
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
          history,
          isShowHistory,
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
            history,
            isShowHistory,
          }),
        );
      });
    });
    //console.log('useEffect');
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
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 280,
          height: 280,
          backgroundColor: '#fff',
        }}
        source={require('../assets/images/129858-dancing-wallet-coins.json')}
      />
      <Text
        style={{
          fontSize: 20,
        }}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default Onboarding;
