import { useState } from 'react';
import { getErrorMessage, moviesPopularUrl, searchMoviesUrl } from './fetchUtils';
import { MovieData } from './TMDBinterfaces';

export const useFetchRequest = () => {
  const [loading, setLoading] = useState(false);
  const [movieListError, setMovieListError] = useState<boolean | string>(false);
  const [renderData, setRenderData] = useState([] as MovieData[]);

  const searchFetchRequest = async (query: string) => {
    try {
      setLoading(true);
      setMovieListError(false);
      if (query) {
        const response = await fetch(searchMoviesUrl(query));
        if (!response.ok) throw Error('Error fetching the search movies data');
        const movies = (await response.json()).results;
        setRenderData(movies);
      }
      if (!query) {
        const response = await fetch(moviesPopularUrl());
        if (!response.ok) throw Error('Error fetching the popular movies data');
        const movies = (await response.json()).results;
        setRenderData(movies);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(getErrorMessage(err));
      setMovieListError(message);
    } finally {
      setLoading(false);
    }
  };

  return { searchFetchRequest, loading, renderData, movieListError };
};
