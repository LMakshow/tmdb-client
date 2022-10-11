import React, { useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData } from 'utils/TMDBinterfaces';
import { NetworkError, Preloader } from './Network';
import { SearchResContext } from './SearchContext';
import { PageActionKind } from 'utils/pageReducer';

export default function Main() {
  const {
    renderData,
    searchFetchRequest,
    loading,
    movieListError,
    searchState,
    searchQueryChange,
    pageState,
    pageDispatch,
  } = useContext(SearchResContext);

  const searchSubmit = () => {
    pageDispatch({
      type: PageActionKind.PAGE_CURRENT,
      payload: 0,
    });
    searchFetchRequest(searchState.query);
  };

  useEffect(() => {
    const componentSaveStorage = () => {
      localStorage.setItem('searchQuery', searchState.query);
    };

    window.addEventListener('beforeunload', componentSaveStorage);
    return function cleanup() {
      componentSaveStorage();
      window.removeEventListener('beforeunload', componentSaveStorage);
    };
  }, [searchState.query]);

  const handlePageClick = (e: { selected: number }) =>
    pageDispatch({
      type: PageActionKind.PAGE_CURRENT,
      payload: e.selected,
    });

  const changePageItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    pageDispatch({
      type: PageActionKind.PAGE_ITEMS,
      payload: Number(e.target.value),
    });
  };

  const generateCards = (data: MovieData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      cards.push(<MovieCard key={item.id} {...item} />);
    });
    return cards;
  };

  const cards = generateCards(renderData);
  return (
    <div>
      <Heading text="Browse the most popular movies daily or search for any movies from TMDB" />
      <Search
        onQueryChange={searchQueryChange}
        onSearchSubmit={searchSubmit}
        searchQuery={searchState.query}
      />
      <div className="movie-page">
        {loading && <Preloader />}
        {movieListError && <NetworkError message={movieListError as string} />}
        {!loading && !movieListError && cards.length === 0 ? (
          <div className="about-page text-big">No matches with the search query.</div>
        ) : (
          cards
        )}
        {cards.length > 0 && (
          <div className="pagination-container">
            <select className="select-field" value={pageState.items} onChange={changePageItems}>
              <option value="10">Page Items: 10</option>
              <option value="20">Page Items: 20</option>
              <option value="40">Page Items: 40</option>
            </select>
            <ReactPaginate
              pageCount={pageState.count}
              forcePage={pageState.current}
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
