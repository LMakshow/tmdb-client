import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { NetworkError, Preloader } from './Network';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeCurrentPage, changeItemsPerPage, changePageCount } from 'app/paginatorSlice';
import { changeSearchQuery } from 'app/searchSlice';
import { useGetMoviesQuery } from 'app/apiSlice';

export default function Main() {
  const pageCount = useAppSelector((state) => state.paginator.pageCount);
  const currentPage = useAppSelector((state) => state.paginator.currentPage);
  const itemsPerPage = useAppSelector((state) => state.paginator.itemsPerPage);
  const query = useAppSelector((state) => state.search.query);
  const model = useAppSelector((state) => state.search.model);
  const adult = useAppSelector((state) => state.search.adult);
  const year = useAppSelector((state) => state.search.year);
  const dispatch = useAppDispatch();

  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesQuery({
    query,
    currentPage,
    itemsPerPage,
    model,
    adult,
    year,
  });

  const { data: extraMovies } = useGetMoviesQuery(
    {
      query,
      currentPage: currentPage + 0.5,
      itemsPerPage,
      model,
      adult,
      year,
    },
    {
      skip: itemsPerPage !== 40,
    }
  );

  const searchSubmit = (query: string) => {
    dispatch(changeCurrentPage(0));
    dispatch(changeSearchQuery(query));
  };

  useEffect(() => {
    const componentSaveStorage = () => {
      localStorage.setItem('searchQuery', query);
    };

    window.addEventListener('beforeunload', componentSaveStorage);
    return function cleanup() {
      componentSaveStorage();
      window.removeEventListener('beforeunload', componentSaveStorage);
    };
  }, [query]);

  useEffect(() => {
    if (movies && itemsPerPage === 20)
      dispatch(changePageCount(movies.total_pages > 100 ? 100 : movies.total_pages));
    if (movies && itemsPerPage === 10)
      dispatch(changePageCount(movies.total_pages > 100 ? 200 : movies.total_pages * 2));
    if (movies && itemsPerPage === 40)
      dispatch(changePageCount(movies.total_pages > 100 ? 50 : Math.floor(movies.total_pages / 2)));
  }, [movies, itemsPerPage, dispatch]);

  const handlePageClick = (e: { selected: number }) => {
    dispatch(changeCurrentPage(e.selected));
    window.scrollTo(0, 160);
  };

  const changePageItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeItemsPerPage(Number(e.target.value)));
    window.scrollTo(0, 160);
  };

  const movieCards = () => {
    if (!isSuccess) return null;
    let moviesShown = movies.results;
    if (itemsPerPage === 10)
      moviesShown = currentPage % 2 ? moviesShown.slice(10) : moviesShown.slice(0, 10);
    if (itemsPerPage === 40) moviesShown = [...movies.results, ...extraMovies.results];
    return moviesShown.map((movie) => <MovieCard key={movie.id} {...movie} />);
  };

  return (
    <div>
      <Heading text="Browse the most popular movies daily or search for any movies from TMDB" />
      <Search onSearchSubmit={searchSubmit} searchQuery={query} />
      <div className="movie-page">
        {isLoading && <Preloader />}
        {isError && <NetworkError message={error.toString()} />}
        {isSuccess && movies.results.length === 0 && (
          <div className="about-page text-big">No matches with the search query.</div>
        )}
        {isSuccess && movies.results.length > 0 && movieCards()}
        {isSuccess && movies.results.length > 0 && (
          <div className="pagination-container">
            <select className="select-field" value={itemsPerPage} onChange={changePageItems}>
              <option value="10">Page Items: 10</option>
              <option value="20">Page Items: 20</option>
              <option value="40">Page Items: 40</option>
            </select>
            <ReactPaginate
              pageCount={pageCount}
              forcePage={currentPage}
              className="pagination"
              previousLabel="< Prev"
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageClassName="pagination__page"
              pageLinkClassName="pagination__link"
              nextLinkClassName="pagination__link"
              previousLinkClassName="pagination__link"
              breakClassName="ellipsis"
            />
          </div>
        )}
      </div>
    </div>
  );
}
