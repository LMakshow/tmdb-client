import React from 'react';

export default function Search() {
  return (
    <div className="search-container">
      <div className="search-field">
        <input
          className="search-box"
          type="search"
          placeholder="Search"
          autoComplete="off"
          autoFocus
        />
        <div className="search-clear"></div>
      </div>
    </div>
  );
}
