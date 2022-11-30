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
});

export const { addData } = IncomeOutcome.actions;
export default IncomeOutcome.reducer;