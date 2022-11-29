import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import IncomeData from './IncomeData';
import OutcomeData from './OutcomeData';
import PlanData from './PlanData';
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    incomeData: IncomeData,
    outcomeData: OutcomeData,
    planData: PlanData,
  },
});
