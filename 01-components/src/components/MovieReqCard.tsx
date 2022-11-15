import React from 'react';
import { MovieReqData } from 'utils/TMDBinterfaces';

const genresCards = (genres: { [key: string]: boolean }) => {
  if (!genres) return null;
  const keys = Object.keys(genres);
  const genresArray = keys.filter((key) => genres[key]);
  const cards = genresArray.map((key, index) => (
    <div key={index} className="movie-card__genre">
      {key}
    </div>
  ));
  if (cards.length === 0) return null;
  return (
    <div className="movie-card__block">
      <span className="text-med">Genres:</span>
      {cards}
    </div>
  );
};

export default function RequestCard(props: MovieReqData) {
  const generateSrc = (files: FileList) => {
    if (files.length) {
      const file = files[0];
      const src = window.URL.createObjectURL(file);
      return src;
    }
    const img = 'no-image';
    return `${process.env.PUBLIC_URL}/cameras/${img}.jpg`;
  };

  return (
    <div className="movie-card-template">
      <div className="shop-card movie-card">
        <div className="movie-card__image-container">
          <img className="movie-card__image" src={generateSrc(props.files)} alt="Photo" />
        </div>
        <h2 className="movie-card__name">{props.title}</h2>
        {props.description ? (
          <div className="modal-card__movie-overview">{props.description}</div>
        ) : null}
        {props.date ? (
          <div className="movie-card__block">
            <span className="text-med">Release date:</span>
            <span className="text-big">{props.date}</span>
          </div>
        ) : null}
        {genresCards(props.genres)}
        <div className="movie-card__ratings">
          <div className="movie-card__block">
            <span className="text-aux">Status:</span>
            <h3 className="movie-card__votes">{props.type}</h3>
          </div>
          <div className="movie-card__block">
            <span className="text-aux color-accent">❤</span>
            <p className="text-big">{props.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
