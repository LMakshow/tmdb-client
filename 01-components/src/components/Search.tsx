import React from 'react';
import { Link } from 'react-router-dom';

interface SearchProps {
  onQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  searchQuery: string;
}

export default class Search extends React.Component<SearchProps, unknown> {
  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onQueryChange(e.target.value);
  };

  handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.onSearchSubmit();
    e.preventDefault();
  };

  render() {
    return (
      <div className="search-container">
        <Link to="/form">
          <button className="button_big">Browse used cameras</button>
        </Link>
        <form className="search-field" onSubmit={this.handleSearchSubmit}>
          <input
            className="search-box"
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
            value={this.props.searchQuery}
            onChange={this.handleQueryChange}
          />
          <button type="submit" className="search-submit"></button>
        </form>
      </div>
    );
  }
}
