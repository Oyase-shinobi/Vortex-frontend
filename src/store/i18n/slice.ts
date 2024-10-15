import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import en from '../../../public/i18n/en.json';

export type i18nType = typeof en;

export interface LanguageStateType {
  i18nName: string;
  i18nObject: i18nType;
}

export const languageObject: Map<string, i18nType> = new Map([[en.name, en]]);

const i18nSliceDefaultState: LanguageStateType = {
  i18nName: en.name,
  i18nObject: en,
};

const i18nSlice = createSlice({
  name: 'i18nSlice',
  initialState: i18nSliceDefaultState,
  reducers: {
    switchLanguage: (state, action) => {
      const selectedLanguage = action.payload as string;
      state.i18nName = selectedLanguage;
      state.i18nObject = languageObject.get(selectedLanguage) as i18nType;
      return;
    },
  },
});

export const { switchLanguage } = i18nSlice.actions;

export default combineReducers({
  i18n: i18nSlice.reducer,
});
