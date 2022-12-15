import {createSlice} from '@reduxjs/toolkit';
const IncomeOutcome = createSlice({
    name: 'IncomeOutcome',
    initialState: [],
    reducers:{
       addData:(state, action) =>{
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
    },
<<<<<<< HEAD
=======
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
          .collection('InOutdata')
          .doc(item.key)
          .set(newData);
        firebase
          .firestore()
          .collection('Accounts')
          .doc(firebase.auth().currentUser.uid)
          .set({data: true}, {merge: true});
      });
    },
  },
>>>>>>> 1d36d94abd1da2cc2370d2c18c1c0d4f724d2115
});

export const { addData } = IncomeOutcome.actions;
export default IncomeOutcome.reducer;