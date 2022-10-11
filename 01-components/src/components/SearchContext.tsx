import React, { useEffect, useState, useReducer } from 'react';
import { getErrorMessage, moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';
import { PageAction, PageActionKind, pageReducer, PageState } from 'utils/pageReducer';
import { SearchActionKind, searchReducer, SearchState } from 'utils/searchReducer';
import { MovieData, MovieResponse } from 'utils/TMDBinterfaces';

interface SearchContextType {
  renderData: MovieData[];
  setRenderData: React.Dispatch<React.SetStateAction<MovieData[]>>;
  searchFetchRequest: (query: string) => Promise<void>;
  loading: boolean;
  searchQueryChange: (query: string) => void;
  movieListError: boolean | string;
  changeSearchModel: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSearchAdult: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeSearchYear: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchState: SearchState;
  pageState: PageState;
  pageDispatch: React.Dispatch<PageAction>;
}

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

export const SearchResContext = React.createContext<SearchContextType>(null);

export const SearchResProvider = ({ children }: { children: React.ReactNode }) => {
  const [renderData, setRenderData] = useState([] as MovieData[]);
  const [loading, setLoading] = useState(false);
  const [movieListError, setMovieListError] = useState<boolean | string>(false);

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

  const searchQueryChange = (query: string) => {
    searchDispatch({
      type: SearchActionKind.SET_QUERY,
      payload: query,
    });
  };

  const changeSearchModel = (e: React.ChangeEvent<HTMLSelectElement>) =>
    searchDispatch({
      type: SearchActionKind.SET_MODEL,
      payload: e.target.value,
    });
  const changeSearchAdult = (e: React.ChangeEvent<HTMLSelectElement>) =>
    searchDispatch({
      type: SearchActionKind.SET_ADULT,
      payload: e.target.value,
    });
  const changeSearchYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    searchDispatch({
      type: SearchActionKind.SET_YEAR,
      payload: e.target.value,
    });

  useEffect(() => {
    if (renderData.length === 0) searchFetchRequest(searchState.query);
    // Need to fetch data only once after load if currently no data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pageDispatch({
      type: PageActionKind.PAGE_CURRENT,
      payload: 0,
    });
    searchFetchRequest(searchState.query);
    // Reset to the 1 page and fetch the new data after one of select boxes changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState.model, searchState.adult, searchState.year]);

  useEffect(() => {
    searchFetchRequest(searchState.query);
    window.scrollTo(0, 160);
    // Fetch the new data after changing page or items per page and scroll to the top
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.current, pageState.items]);

  const value = {
    renderData,
    setRenderData,
    loading,
    movieListError,
    searchState,
    searchDispatch,
    searchFetchRequest,
    searchQueryChange,
    changeSearchModel,
    changeSearchAdult,
    changeSearchYear,
    pageState,
    pageDispatch,
  };

  return <SearchResContext.Provider value={value}>{children}</SearchResContext.Provider>;
};
