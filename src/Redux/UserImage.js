import { createSlice } from "@reduxjs/toolkit";
const UserImage = createSlice({
    name:'UserImage',
    initialState: {value: 'https://img.icons8.com/cotton/100/null/gender-neutral-user--v2.png'},
    reducers:{
        setUserImage: (state,action) =>{
            state.value = action.payload;
        }
    }
})
export const {setUserImage} = UserImage.actions;
export default UserImage.reducer;