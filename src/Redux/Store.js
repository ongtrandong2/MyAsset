import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import ModalNumber from './ModalNumber';

import PlanData from './PlanData';
import IncomeOutcome from './IncomeOutcome';
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    planData: PlanData,
    IncomeOutcome: IncomeOutcome,
    modalNumber: ModalNumber,
  },
});
