import { combineReducers } from '@reduxjs/toolkit';

import coinPriceSlice from './coinPrice/slice';
import gameSlice from './game/slice';
import i18nSlice from './i18n/slice';
import loadingSlice from './loading/slice';
import notificationSlice from './notification/slice';
import userSlice from './user/slice';

const RootReducer = combineReducers({
  coinPriceSlice,
  gameSlice,
  i18nSlice,
  loadingSlice,
  notificationSlice,
  userSlice,
});

export default RootReducer;
