import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  menuActiveIndex: 0,
  subMenuActiveIndex: 0
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      const { menuItem, index } = action.payload;
      if(menuItem === 'menu') state.menuActiveIndex = index;
      else state.subMenuActiveIndex = index;
    }
  }
})

export const { setIndex } = sidebarSlice.actions

export default sidebarSlice.reducer