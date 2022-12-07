import { createSlice } from '@reduxjs/toolkit';
const ModalNumber = createSlice ({
    name:'ModalNumber',
    initialState: { IsShowModal: false, IsShowTab: false },
    // IsShowTab: false : Sinh Hoat  ( DailyCost )
    // IsShowTab: true : Tai San ( PropertyCost )
    reducers:{
        ShowModal:(state,action) =>{
            state.IsShowModal = action.payload;
        },
        ShowTab:(state,action)=>{
            state.IsShowTab = action.payload;
        },
    }
})

export const { ShowModal, ShowTab } = ModalNumber.actions;
export default ModalNumber.reducer;