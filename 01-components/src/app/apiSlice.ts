import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApiQuery, MovieDetails, MovieResponse } from 'utils/TMDBinterfaces';

const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = 'bd15370077551ed52137260fd06032e7';

const pageRequest = (currentPage: number, itemsPerPage: number) => {
  if (itemsPerPage === 10) return Math.floor(currentPage / 2) + 1;
  if (itemsPerPage === 40) return currentPage * 2 + 1;
  return currentPage + 1;
};

const createMoviesUrl = ({
  query = '',
  currentPage = 0,
  itemsPerPage = 20,
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
  const page = pageRequest(currentPage, itemsPerPage);

  if (query)
    return `/search/${model}?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=${searchAdult}${yearQuery()}`;

  return `/discover/${model}?api_key=${API_KEY}&page=${page}&include_adult=${searchAdult}${yearQuery()}`;
};

const createDetailsUrl = ({ id, model = 'movie' }: { id: number; model?: string }) => {
  return `/${model}/${id}?api_key=${API_KEY}&append_to_response=videos`;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieResponse, MovieApiQuery>({
      query: createMoviesUrl,
    }),
    getDetails: builder.query<MovieDetails, { id: number; model?: string }>({
      query: createDetailsUrl,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMoviesQuery, useGetDetailsQuery } = apiSlice;
