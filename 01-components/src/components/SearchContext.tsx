import React, { useEffect, useState } from 'react';
import { getErrorMessage, moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';
import { MovieData } from 'utils/TMDBinterfaces';

interface SearchContextType {
  renderData: MovieData[];
  setRenderData: React.Dispatch<React.SetStateAction<MovieData[]>>;
  searchFetchRequest: (query: string) => Promise<void>;
  loading: boolean;
  searchQuery: string;
  searchQueryChange: (query: string) => void;
  movieListError: boolean | string;
  searchModel: string;
  changeSearchModel: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchAdult: string;
  changeSearchAdult: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchYear: string;
  changeSearchYear: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pageCount: number;
  pageCurrent: number;
  setPageCurrent: React.Dispatch<React.SetStateAction<number>>;
}

export const SearchResContext = React.createContext<SearchContextType>(null);

export const SearchResProvider = ({ children }: { children: React.ReactNode }) => {
  const [renderData, setRenderData] = useState([] as MovieData[]);
  const [loading, setLoading] = useState(false);
  const [movieListError, setMovieListError] = useState<boolean | string>(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchModel, setSearchModel] = useState('movie');
  const [searchAdult, setSearchAdult] = useState('no-adult');
  const [searchYear, setSearchYear] = useState('any-year');
  const [pageCount, setPageCount] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageItems, setPageItems] = useState(20);

  const searchFetchRequest = async (query: string) => {
    try {
      setLoading(true);
      setMovieListError(false);
      if (query) {
        const response = await fetch(
          searchMoviesUrl(query, pageCurrent + 1, searchModel, searchAdult, searchYear)
        );
        if (!response.ok) throw Error('Error fetching the search movies data');
        const json = await response.json();
        const movies = json.results;
        setPageCount(json.total_pages);
        setRenderData(movies);
      }
      if (!query) {
        const response = await fetch(
          moviesPopularUrl(pageCurrent + 1, searchModel, searchAdult, searchYear)
        );
        if (!response.ok) throw Error('Error fetching the popular movies data');
        const json = await response.json();
        const movies = json.results;
        setPageCount(json.total_pages);
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

  const searchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const changeSearchModel = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchModel(e.target.value);
  const changeSearchAdult = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchAdult(e.target.value);
  const changeSearchYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchYear(e.target.value);

  useEffect(() => {
    if (renderData.length === 0) searchFetchRequest(searchQuery);
    // Need to fetch data only once after load if currently no data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchFetchRequest(searchQuery);
    // Fetch the new data after one of select boxes changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchModel, searchAdult, searchYear, pageCurrent]);

  const value = {
    renderData,
    setRenderData,
    searchQuery,
    searchQueryChange,
    loading,
    movieListError,
    searchFetchRequest,
    searchModel,
    changeSearchModel,
    searchAdult,
    changeSearchAdult,
    searchYear,
    changeSearchYear,
    pageCount,
    pageCurrent,
    setPageCurrent,
  };

  return <SearchResContext.Provider value={value}>{children}</SearchResContext.Provider>;
};
