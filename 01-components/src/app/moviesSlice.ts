import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';
import { MovieData, MovieResponse } from 'utils/TMDBinterfaces';
import { changePageCount } from './paginatorSlice';
import { RootState } from './store';

const pageRequest = (currentPage: number, itemsPerPage: number) => {
  if (itemsPerPage === 10) return Math.floor(currentPage / 2) + 1;
  if (itemsPerPage === 40) return currentPage * 2 + 1;
  return currentPage + 1;
};

export const fetchMovies = createAsyncThunk<MovieData[], string, { state: RootState }>(
  'movies/fetchData',
  async (query: string, { dispatch, getState }) => {
    const { currentPage, itemsPerPage } = getState().paginator;
    const { model, adult, year } = getState().search;
    const page = pageRequest(currentPage, itemsPerPage);
    const response = await fetch(
      query
        ? searchMoviesUrl(query, page, model, adult, year)
        : moviesPopularUrl(page, model, adult, year)
    );
    if (!response.ok) throw Error('Error fetching the search movies data');
    const json = (await response.json()) as MovieResponse;
    const movies = json.results;
    if (itemsPerPage === 20) {
      dispatch(changePageCount(json.total_pages > 100 ? 100 : json.total_pages));
      return movies;
    }
    if (itemsPerPage === 10) {
      dispatch(changePageCount(json.total_pages > 100 ? 200 : json.total_pages * 2));
      return currentPage % 2 ? movies.slice(10) : movies.slice(0, 10);
    }
    if (itemsPerPage === 40) {
      dispatch(changePageCount(json.total_pages > 100 ? 50 : Math.floor(json.total_pages / 2)));
      const response = await fetch(
        query
          ? searchMoviesUrl(query, page + 1, model, adult, year)
          : moviesPopularUrl(page + 1, model, adult, year)
      );
      const additionalMovies = (await response.json()).results;
      return [...movies, ...additionalMovies];
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [] as MovieData[],
    status: 'idle',
    error: null as boolean | string,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
