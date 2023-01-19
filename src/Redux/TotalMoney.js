import {createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/firestore';
const TotalMoney = createSlice({
  name: 'TotalMoney',
  initialState: {value: 0},
  reducers: {
    UpdateMoney: (state, action) => {
      state.value = action.payload;
    },
    IncreaseTotal: (state, action) => {
      state.value += action.payload;
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('TotalMoney')
        .doc('TotalMoney')
        .set({money: state.value}, {merge: true});
    },
    DecreaseTotal: (state, action) => {
      state.value -= action.payload;
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .set({money: state.value}, {merge: true});
    },
  },
});

export const {UpdateMoney, IncreaseTotal, DecreaseTotal} = TotalMoney.actions; // JS object, contain information
export default TotalMoney.reducer; // Update state in a copy page
// actions : contain type field, and tell the store what kind of action to perform
// reducers : contain function, take the current state and action and return the new state and tell the store how to do
// Store : hold the all the state of app
