import React from 'react';
import { MovieDetails } from 'utils/TMDBinterfaces';
import closeBtn from '../assets/svg/close.svg';
import { NetworkError, Preloader } from './Network';

interface ModalCardProps {
  data: MovieDetails | null;
  show: boolean;
  error: boolean | string;
  toggleModal: () => void;
}

export default class ModalCard extends React.Component<ModalCardProps, unknown> {
  modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: ModalCardProps) {
    super(props);
    this.modalRef = React.createRef();
  }

  handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.modalRef.current === e.target) this.props.toggleModal();
  };

  genresCards = () => {
    if (!this.props.data?.genres) return null;
    const cards = this.props.data?.genres.map((item) => (
      <div key={item.id} className="movie-card__genre">
        {item.name}
      </div>
    ));
    return cards;
  };

  videosCards = () => {
    if (!this.props.data?.videos.results) return null;
    const cards = this.props.data?.videos.results.map((item) => (
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
    return cards;
  };

  loadingCard = () => {
    return (
      <div className="modal-overlay" ref={this.modalRef} onClick={this.handleClickOutside}>
        <Preloader />
      </div>
    );
  };

  errorCard = (message: string) => {
    return (
      <div className="modal-overlay" ref={this.modalRef} onClick={this.handleClickOutside}>
        <NetworkError message={message} />
      </div>
    );
  };

  render() {
    if (!this.props.show) return null;
    if (this.props.error) return this.errorCard(this.props.error as string);
    if (!this.props.data) return this.loadingCard();
    return (
      <div className="modal-overlay" ref={this.modalRef} onClick={this.handleClickOutside}>
        <div
          className="modal-card"
          style={{
            background: `linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)), 
            url("https://image.tmdb.org/t/p/w780${this.props.data?.backdrop_path}") center/cover`,
          }}
        >
          <div className="modal-card__button" onClick={this.props.toggleModal}>
            <img src={closeBtn} alt="&times;" />
          </div>
          <img
            className="modal-card__poster"
            src={`https://image.tmdb.org/t/p/w500${this.props.data?.poster_path}`}
          />
          <div className="modal-card__text">
            <h3 className="modal-card__movie-name">{this.props.data?.title}</h3>
            <div className="modal-card__movie-tagline">{this.props.data?.tagline}</div>
            <div className="modal-card__movie-overview">{this.props.data?.overview}</div>
            <div className="movie-card__ratings">
              <div className="movie-card__block">
                <span className="text-aux">🠕</span>
                <p className="movie-card__popularity text-big">
                  {Math.round(this.props.data?.popularity as number)}
                </p>
                <span className="text-aux">Popularity</span>
              </div>
              <div className="movie-card__block">
                <h3 className="movie-card__votes text-big">{this.props.data?.vote_count}</h3>
                <span className="text-aux">votes</span>
              </div>
              <div className="movie-card__block">
                <span className="text-aux color-accent">❤</span>
                <p className="text-big">{this.props.data?.vote_average}</p>
              </div>
            </div>
            <div className="movie-card__block">
              <span className="text-med">Release date:</span>
              <span className="text-big">{this.props.data?.release_date}</span>
            </div>
            <div className="movie-card__block">
              <span className="text-med">Genres:</span>
              {this.genresCards()}
            </div>
            <p className="text-med">Watch Videos:</p>
            <div className="movie-card__block scroll-y">{this.videosCards()}</div>
          </div>
        </div>
      </div>
    );
  }
}
