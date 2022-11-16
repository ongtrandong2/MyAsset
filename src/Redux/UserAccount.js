import {createSlice} from '@reduxjs/toolkit';
const UserAccount = createSlice({
  name: 'UserAccount',
  initialState: {value:false},
  reducers:{
    CheckAccount: (state, action) => {
      if (action.payload.name === 'Tien' && action.payload.password === '1234') {
        state.value = true;
      }
    },
  },
});

export const { CheckAccount } = UserAccount.actions;
export default UserAccount.reducer; 