import React from 'react';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData, MovieDetails } from 'utils/TMDBinterfaces';
import { movieDetailsUrl, moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';
import ModalCard from './ModalCard';

interface MainState {
  searchQuery: string;
  data: MovieData[];
  dataOnClick: MovieDetails | null;
  showModal: boolean;
}

export default class Main extends React.Component<unknown, MainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: (localStorage.getItem('searchQuery') as string) || '',
      data: [],
      dataOnClick: null,
      showModal: false,
    };
  }

  searchFetchRequest = async (query: string) => {
    try {
      if (query) {
        const response = await fetch(searchMoviesUrl(query));
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
      if (!query) {
        const response = await fetch(moviesPopularUrl());
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleCardClick = async (id: number) => {
    try {
      if (id) {
        this.setState({ dataOnClick: null });
        this.toggleModal();
        const response = await fetch(movieDetailsUrl(id));
        const details = await response.json();
        this.setState({ dataOnClick: details });
      }
    } catch (err) {
      console.log(err);
    }
  };

  searchQueryChange = (query: string) => {
    this.setState({
      searchQuery: query,
    });
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
          {cards.length === 0 ? 'No matches with the search query.' : cards}
        </div>
        <ModalCard
          data={this.state.dataOnClick}
          show={this.state.showModal}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
