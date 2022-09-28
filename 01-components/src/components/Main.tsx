import React from 'react';
import Search from './Search';
import ShopCard from './ShopCard';
import { CameraData } from 'assets/data';
import data from 'assets/data';

interface State {
  searchQuery: string;
}

export default class Main extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchQuery: (localStorage.getItem('searchQuery') as string) || '',
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

  componentDidMount() {
    if (localStorage.getItem('searchQuery'))
      this.setState({ searchQuery: localStorage.getItem('searchQuery') as string });
    window.addEventListener('beforeunload', this.componentSaveStorage);
  }

  componentWillUnmount() {
    this.componentSaveStorage();
    window.removeEventListener('beforeunload', this.componentSaveStorage);
  }

  generateCards = (data: CameraData[]) => {
    const cards = [] as JSX.Element[];
    data.forEach((item) => {
      const name = item.name.toLowerCase();
      if (name.indexOf(this.state.searchQuery.toLowerCase()) !== -1)
        cards.push(<ShopCard key={item.num} {...item} />);
    });
    return cards;
  };

  render() {
    const cards = this.generateCards(data);
    return (
      <div>
        <Search onQueryChange={this.searchQueryChange} searchQuery={this.state.searchQuery} />
        <div className="shop-page">
          {cards.length === 0 ? 'No matches with the search query.' : cards}
        </div>
      </div>
    );
  }
}
