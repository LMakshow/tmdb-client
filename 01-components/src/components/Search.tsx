import React from 'react';
import { Link } from 'react-router-dom';

interface SearchProps {
  onQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  searchQuery: string;
}

export default function Search(props: SearchProps) {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onQueryChange(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.onSearchSubmit();
    e.preventDefault();
  };

  return (
    <div className="search-container">
      <Link to="/form">
        <button className="button_big">Add movie request</button>
      </Link>
      <form className="search-field" onSubmit={handleSearchSubmit}>
        <input
          className="search-box"
          type="search"
          placeholder="Search"
          autoComplete="off"
          autoFocus
          value={props.searchQuery}
          onChange={handleQueryChange}
        />
        <button type="submit" className="search-submit"></button>
      </form>
    </div>
  );
}
