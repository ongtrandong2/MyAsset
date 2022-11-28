import {createSlice} from '@reduxjs/toolkit';
const OutcomeData = createSlice({
  name: 'OutcomeData',
  initialState: [],
  reducers: {
    addOutcome: (state, action) => {
      const newOutcome = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        flag: action.payload.flag,
      };
      state.push(newOutcome);
    },
  },
});

export const {addOutcome} = OutcomeData.actions;
export default OutcomeData.reducer;
