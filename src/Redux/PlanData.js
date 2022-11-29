import {createSlice} from '@reduxjs/toolkit';
const PlanData = createSlice ({
    name: 'PlanData',
    initialState:[],
    reducers: {
        addPlan: (state, action) =>{
            const newPlan = {
                dateStart: action.payload.dateStart,
                dateFinish: action.payload.dateFinish,
                budget: action.payload.budget,
                currentuse: action.payload.currentuse,
            };
            state.push(newPlan);
        },

    },
});

export const {addPlan} = PlanData.actions;
export default PlanData.reducer;