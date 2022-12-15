import {createSlice} from '@reduxjs/toolkit';
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
  },
});

export const { addPossession, removePossession } = PossessionData.actions;
export default PossessionData.reducer;
