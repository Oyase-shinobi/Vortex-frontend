import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface UserStateType {
  balance: BigInt;
}

const userSliceDefaultState: UserStateType = {
  balance: BigInt(0),
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userSliceDefaultState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
      return;
    },
    resetBalance: (state) => {
      state.balance = BigInt(0);
      return;
    },
  },
});

export const { setBalance, resetBalance } = userSlice.actions;

export default combineReducers({
  user: userSlice.reducer,
});
