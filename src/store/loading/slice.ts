import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface LoadingStateType {
  isLoading: boolean;
}

const loadingSliceDefaultState: LoadingStateType = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: loadingSliceDefaultState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload as boolean;
      return;
    },
    openLoading: (state) => {
      state.isLoading = true;
      return;
    },
    closeLoading: (state) => {
      state.isLoading = false;
      return;
    },
  },
});

export const { setIsLoading, openLoading, closeLoading } = loadingSlice.actions;

export default combineReducers({
  loading: loadingSlice.reducer,
});
