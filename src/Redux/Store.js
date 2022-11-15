import {configureStore} from '@reduxjs/toolkit';
import TotalMoney from './TotalMoney';
import PossessionData from './PossessionData';

export default configureStore({
  reducer: {
    totalMoney: TotalMoney,
    possessionData: PossessionData,
    
  },
});
