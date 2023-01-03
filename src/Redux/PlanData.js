import {createSlice} from '@reduxjs/toolkit';
import {SliderComponent} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {Keyboard} from 'react-native';
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
    addPlanFirebase: (state, action) => {
      const newPlan = {
        key: action.payload.key,
        dateStart: action.payload.dateStart,
        dateFinish: action.payload.dateFinish,
        budget: action.payload.budget,
        currentuse: action.payload.currentuse,
        percentage_of_use: action.payload.percentage_of_use,
        isExceed: action.payload.isExceed,
      };
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PlanData')
        .doc(newPlan.key)
        .set(newPlan, {merge: true})
        .then(() => {
          Keyboard.dismiss();
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
        key: state[action.payload.index].key,
        dateStart: action.payload.dateStart,
        dateFinish: action.payload.dateFinish,
        budget: action.payload.budget,
        currentuse: action.payload.currentuse,
        percentage_of_use: action.payload.percentage_of_use,
        isExceed: action.payload.isExceed,
      };
    },
    deletePlan: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

export const {addPlan, IncreaseCurrentUse, removePlan, updatePlan} =
  PlanData.actions;
export default PlanData.reducer;
