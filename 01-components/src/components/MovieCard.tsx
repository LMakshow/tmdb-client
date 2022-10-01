import React from 'react';
import { MovieData } from 'utils/TMDBinterfaces';

interface MovieCardProps extends MovieData {
  onClick: (id: number) => Promise<void>;
}

export default class MovieCard extends React.Component<MovieCardProps, { cart: boolean }> {
  constructor(props: MovieCardProps) {
    super(props);
    this.state = { cart: false };
  }

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <div className="movie-card-template" onClick={this.handleClick}>
        <div className="shop-card movie-card">
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

          <div className="movie-card__ratings">
            <div className="movie-card__block">
              <h3 className="movie-card__votes text-big">{this.props.vote_count}</h3>
              <span className="text-aux">votes</span>
            </div>
            <div className="movie-card__block">
              <span className="text-aux color-accent">❤</span>
              <p className="text-big">{this.props.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
