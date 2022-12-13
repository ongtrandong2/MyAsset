import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import ModalNumber from './ModalNumber';
import PlanData from './PlanData';
import IncomeOutcome from './IncomeOutcome';
import Year from './Year';
<<<<<<< HEAD

=======
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    planData: PlanData,
    IncomeOutcome: IncomeOutcome,
    modalNumber: ModalNumber,
    year: Year,
  },
});
<<<<<<< HEAD
//Update state depend on action in UI
=======
//Update state depend on action in UI 
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
