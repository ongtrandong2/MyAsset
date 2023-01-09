import {firebase} from '@react-native-firebase/firestore';
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
                isDifferent: action.payload.isDifferent,
            };
            state.push(newData);
       },
       removeData: (state, action) =>{
            state.splice(action.payload,1);
       },
       changeData: (state, action) =>{
          state[action.payload.index].value = action.payload.value;
       },
    },
    
  },
);

export const { addData, removeData, changeData } = IncomeOutcome.actions;
export default IncomeOutcome.reducer;
