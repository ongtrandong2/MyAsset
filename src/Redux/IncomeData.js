import {createSlice} from '@reduxjs/toolkit';
const IncomeData = createSlice({
  name: 'IncomeData',
  initialState: [],
  reducers: {
    addIncome: (state, action) => {
      const newIncome = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        flag: action.payload.flag,
      };
      state.push(newIncome);
    },
  },
});

export const {addIncome} = IncomeData.actions;
export default IncomeData.reducer;
