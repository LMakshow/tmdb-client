import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApiQuery, MovieResponse } from 'utils/TMDBinterfaces';

const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = 'bd15370077551ed52137260fd06032e7';

const createMoviesUrl = ({
  query = '',
  page = 1,
  model = 'movie',
  adult = 'no-adult',
  year = 'any-year',
}) => {
  const searchAdult = adult === 'adult' ? true : false;
  const yearQuery = () => {
    if (year === 'any-year') return '';
    if (model === 'movie') return `&primary_release_year=${year}`;
    if (model === 'tv') return `&first_air_date_year=${year}`;
    return '';
  };
  if (query)
    return `/search/${model}?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=${searchAdult}${yearQuery()}`;

  return `/discover/${model}?api_key=${API_KEY}&page=${page}&include_adult=${searchAdult}${yearQuery()}`;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieResponse, MovieApiQuery>({
      query: createMoviesUrl,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMoviesQuery } = apiSlice;
