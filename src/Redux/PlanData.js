import { createSlice } from '@reduxjs/toolkit';
import { SliderComponent } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { Keyboard } from 'react-native';
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
        history: action.payload.history,
        isShowHistory: false,
      };
      state.push(newPlan);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PlanData')
        .doc(newPlan.key)
        .set(newPlan, { merge: true })
        .then(() => {
          Keyboard.dismiss();
        });
      //console.log(state);
    },
    IncreaseCurrentUse: (state, action) => {
      state[action.payload.index].currentuse += action.payload.value;
      state[action.payload.index].percentage_of_use =
        (state[action.payload.index].currentuse /
          state[action.payload.index].budget) *
        100;
      if (state[action.payload.index].percentage_of_use > 100) {
        state[action.payload.index].isExceed = true;
        state[action.payload.index].percentage_of_use = 100;
      } else {
        state[action.payload.index].isExceed = false;
      }
      const key = state[action.payload.index].key;
      const newPlan = {
        currentuse: state[action.payload.index].currentuse,
        percentage_of_use: state[action.payload.index].percentage_of_use,
        isExceed: state[action.payload.index].isExceed,
      };
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PlanData')
        .doc(key)
        .set(newPlan, { merge: true })
        .then(() => {
          Keyboard.dismiss();
        });
      //console.log(state);
    },

    removePlan: (state, action) => {
      const key = state[action.payload].key;
      state.splice(action.payload, 1);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PlanData')
        .doc(key)
        .delete()
        .then(() => {
          //console.log('Xóa thành công');
        })
        .catch(error => {
          //console.log('Xóa thất bại');
        });
    },

    updatePlan: (state, action) => {
      (state[action.payload.index].dateStart = action.payload.dateStart),
        (state[action.payload.index].dateFinish = action.payload.dateFinish),
        (state[action.payload.index].budget = action.payload.budget),
        (state[action.payload.index].currentuse = action.payload.currentuse),
        (state[action.payload.index].percentage_of_use =
          action.payload.percentage_of_use),
        (state[action.payload.index].isExceed = action.payload.isExceed),
        state[action.payload.index].history.push({
          oldBudget: action.payload.oldBudget,
          newBudget: action.payload.budget,
          timechange: action.payload.time_change,
        });

      const newPlan = {
        budget: action.payload.budget,
        history: state[action.payload.index].history,
        currentuse: action.payload.currentuse,
        percentage_of_use: action.payload.percentage_of_use,
        isExceed: action.payload.isExceed,
      };
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PlanData')
        .doc(state[action.payload.index].key)
        .set(newPlan, { merge: true })
        .then(() => {
          Keyboard.dismiss();
        });
    },
    setIsShowHistory: (state, action) => {
      state[action.payload].isShowHistory =
        !state[action.payload].isShowHistory;
    },
    resetPlan: (state, action) => {
      //state.splice(0, state.length);
      //console.log('xoa');
      state = [];
    },
  },
});

export const {
  addPlan,
  IncreaseCurrentUse,
  removePlan,
  updatePlan,
  setIsShowHistory,
  resetPlan,
} = PlanData.actions;
export default PlanData.reducer;
