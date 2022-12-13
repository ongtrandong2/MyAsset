<<<<<<< HEAD
import {createSlice} from '@reduxjs/toolkit';
const Year = createSlice({
  name: 'Year',
  initialState: [],
  reducers: {
    UpdateYear: (state, action) => {
      state.push(action.payload);
      // newYear =({
      //     year: action.payload.year,
      // })
      // state.push(newYear);
    },
  },
});

export const {UpdateYear} = Year.actions;
export default Year.reducer;
=======
import { createSlice } from "@reduxjs/toolkit";
const Year = createSlice ({
    name: "Year",
    initialState: [],
    reducers:{
        UpdateYear: (state, action) =>{
            state.push(action.payload);
            // newYear =({
            //     year: action.payload.year,
            // })
            // state.push(newYear);
        }
    }
})

export const { UpdateYear } = Year.actions;
export default Year.reducer;  
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
