import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import ModalNumber from './ModalNumber';
import PlanData from './PlanData';
import IncomeOutcome from './IncomeOutcome';
import Year from './Year';
import TabState from './TabState';
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    planData: PlanData,
    IncomeOutcome: IncomeOutcome,
    modalNumber: ModalNumber,
    year: Year,
    tabState: TabState,
  },
});
//Update state depend on action in UI
