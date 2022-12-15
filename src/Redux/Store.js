import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import ModalNumber from './ModalNumber';
import PlanData from './PlanData';
import IncomeOutcome from './IncomeOutcome';
import Year from './Year';
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    planData: PlanData,
    IncomeOutcome: IncomeOutcome,
    modalNumber: ModalNumber,
<<<<<<< HEAD
    year: Year,
=======
   year: Year,
>>>>>>> 1d36d94abd1da2cc2370d2c18c1c0d4f724d2115
  },
});
//Update state depend on action in UI 
