import React, { useContext, useEffect, useState } from 'react';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData, MovieDetails } from 'utils/TMDBinterfaces';
import {
  getErrorMessage,
  movieDetailsUrl,
  moviesPopularUrl,
  searchMoviesUrl,
} from 'utils/fetchUtils';
import ModalCard from './ModalCard';
import { NetworkError, Preloader } from './Network';
import { UserContext } from './UserContext';
import { SearchResContext } from './SearchContext';

export default function Main() {
  const { renderData, setRenderData } = useContext(SearchResContext);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [dataOnClick, setDataOnClick] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieListError, setMovieListError] = useState<boolean | string>(false);
  const [modalCardError, setModalCardError] = useState<boolean | string>(false);

  const searchFetchRequest = async (query: string) => {
    try {
      setLoading(true);
      setMovieListError(false);
      if (query) {
        const response = await fetch(searchMoviesUrl(query));
        if (!response.ok) throw Error('Error fetching the search movies data');
        const movies = (await response.json()).results;
        setRenderData(movies);
      }
      if (!query) {
        const response = await fetch(moviesPopularUrl());
        if (!response.ok) throw Error('Error fetching the popular movies data');
        const movies = (await response.json()).results;
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

  const handleCardClick = async (id: number) => {
    try {
      if (id) {
        setDataOnClick(null);
        setModalCardError(false);
        toggleModal();
        const response = await fetch(movieDetailsUrl(id));
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

  const searchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const searchSubmit = () => searchFetchRequest(searchQuery);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (renderData.length === 0) searchFetchRequest(searchQuery);
    // Need to update only once after load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {!loading && !movieListError && cards.length === 0
          ? 'No matches with the search query.'
          : cards}
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
