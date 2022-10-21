import React from 'react';
import { Link } from 'react-router-dom';
import logoMain from '../assets/svg/TMDB.svg';

export default function Header(props: { pageName: string }) {
  return (
    <div className="header header__container">
      <h1 className="navigation">
        <Link className="header__link main" to="/">
          <img className="header__icon_main" src={logoMain} alt="<Main>" />
          <span className="header__link_span">TMDB</span>
        </Link>
      </h1>
      <div className="navigation">{props.pageName}</div>
      <Link className="navigation header__link main" to="/about">
        <span className="header__link_about">About us</span>
      </Link>
    </div>
  );
}
