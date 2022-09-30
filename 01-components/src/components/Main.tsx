import React from 'react';
import Search from './Search';
import MovieCard from './MovieCard';
import Heading from './Heading';
import { MovieData } from 'utils/TMDBinterfaces';
import { moviesPopularUrl, searchMoviesUrl } from 'utils/fetchUtils';

interface State {
  searchQuery: string;
  data: MovieData[];
}

export default class Main extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: (localStorage.getItem('searchQuery') as string) || '',
      data: [],
    };
  }

  searchQueryChange = (query: string) => {
    this.setState({
      searchQuery: query,
    });
  };

  componentSaveStorage = () => {
    localStorage.setItem('searchQuery', this.state.searchQuery);
  };

  async componentDidMount() {
    try {
      if (this.state.searchQuery) {
        const query = this.state.searchQuery;
        const response = await fetch(searchMoviesUrl(query));
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
      if (!this.state.searchQuery) {
        const response = await fetch(moviesPopularUrl());
        const movies = (await response.json()).results;
        this.setState({ data: movies });
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (localStorage.getItem('searchQuery'))
        this.setState({ searchQuery: localStorage.getItem('searchQuery') as string });
      window.addEventListener('beforeunload', this.componentSaveStorage);
    }
  }

  componentWillUnmount() {
    this.componentSaveStorage();
    window.removeEventListener('beforeunload', this.componentSaveStorage);
  }

  generateCards = (data: MovieData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      // const name = item.title.toLowerCase();
      // if (name.indexOf(this.state.searchQuery.toLowerCase()) !== -1)
      cards.push(<MovieCard key={item.id} {...item} />);
    });
    return cards;
  };

  render() {
    const cards = this.generateCards(this.state.data);
    return (
      <div>
        <Heading text="Browse the most popular movies daily or search for any movies from TMDB" />
        <Search onQueryChange={this.searchQueryChange} searchQuery={this.state.searchQuery} />
        <div className="shop-page">
          {cards.length === 0 ? 'No matches with the search query.' : cards}
        </div>
      </div>
    );
  }
}
