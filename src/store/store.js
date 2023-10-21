import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/slice';
import headerSlice from './header/slice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    header: headerSlice
  }
})
