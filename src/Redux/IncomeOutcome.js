import {firebase} from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';
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
    },
    updateData: (state, action) => {
      state.map((item, index) => {
        firebase
          .firestore()
          .collection('Accounts')
          .doc(firebase.auth().currentUser.uid)
          .collection('InOutdata')
          .doc(item.key)
          .delete();
      });
      state.map((item, index) => {
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
          .collection('InOutdata')
          .doc(item.key)
          .set({newData})
          .then(() => {
            firebase
              .firestore()
              .collection('Accounts')
              .doc(firebase.auth().currentUser.uid)
              .set({data: true}, {merge: true});
          });
      });
    },
  },
});
export const {addData, updateData} = IncomeOutcome.actions;
export default IncomeOutcome.reducer;
