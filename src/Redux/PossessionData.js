import {createSlice} from '@reduxjs/toolkit';
const PossessionData = createSlice({
    name:'PossessionData',
    initialState:[],
    reducers:{
        addPossession:(state,action) =>{
            const newPossession = {
                key: action.payload.index,
                name: action.payload.name,
                value: action.payload.value,
                
            }
            state.push(newPossession)
        }
    }
})

export const {addPossession} = PossessionData.actions;
export default PossessionData.reducer;