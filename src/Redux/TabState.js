import {createSlice} from '@reduxjs/toolkit';
const TabState = createSlice({
  name: 'TabState',
  initialState: {value: true},
  reducers: {
    setShowBottomTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setShowBottomTab} = TabState.actions;
export default TabState.reducer;
