import {createSlice} from '@reduxjs/toolkit';
import firebase from '@react-native-firebase/firestore';
const PossessionData = createSlice({
  name: 'PossessionData',
  initialState: [],
  reducers: {
    addPossession: (state, action) => {
      const newPossession = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        note: action.payload.note,
      };
      state.push(newPossession);
    },
    removePossession: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateData: state => {
      state.map(item => {
        const newData = {
          key: item.key,
          name: item.name,
          value: item.value,
          isIncome: item.isIncome,
          isPossession: item.isPossession,
          time: item.time,
        };
        firebase
          .firestore()
          .collection('Accounts')
          .doc(firebase.auth().currentUser.uid)
          .collection('PossessionData')
          .doc(item.key)
          .set(newData);
      });
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .set({data: true}, {merge: true});
    },
  },
});

export const { addPossession, removePossession } = PossessionData.actions;
export default PossessionData.reducer;
