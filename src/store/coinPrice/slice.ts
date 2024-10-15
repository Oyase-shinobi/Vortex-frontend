import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface CoinPriceStateType {
  price: number;
}

const coinPriceSliceDefaultState: CoinPriceStateType = {
  price: 0,
};

const coinPriceSlice = createSlice({
  name: 'coinPriceSlice',
  initialState: coinPriceSliceDefaultState,
  reducers: {
    setCoinPrice: (state, action) => {
      state.price = action.payload;
      return;
    },
  },
});

export const { setCoinPrice } = coinPriceSlice.actions;

export default combineReducers({
  coinPrice: coinPriceSlice.reducer,
});
