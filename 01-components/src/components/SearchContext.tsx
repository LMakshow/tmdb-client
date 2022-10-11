import React, { useEffect, useState } from 'react';
import { getErrorMessage, moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';
import { MovieData, MovieResponse } from 'utils/TMDBinterfaces';

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
  pageItems: number;
  setPageItems: React.Dispatch<React.SetStateAction<number>>;
}

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
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchModel, setSearchModel] = useState('movie');
  const [searchAdult, setSearchAdult] = useState('no-adult');
  const [searchYear, setSearchYear] = useState('any-year');
  const [pageCount, setPageCount] = useState(1);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [pageItems, setPageItems] = useState(20);

  const searchFetchRequest = async (query: string) => {
    try {
      setLoading(true);
      setMovieListError(false);
      const page = pageRequest(pageCurrent, pageItems);
      const response = await fetch(
        query
          ? searchMoviesUrl(query, page, searchModel, searchAdult, searchYear)
          : moviesPopularUrl(page, searchModel, searchAdult, searchYear)
      );
      if (!response.ok) throw Error('Error fetching the search movies data');
      const json = (await response.json()) as MovieResponse;
      const movies = json.results;
      if (pageItems === 20) {
        setPageCount(json.total_pages > 100 ? 100 : json.total_pages);
        setRenderData(movies);
      }
      if (pageItems === 10) {
        setPageCount(json.total_pages > 100 ? 200 : json.total_pages * 2);
        pageCurrent % 2 ? setRenderData(movies.slice(10)) : setRenderData(movies.slice(0, 10));
      }
      if (pageItems === 40) {
        setPageCount(json.total_pages > 100 ? 50 : Math.floor(json.total_pages / 2));
        const response = await fetch(
          query
            ? searchMoviesUrl(query, page + 1, searchModel, searchAdult, searchYear)
            : moviesPopularUrl(page + 1, searchModel, searchAdult, searchYear)
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
    setPageCurrent(0);
    searchFetchRequest(searchQuery);
    // Reset to the 1 page and fetch the new data after one of select boxes changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchModel, searchAdult, searchYear]);

  useEffect(() => {
    searchFetchRequest(searchQuery);
    window.scrollTo(0, 160);
    // Fetch the new data after changing page or items per page and scroll to the top
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCurrent, pageItems]);

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
    pageItems,
    setPageItems,
  };

  return <SearchResContext.Provider value={value}>{children}</SearchResContext.Provider>;
};
