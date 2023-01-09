import {createSlice} from '@reduxjs/toolkit';
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
                history:[],
                isShowHistory: false,

            };
            state.push(newPlan);
        },
        IncreaseCurrentUse:(state, action)=>{
            state[action.payload.index].currentuse += action.payload.value;
            state[action.payload.index].percentage_of_use = ( state[action.payload.index].currentuse / state[action.payload.index].budget ) *100;
            if(state[action.payload.index].percentage_of_use > 100)
            {
                state[action.payload.index].isExceed = true;
                state[action.payload.index].percentage_of_use = 100;
            } 
            else 
            {
                state[action.payload.index].isExceed = false;
            }
            state[action.payload.index].key = action.payload.key;
        },
       
        removePlan: (state, action)=>{
            state.splice(action.payload,1);
        },

        updatePlan: (state, action) =>{
            state[action.payload.index].dateStart = action.payload.dateStart,
            state[action.payload.index].dateFinish = action.payload.dateFinish,
            state[action.payload.index].budget = action.payload.budget,
            state[action.payload.index].currentuse = action.payload.currentuse,
            state[action.payload.index].percentage_of_use = action.payload.percentage_of_use,
            state[action.payload.index].isExceed = action.payload.isExceed,
            state[action.payload.index].history.push({
                oldBudget: action.payload.oldBudget,
                newBudget: action.payload.budget,
                timechange: action.payload.time_change,
            });

        },
        setIsShowHistory: (state,action) =>{
          state[action.payload].isShowHistory = !state[action.payload].isShowHistory;
        }

    },
    
    
  },
);

export const {addPlan, IncreaseCurrentUse,removePlan, updatePlan,setIsShowHistory} = PlanData.actions;
export default PlanData.reducer;
