import {createSlice} from '@reduxjs/toolkit';
<<<<<<< HEAD
import {SliderComponent} from 'react-native';
import firebase from '@react-native-firebase/firestore';
const PlanData = createSlice({
  name: 'PlanData',
  initialState: [],
  reducers: {
    addPlan: (state, action) => {
      const newPlan = {
        key: action.payload.key,
        dateStart: action.payload.dateStart,
        dateFinish: action.payload.dateFinish,
        budget: action.payload.budget,
        currentuse: action.payload.currentuse,
        percentage_of_use: action.payload.percentage_of_use,
        isExceed: action.payload.isExceed,
      };
      state.push(newPlan);
    },
    updateDataPlan: state => {
      state.map(item => {
        const newPlan = {
          key: item.key,
          dateStart: item.dateStart,
          dateFinish: item.dateFinish,
          budget: item.budget,
          currentuse: item.currentuse,
          percentage_of_use: item.percentage_of_use,
          isExceed: item.isExceed,
        };
        firebase
          .firestore()
          .collection('Accounts')
          .doc(firebase.auth().currentUser.uid)
          .collection('PlanData')
          .doc(item.key)
          .set(newPlan);
        firebase
          .firestore()
          .collection('Accounts')
          .doc(firebase.auth().currentUser.uid)
          .set({data: true}, {merge: true});
      });
    },
    IncreaseCurrentUse: (state, action) => {
      state[action.payload.index].currentuse += action.payload.value;
      state[action.payload.index].percentage_of_use =
        (state[action.payload.index].currentuse /
          state[action.payload.index].budget) *
        100;
      if (state[action.payload.index].percentage_of_use >= 100) {
        state[action.payload.index].isExceed = true;
        state[action.payload.index].percentage_of_use = 100;
      } else {
        state[action.payload.index].isExceed = false;
      }
    },

    removePlan: (state, action) => {
      state.splice(action.payload, 1);
    },

    updatePlan: (state, action) => {
      state[action.payload.index] = {
        dateStart: action.payload.dateStart,
        dateFinish: action.payload.dateFinish,
        budget: action.payload.budget,
        currentuse: action.payload.currentuse,
        percentage_of_use: action.payload.percentage_of_use,
        isExceed: action.payload.isExceed,
      };
    },
  },
});

export const {addPlan, IncreaseCurrentUse, removePlan, updatePlan} =
  PlanData.actions;
export default PlanData.reducer;
=======
import { SliderComponent } from 'react-native';
const PlanData = createSlice ({
    name: 'PlanData',
    initialState:[],
    reducers: {
        addPlan: (state, action) =>{
            const newPlan = {
                key:action.payload.key,
                dateStart: action.payload.dateStart,
                dateFinish: action.payload.dateFinish,
                budget: action.payload.budget,
                currentuse: action.payload.currentuse,
                percentage_of_use: action.payload.percentage_of_use,
                isExceed: action.payload.isExceed,
            };
            state.push(newPlan);
        },
        IncreaseCurrentUse:(state, action)=>{
            state[action.payload.index].currentuse += action.payload.value;
            state[action.payload.index].percentage_of_use = ( state[action.payload.index].currentuse / state[action.payload.index].budget ) *100;
            if(state[action.payload.index].percentage_of_use >= 100)
            {
                state[action.payload.index].isExceed = true;
                state[action.payload.index].percentage_of_use = 100;
            } 
            else 
            {
                state[action.payload.index].isExceed = false;
            }
        },
        
        removePlan: (state, action)=>{
            state.splice(action.payload,1);
        },

        updatePlan: (state, action) =>{
            state[action.payload.index] = {
                dateStart: action.payload.dateStart,
                dateFinish: action.payload.dateFinish,
                budget: action.payload.budget,
                currentuse: action.payload.currentuse,
                percentage_of_use: action.payload.percentage_of_use,
                isExceed: action.payload.isExceed,
            };
        },

    },
});

export const { addPlan,IncreaseCurrentUse,removePlan, updatePlan } = PlanData.actions;
export default PlanData.reducer;
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
