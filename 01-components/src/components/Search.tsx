import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchMovies } from 'app/moviesSlice';
import { changeCurrentPage } from 'app/paginatorSlice';
import { changeSearchAdult, changeSearchModel, changeSearchYear } from 'app/searchSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const dispatch = useAppDispatch();
  const model = useAppSelector((state) => state.search.model);
  const adult = useAppSelector((state) => state.search.adult);
  const year = useAppSelector((state) => state.search.year);
  const query = useAppSelector((state) => state.search.query);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onQueryChange(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.onSearchSubmit();
    e.preventDefault();
  };

  const changeModel = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeSearchModel(e.target.value));

  const changeAdult = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeSearchAdult(e.target.value));

  const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeSearchYear(e.target.value));

  useEffect(() => {
    dispatch(changeCurrentPage(0));
    fetchMovies(query);
    // Reset to the 1 page and fetch the new data after one of select boxes changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, adult, year]);

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
        <select className="select-field" value={model} onChange={changeModel}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select className="select-field" value={adult} onChange={changeAdult}>
          <option value="no-adult">Exclude Adult</option>
          <option value="adult">Include Adult</option>
        </select>
        <select className="select-field" value={year} onChange={changeYear}>
          <option value="any-year">Any release year</option>
          {yearsOptions()}
        </select>
      </div>
    </div>
  );
}
