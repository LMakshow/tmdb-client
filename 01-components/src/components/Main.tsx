import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData } from 'utils/TMDBinterfaces';
import { NetworkError, Preloader } from './Network';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeCurrentPage, changeItemsPerPage } from 'app/paginatorSlice';
import { changeSearchQuery } from 'app/searchSlice';
import { fetchMovies } from 'app/moviesSlice';

export default function Main() {
  const pageCount = useAppSelector((state) => state.paginator.pageCount);
  const currentPage = useAppSelector((state) => state.paginator.currentPage);
  const itemsPerPage = useAppSelector((state) => state.paginator.itemsPerPage);
  const movies = useAppSelector((state) => state.movies.movies);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);
  const query = useAppSelector((state) => state.search.query);
  const dispatch = useAppDispatch();

  const searchSubmit = () => {
    dispatch(changeCurrentPage(0));
    dispatch(fetchMovies(query));
  };

  const searchQueryChange = (query: string) => dispatch(changeSearchQuery(query));

  useEffect(() => {
    if (movies.length === 0) dispatch(fetchMovies(query));
    // Need to fetch data only once after load if currently no data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchMovies(query));
    window.scrollTo(0, 160);
    // Fetch the new data after changing page or items per page and scroll to the top
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage]);

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

  const handlePageClick = (e: { selected: number }) => dispatch(changeCurrentPage(e.selected));

  const changePageItems = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeItemsPerPage(Number(e.target.value)));

  const generateCards = (data: MovieData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      cards.push(<MovieCard key={item.id} {...item} />);
    });
    return cards;
  };

  const cards = generateCards(movies);
  return (
    <div>
      <Heading text="Browse the most popular movies daily or search for any movies from TMDB" />
      <Search onQueryChange={searchQueryChange} onSearchSubmit={searchSubmit} searchQuery={query} />
      <div className="movie-page">
        {status === 'loading' && <Preloader />}
        {error && <NetworkError message={error as string} />}
        {status === 'idle' && !error && cards.length === 0 ? (
          <div className="about-page text-big">No matches with the search query.</div>
        ) : (
          cards
        )}
        {cards.length > 0 && (
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
