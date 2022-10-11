import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData, MovieDetails } from 'utils/TMDBinterfaces';
import { getErrorMessage, movieDetailsUrl } from 'utils/fetchUtils';
import ModalCard from './ModalCard';
import { NetworkError, Preloader } from './Network';
import { SearchResContext } from './SearchContext';

export default function Main() {
  const {
    renderData,
    searchFetchRequest,
    searchModel,
    loading,
    movieListError,
    searchQuery,
    searchQueryChange,
    pageCount,
    pageCurrent,
    setPageCurrent,
  } = useContext(SearchResContext);
  const [dataOnClick, setDataOnClick] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCardError, setModalCardError] = useState<boolean | string>(false);

  const handleCardClick = async (id: number) => {
    try {
      if (id) {
        setDataOnClick(null);
        setModalCardError(false);
        toggleModal();
        const response = await fetch(movieDetailsUrl(id, searchModel));
        if (!response.ok) throw Error('Error fetching the movie details data');
        const details = await response.json();
        setDataOnClick(details);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(getErrorMessage(message));
      setModalCardError(message);
    }
  };

  const searchSubmit = () => {
    setPageCurrent(0);
    searchFetchRequest(searchQuery);
  };

  const toggleModal = () => setShowModal(!showModal);

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

  const handlePageClick = (event: { selected: number }) => {
    setPageCurrent(event.selected);
  };

  const generateCards = (data: MovieData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      cards.push(<MovieCard key={item.id} onClick={handleCardClick} {...item} />);
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
        {!loading && !movieListError && cards.length > 0 && (
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
        )}
      </div>
      <ModalCard
        error={modalCardError}
        data={dataOnClick}
        show={showModal}
        toggleModal={toggleModal}
      />
    </div>
  );
}
