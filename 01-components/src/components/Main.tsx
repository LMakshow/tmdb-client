import React, { useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData } from 'utils/TMDBinterfaces';
import { NetworkError, Preloader } from './Network';
import { SearchResContext } from './SearchContext';

export default function Main() {
  const {
    renderData,
    searchFetchRequest,
    loading,
    movieListError,
    searchQuery,
    searchQueryChange,
    pageCount,
    pageCurrent,
    setPageCurrent,
    pageItems,
    setPageItems,
  } = useContext(SearchResContext);

  const searchSubmit = () => {
    setPageCurrent(0);
    searchFetchRequest(searchQuery);
  };

  useEffect(() => {
    const componentSaveStorage = () => {
      localStorage.setItem('searchQuery', searchQuery);
    };

    window.addEventListener('beforeunload', componentSaveStorage);
    return function cleanup() {
      componentSaveStorage();
      window.removeEventListener('beforeunload', componentSaveStorage);
    };
  }, [searchQuery]);

  const handlePageClick = (e: { selected: number }) => setPageCurrent(e.selected);

  const changePageItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prevPageItems = pageItems;
    const newPageItems = Number(e.target.value);
    setPageItems(newPageItems);
    setPageCurrent((prevPage) => Math.floor(prevPage * (prevPageItems / newPageItems)));
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
        searchQuery={searchQuery}
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
            <select className="select-field" value={pageItems} onChange={changePageItems}>
              <option value="10">Page Items: 10</option>
              <option value="20">Page Items: 20</option>
              <option value="40">Page Items: 40</option>
            </select>
            <ReactPaginate
              pageCount={pageCount}
              forcePage={pageCurrent}
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
