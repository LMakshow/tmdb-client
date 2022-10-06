import React, { useRef } from 'react';
import { MovieDetails } from 'utils/TMDBinterfaces';
import closeBtn from '../assets/svg/close.svg';
import { NetworkError, Preloader } from './Network';

interface ModalCardProps {
  data: MovieDetails | null;
  show: boolean;
  error: boolean | string;
  toggleModal: () => void;
}

export default function ModalCard(props: ModalCardProps) {
  const modalRef = useRef(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) props.toggleModal();
  };

  const genresCards = () => {
    if (!props.data?.genres) return null;
    const cards = props.data?.genres.map((item) => (
      <div key={item.id} className="movie-card__genre">
        {item.name}
      </div>
    ));
    return cards;
  };

  const videosCards = () => {
    if (!props.data?.videos.results) return null;
    let cards = props.data?.videos.results.map((item) => (
      <a
        key={item.id}
        className="movie-card__genre"
        href={`https://www.youtube.com/watch?v=${item.key}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="color-accent">▶</span>
        <span>{item.name}</span>
        <span className="text-sm">{item.type}</span>
      </a>
    ));
    if (cards.length === 0) cards = [<div key="1">No videos yet. Come back later!</div>];
    return cards;
  };

  const loadingCard = () => {
    return (
      <div className="modal-overlay" ref={modalRef} onClick={handleClickOutside}>
        <Preloader />
      </div>
    );
  };

  const errorCard = (message: string) => {
    return (
      <div className="modal-overlay" ref={modalRef} onClick={handleClickOutside}>
        <NetworkError message={message} />
      </div>
    );
  };

  if (!props.show) return null;
  if (props.error) return errorCard(props.error as string);
  if (!props.data) return loadingCard();
  return (
    <div className="modal-overlay" ref={modalRef} onClick={handleClickOutside}>
      <div
        className="modal-card"
        style={{
          background: `linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)), 
            url("https://image.tmdb.org/t/p/w780${props.data?.backdrop_path}") center/cover`,
        }}
      >
        <div className="modal-card__button" onClick={props.toggleModal}>
          <img src={closeBtn} alt="&times;" />
        </div>
        <img
          className="modal-card__poster"
          src={
            props.data.poster_path === null
              ? `${process.env.PUBLIC_URL}/cameras/no-image.jpg`
              : `https://image.tmdb.org/t/p/w500${props.data.poster_path}`
          }
        />
        <div className="modal-card__text">
          <h3 className="modal-card__movie-name">{props.data?.title}</h3>
          <div className="modal-card__movie-tagline">{props.data?.tagline}</div>
          <div className="modal-card__movie-overview">{props.data?.overview}</div>
          <div className="movie-card__ratings">
            <div className="movie-card__block">
              <span className="text-aux">🠕</span>
              <p className="movie-card__popularity text-big">
                {Math.round(props.data?.popularity as number)}
              </p>
              <span className="text-aux">Popularity</span>
            </div>
            <div className="movie-card__block">
              <h3 className="movie-card__votes text-big">{props.data?.vote_count}</h3>
              <span className="text-aux">votes</span>
            </div>
            <div className="movie-card__block">
              <span className="text-aux color-accent">❤</span>
              <p className="text-big">{props.data?.vote_average}</p>
            </div>
          </div>
          <div className="movie-card__block">
            <span className="text-med">Release date:</span>
            <span className="text-big">{props.data?.release_date}</span>
          </div>
          <div className="movie-card__block">
            <span className="text-med">Genres:</span>
            {genresCards()}
          </div>
          <p className="text-med">Watch Videos:</p>
          <div className="movie-card__block scroll-y">{videosCards()}</div>
        </div>
      </div>
    </div>
  );
}
