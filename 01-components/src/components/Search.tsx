import React from 'react';

interface SearchProps {
  onQueryChange: (query: string) => void;
  searchQuery: string;
}

export default class Search extends React.Component<SearchProps, unknown> {
  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e === null) return;
    this.props.onQueryChange(e.target.value);
  };

  render() {
    return (
      <div className="search-container">
        <div className="search-field">
          <input
            className="search-box"
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
            value={this.props.searchQuery}
            onChange={this.handleQueryChange}
          />
          <div className="search-clear"></div>
        </div>
      </div>
    );
  }
}
