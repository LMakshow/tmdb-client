import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Genres, MovieDetails, Videos } from 'utils/TMDBinterfaces';

const genresCards = (genres: Genres[]) => {
  if (!genres) return null;
  const cards = genres.map((item) => (
    <div key={item.id} className="movie-card__genre">
      {item.name}
    </div>
  ));
  return cards;
};

const videosCards = (videos: Videos) => {
  if (!videos.results) return null;
  let cards = videos.results.map((item) => (
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

export default function MovieDetailed() {
  const navigate = useNavigate();
  const details = useLoaderData() as MovieDetails;

  if (!details)
    return (
      <div className="about-page text-big">
        No details about the selected movie. Returning you back in a moment...
      </div>
    );

  return (
    <div
      className="modal-card"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)), 
            url("https://image.tmdb.org/t/p/w1280${details.backdrop_path}") center/cover`,
      }}
    >
      <div
        className="modal-card__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        &lt; Back
      </div>
      <img
        className="modal-card__poster"
        src={
          details.poster_path === null
            ? `${process.env.PUBLIC_URL}/cameras/no-image.jpg`
            : `https://image.tmdb.org/t/p/w500${details.poster_path}`
        }
      />
      <div className="modal-card__text">
        <h3 className="modal-card__movie-name">{details.title || details.name}</h3>
        <div className="modal-card__movie-tagline">{details.tagline}</div>
        <div className="modal-card__movie-overview">{details.overview}</div>
        <div className="movie-card__ratings">
          <div className="movie-card__block">
            <span className="text-aux">🠕</span>
            <p className="movie-card__popularity text-big">
              {Math.round(details.popularity as number)}
            </p>
            <span className="text-aux">Popularity</span>
          </div>
          <div className="movie-card__block">
            <h3 className="movie-card__votes text-big">{details.vote_count}</h3>
            <span className="text-aux">votes</span>
          </div>
          <div className="movie-card__block">
            <span className="text-aux color-accent">❤</span>
            <p className="text-big">{details.vote_average}</p>
          </div>
        </div>
        <div className="movie-card__block">
          <span className="text-med">Release date:</span>
          <span className="text-big">{details.release_date || details.first_air_date}</span>
        </div>
        <div className="movie-card__block">
          <span className="text-med">Genres:</span>
          {genresCards(details.genres)}
        </div>
        <p className="text-med">Watch Videos:</p>
        <div className="movie-card__block scroll-y">{videosCards(details.videos)}</div>
      </div>
    </div>
  );
}
