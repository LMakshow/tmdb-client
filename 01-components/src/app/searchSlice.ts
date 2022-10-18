import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: localStorage.getItem('searchQuery') || '',
    model: 'movie',
    adult: 'no-adult',
    year: 'any-year',
  },
  reducers: {
    changeSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    changeSearchModel: (state, action) => {
      state.model = action.payload;
    },
    changeSearchAdult: (state, action) => {
      state.adult = action.payload;
    },
    changeSearchYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { changeSearchQuery, changeSearchModel, changeSearchAdult, changeSearchYear } =
  searchSlice.actions;

export default searchSlice.reducer;
