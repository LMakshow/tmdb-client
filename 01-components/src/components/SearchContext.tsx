import React, { useEffect } from 'react';
import { PageAction, PageActionKind, PageState } from 'utils/pageReducer';
import { SearchActionKind, SearchState } from 'utils/searchReducer';
import { useFetchRequest } from 'utils/searchContextHooks';
import { MovieData } from 'utils/TMDBinterfaces';

interface SearchContextType {
  renderData: MovieData[];
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

export const SearchResContext = React.createContext<SearchContextType>(null);

export const SearchResProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    searchFetchRequest,
    loading,
    renderData,
    movieListError,
    searchState,
    searchDispatch,
    pageState,
    pageDispatch,
  } = useFetchRequest();

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
