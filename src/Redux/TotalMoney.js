import {createSlice} from '@reduxjs/toolkit';
const TotalMoney = createSlice({
    name:'TotalMoney',
    initialState:{value:0},
    reducers:{
        UpdateMoney:(state,action) =>{
            state.value = action.payload
        },
        AddInCome:(state,action)=>{
            value: state.value + action.payload
        },
        AddOutCome:(state,action)=>{
            value: state.value - action.payload
        }
        
    }
})

export const {UpdateMoney} = TotalMoney.actions;
export default TotalMoney.reducer;