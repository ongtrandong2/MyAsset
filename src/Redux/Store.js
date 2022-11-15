import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';
import UserAccount from './UserAccount';
import IncomeData from './IncomeData';
import OutcomeData from './OutcomeData';
export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    userAccount: UserAccount,
    incomeData: IncomeData,
    outcomeData: OutcomeData,
  },
});
