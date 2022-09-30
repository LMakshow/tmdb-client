import React from 'react';
import { MovieData } from 'utils/TMDBinterfaces';

export default class MovieCard extends React.Component<MovieData, { cart: boolean }> {
  constructor(props: MovieData) {
    super(props);
    this.state = { cart: false };
  }

  render() {
    return (
      <div className="shop-card-template">
        <div className="shop-card movie__card">
          <img
            className="movie-card__image"
            src={
              this.props.poster_path === null
                ? `${process.env.PUBLIC_URL}/cameras/no-image.jpg`
                : `https://image.tmdb.org/t/p/w500${this.props.poster_path}`
            }
            alt="Photo"
          />
          <h2 className="movie-card__name">{this.props.title}</h2>

          <div className="shop-card__price-mpix">
            <div className="shop-card__block">
              <h3 className="shop-card__price text-big">{this.props.vote_count}</h3>
              <span className="text-aux">votes</span>
            </div>
            <div className="shop-card__block">
              <span className="text-aux">❤</span>
              <p className="shop-card__mpix text-big">{this.props.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
