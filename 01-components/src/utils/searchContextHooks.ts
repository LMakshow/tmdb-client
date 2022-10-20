import { useEffect, useReducer, useState } from 'react';
import { getErrorMessage, moviesPopularUrl, searchMoviesUrl } from './fetchUtils';
import { PageActionKind, pageReducer } from './pageReducer';
import { searchReducer } from './searchReducer';
import { MovieData, MovieResponse } from './TMDBinterfaces';

const initialPageState = { count: 1, current: 0, items: 20 };
const initialSearchState = {
  query: localStorage.getItem('searchQuery') || '',
  model: 'movie',
  adult: 'no-adult',
  year: 'any-year',
};

const pageRequest = (pageCurrent: number, pageItems: number) => {
  if (pageItems === 10) return Math.floor(pageCurrent / 2) + 1;
  if (pageItems === 40) return pageCurrent * 2 + 1;
  return pageCurrent + 1;
};

export const useFetchRequest = () => {
  const [loading, setLoading] = useState(false);
  const [movieListError, setMovieListError] = useState<boolean | string>(false);
  const [renderData, setRenderData] = useState([] as MovieData[]);

  const [searchState, searchDispatch] = useReducer(searchReducer, initialSearchState);
  const [pageState, pageDispatch] = useReducer(pageReducer, initialPageState);

  const searchFetchRequest = async (query: string) => {
    try {
      setLoading(true);
      setMovieListError(false);
      const page = pageRequest(pageState.current, pageState.items);
      const response = await fetch(
        query
          ? searchMoviesUrl(query, page, searchState.model, searchState.adult, searchState.year)
          : moviesPopularUrl(page, searchState.model, searchState.adult, searchState.year)
      );
      if (!response.ok) throw Error('Error fetching the search movies data');
      const json = (await response.json()) as MovieResponse;
      const movies = json.results;
      if (pageState.items === 20) {
        pageDispatch({
          type: PageActionKind.PAGE_COUNT,
          payload: json.total_pages > 100 ? 100 : json.total_pages,
        });
        setRenderData(movies);
      }
      if (pageState.items === 10) {
        pageDispatch({
          type: PageActionKind.PAGE_COUNT,
          payload: json.total_pages > 100 ? 200 : json.total_pages * 2,
        });
        pageState.current % 2
          ? setRenderData(movies.slice(10))
          : setRenderData(movies.slice(0, 10));
      }
      if (pageState.items === 40) {
        pageDispatch({
          type: PageActionKind.PAGE_COUNT,
          payload: json.total_pages > 100 ? 50 : Math.floor(json.total_pages / 2),
        });
        const response = await fetch(
          query
            ? searchMoviesUrl(
                query,
                page + 1,
                searchState.model,
                searchState.adult,
                searchState.year
              )
            : moviesPopularUrl(page + 1, searchState.model, searchState.adult, searchState.year)
        );
        const additionalMovies = (await response.json()).results;
        setRenderData([...movies, ...additionalMovies]);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(getErrorMessage(err));
      setMovieListError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (renderData.length === 0) searchFetchRequest(searchState.query);
    // Need to fetch data only once after load if currently no data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    searchFetchRequest,
    loading,
    renderData,
    movieListError,
    searchState,
    searchDispatch,
    pageState,
    pageDispatch,
  };
};
