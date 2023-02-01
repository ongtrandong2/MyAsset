import {createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/firestore';
import { Keyboard } from 'react-native';
const Year = createSlice({
  name: 'Year',
  initialState: [],
  reducers: {
    UpdateYear: (state, action) => {
      // const newYear = {
      //   yearKey: action.payload.key,
      //   year: action.payload.year,
      // };
      state.push(action.payload);
      // firebase
      //   .firestore()
      //   .collection('Accounts')
      //   .doc(firebase.auth().currentUser.uid)
      //   .collection('Year')
      //   .doc(newYear.yearKey)
      //   .set(newYear, {merge: true});

      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('Year')
        .doc('Year')
        .set({year: state},{merge: true})
        //.set()
        .then(() => {
        Keyboard.dismiss();
      })
    },
    resetYear: (state, action) =>{
      state = [];
    }
  },
});

export const {UpdateYear,resetYear} = Year.actions;
export default Year.reducer;
