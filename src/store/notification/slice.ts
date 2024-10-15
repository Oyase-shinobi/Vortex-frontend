import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface NotificationStateType {
  message: string;
  isShow: boolean;
}

const notificationSliceDefaultState: NotificationStateType = {
  message: '',
  isShow: false,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: notificationSliceDefaultState,
  reducers: {
    openNotification: (state, action) => {
      state.message = action.payload;
      state.isShow = true;
      return;
    },
    closeNotification: (state) => {
      state.message = '';
      state.isShow = false;
      return;
    },
  },
});

export const { openNotification, closeNotification } =
  notificationSlice.actions;

export default combineReducers({
  notification: notificationSlice.reducer,
});
