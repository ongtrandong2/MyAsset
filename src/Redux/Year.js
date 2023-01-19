import {createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/firestore';
const Year = createSlice({
  name: 'Year',
  initialState: [],
  reducers: {
    UpdateYear: (state, action) => {
      const newYear = {
        yearKey: action.payload.key,
        year: action.payload.year,
      };
      state.push(action.payload);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('Year')
        .doc(newYear.yearKey)
        .set({year: newYear.year}, {merge: true});
    },
  },
});

export const {UpdateYear} = Year.actions;
export default Year.reducer;
