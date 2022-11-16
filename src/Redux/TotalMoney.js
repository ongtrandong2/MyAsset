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

export const {UpdateMoney, IncreaseTotal, DecreaseTotal} = TotalMoney.actions;
export default TotalMoney.reducer;
