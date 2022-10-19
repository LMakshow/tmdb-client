import { configureStore } from '@reduxjs/toolkit';
import paginatorReducer from './paginatorSlice';
import searchReducer from './searchSlice';
import moviesReducer from './moviesSlice';
import requestsReducer from './requestsSlice';

export const store = configureStore({
  reducer: {
    paginator: paginatorReducer,
    search: searchReducer,
    movies: moviesReducer,
    requests: requestsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
