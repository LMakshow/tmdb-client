import { createSlice } from '@reduxjs/toolkit';

export const paginatorSlice = createSlice({
  name: 'paginator',
  initialState: {
    pageCount: 1,
    currentPage: 0,
    itemsPerPage: 20,
  },
  reducers: {
    changePageCount: (state, action) => (state.pageCount = action.payload),
    changeCurrentPage: (state, action) => (state.currentPage = action.payload),
    changeItemsPerPage: (state, action) => {
      state.currentPage = Math.floor(state.currentPage * (state.itemsPerPage / action.payload));
      state.itemsPerPage = action.payload;
    },
  },
});

export const { changePageCount, changeCurrentPage, changeItemsPerPage } = paginatorSlice.actions;

export default paginatorSlice.reducer;
