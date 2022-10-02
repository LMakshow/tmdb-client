import React from 'react';
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

interface MainState {
  searchQuery: string;
  data: MovieData[];
  dataOnClick: MovieDetails | null;
  showModal: boolean;
  loading: boolean;
  movieListError: boolean | string;
  modalCardError: boolean | string;
}

export default class Main extends React.Component<unknown, MainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: (localStorage.getItem('searchQuery') as string) || '',
      data: [],
      dataOnClick: null,
      showModal: false,
      loading: false,
      movieListError: false,
      modalCardError: false,
    };
  }

  searchFetchRequest = async (query: string) => {
    try {
      this.setState({ loading: true, movieListError: false });
      if (query) {
        const response = await fetch(searchMoviesUrl(query));
        if (!response.ok) throw Error('Error fetching the search movies data');
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
      if (!query) {
        const response = await fetch(moviesPopularUrl());
        if (!response.ok) throw Error('Error fetching the popular movies data');
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(getErrorMessage(err));
      this.setState({ movieListError: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCardClick = async (id: number) => {
    try {
      if (id) {
        this.setState({ dataOnClick: null, modalCardError: false });
        this.toggleModal();
        const response = await fetch(movieDetailsUrl(id));
        if (!response.ok) throw Error('Error fetching the movie details data');
        const details = await response.json();
        this.setState({ dataOnClick: details });
      }
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(getErrorMessage(message));
      this.setState({ modalCardError: message });
    }
  };

  searchQueryChange = (query: string) => {
    this.setState({ searchQuery: query });
  };

  searchSubmit = () => {
    this.searchFetchRequest(this.state.searchQuery);
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentSaveStorage = () => {
    localStorage.setItem('searchQuery', this.state.searchQuery);
  };

  async componentDidMount() {
    this.searchFetchRequest(this.state.searchQuery);
    if (localStorage.getItem('searchQuery'))
      this.setState({ searchQuery: localStorage.getItem('searchQuery') as string });
    window.addEventListener('beforeunload', this.componentSaveStorage);
  }

  componentWillUnmount() {
    this.componentSaveStorage();
    window.removeEventListener('beforeunload', this.componentSaveStorage);
  }

  generateCards = (data: MovieData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      cards.push(<MovieCard key={item.id} onClick={this.handleCardClick} {...item} />);
    });
    return cards;
  };

  render() {
    const cards = this.generateCards(this.state.data);
    return (
      <div>
        <Heading text="Browse the most popular movies daily or search for any movies from TMDB" />
        <Search
          onQueryChange={this.searchQueryChange}
          onSearchSubmit={this.searchSubmit}
          searchQuery={this.state.searchQuery}
        />
        <div className="movie-page">
          {this.state.loading && <Preloader />}
          {this.state.movieListError && (
            <NetworkError message={this.state.movieListError as string} />
          )}
          {!this.state.loading && !this.state.movieListError && cards.length === 0
            ? 'No matches with the search query.'
            : cards}
        </div>
        <ModalCard
          error={this.state.modalCardError}
          data={this.state.dataOnClick}
          show={this.state.showModal}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
