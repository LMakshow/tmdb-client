import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchResContext } from './SearchContext';

interface SearchProps {
  onQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  searchQuery: string;
}

const yearsOptions = () => {
  let currentYear = new Date().getFullYear();
  const earliestYear = 1990;
  const options = [] as JSX.Element[];
  while (currentYear >= earliestYear) {
    options.push(
      <option key={currentYear} value={currentYear}>{`Released in ${currentYear}`}</option>
    );
    currentYear -= 1;
  }
  return options;
};

export default function Search(props: SearchProps) {
  const {
    searchModel,
    changeSearchModel,
    searchAdult,
    changeSearchAdult,
    searchYear,
    changeSearchYear,
  } = useContext(SearchResContext);

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
      <div className="select-container">
        <select className="select-field" value={searchModel} onChange={changeSearchModel}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select className="select-field" value={searchAdult} onChange={changeSearchAdult}>
          <option value="no-adult">Exclude Adult</option>
          <option value="adult">Include Adult</option>
        </select>
        <select className="select-field" value={searchYear} onChange={changeSearchYear}>
          <option value="any-year">Any release year</option>
          {yearsOptions()}
        </select>
      </div>
    </div>
  );
}
