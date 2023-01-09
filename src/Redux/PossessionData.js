import {createSlice} from '@reduxjs/toolkit';
import firebase from '@react-native-firebase/firestore';
const PossessionData = createSlice({
  name: 'PossessionData',
  initialState: [],
  reducers: {
    addPossession: (state, action) => {
      const newPossession = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        note: action.payload.note,
        showNote: false,
      };
      state.push(newPossession);
    },
    removePossession: (state, action) => {
      state.splice(action.payload, 1);
    },
    setShowNote:(state,action)=>{
      state[action.payload].showNote = !state[action.payload].showNote;
    },
    
  },
});

export const { addPossession, removePossession,setShowNote } = PossessionData.actions;
export default PossessionData.reducer;
