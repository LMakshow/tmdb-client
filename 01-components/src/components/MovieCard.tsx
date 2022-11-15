import { useAppSelector } from 'app/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { MovieData } from 'utils/TMDBinterfaces';

export default function MovieCard(props: MovieData) {
  const model = useAppSelector((state) => state.search.model);
  return (
    <Link to={`/details/${model}/${props.id}`} className="movie-card-template">
      <div className="shop-card movie-card">
        <div className="movie-card__image-container">
          <img
            className="movie-card__image"
            src={
              props.poster_path === null
                ? `${process.env.PUBLIC_URL}/cameras/no-image.jpg`
                : `https://image.tmdb.org/t/p/w500${props.poster_path}`
            }
            alt="Photo"
          />
        </div>
        <h2 className="movie-card__name">{props.title || props.name}</h2>

        <div className="movie-card__ratings">
          <div className="movie-card__block">
            <h3 className="movie-card__votes text-big">{props.vote_count}</h3>
            <span className="text-aux">votes</span>
          </div>
          <div className="movie-card__block">
            <span className="text-aux color-accent">❤</span>
            <p className="text-big">{props.vote_average}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
