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
        },
        removePossession:(state,action) =>{
            if(state.indexOf(action.payload.index)>-1)
            {
                state.slice(action.payload.index,1);
            }
        }
    }
})

export const {addPossession,removePossession} = PossessionData.actions;
export default PossessionData.reducer;