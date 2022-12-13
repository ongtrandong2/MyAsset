import {createSlice} from '@reduxjs/toolkit';
const TotalMoney = createSlice({
  name: 'TotalMoney',
  initialState: {value: 0},
  reducers: {
    UpdateMoney: (state, action) => {
      state.value = action.payload;
    },
    IncreaseTotal: (state, action) => {
      state.value += action.payload;
    },
    DecreaseTotal: (state, action) => {
      state.value -= action.payload;
    },
  },
});

<<<<<<< HEAD
export const {UpdateMoney, IncreaseTotal, DecreaseTotal} = TotalMoney.actions; // JS object
export default TotalMoney.reducer; // Update state in a copy page
=======
export const { UpdateMoney,IncreaseTotal ,DecreaseTotal } = TotalMoney.actions; // JS object
export default TotalMoney.reducer; // Update state in a copy page 
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
