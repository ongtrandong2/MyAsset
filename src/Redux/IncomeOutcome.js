import {createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
// console.log(firebase.auth().currentUser.uid);
// const dataIORef = firebase
//   .firestore()
//   .collection('Accounts')
//   .doc(firebase.auth().currentUser.uid)
//   .collection('InOutData');
// // .firestore()
// // .collection('Accounts')
// // .doc(firebase.auth().currentUser.uid)
// // .collection('InOutData');

const IncomeOutcome = createSlice({
  name: 'IncomeOutcome',
  initialState: [],
  reducers: {
    addData: (state, action) => {
      const newData = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        isIncome: action.payload.isIncome,
        isPossession: action.payload.isPossession,
        time: action.payload.time,
      };
      state.push(newData);
      console.log(state, '\n');
    },
    addDataFirebase: (state, action) => {
      const newData = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        isIncome: action.payload.isIncome,
        isPossession: action.payload.isPossession,
        time: action.payload.time,
      };
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('InOutData')
        .doc(newData.key)
        .set(newData, {merge: true})
        .then(() => {
          Keyboard.dismiss();
        });
    },
    removeData: (state, action) => {
      state.splice(action.payload, 1);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('InOutData')
        .doc(action.payload.key)
        .delete()
        .then(() => {
          alert('Xóa thành cong');
        })
        .catch(error => {
          alert('Xóa thất bại');
        });
    },
    changeData: (state, action) => {
      state[action.payload.index].value = action.payload.value;
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('InOutData')
        .doc(action.payload.key)
        .update(
          {value: action.payload.value, time: action.payload.time},
          {merge: true},
        )
        .then(() => {
          alert('Update thành cong');
        })
        .catch(error => {
          alert('Update thất bại');
        });
    },
    deleteIO: (state, action) => {
      state.splice(0, state.length);
    },
  },
});
export const {addData, removeData, changeData, addDataFirebase, deleteIO} =
  IncomeOutcome.actions;
export default IncomeOutcome.reducer;
