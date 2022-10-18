import { configureStore } from '@reduxjs/toolkit';
import paginatorReducer from './paginatorSlice';
import searchReducer from './searchSlice';
import moviesReducer from './moviesSlice';
// import movieReqReducer from 'movieReqSlice';

export const store = configureStore({
  reducer: {
    paginator: paginatorReducer,
    search: searchReducer,
    movies: moviesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
