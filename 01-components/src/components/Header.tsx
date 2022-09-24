import React from 'react';
import { Link } from 'react-router-dom';
import logoMain from '../assets/icons/logo-main.png';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header header__container">
        <h1 className="navigation">
          <Link className="header__link main" to="/">
            <img className="header__icon_main" src={logoMain} alt="Главная" />
            <span className="header__link_span">PhotoShop</span>
          </Link>
        </h1>
        <div className="navigation">Current page: Main</div>
        <Link className="navigation header__link main" to="/about">
          <span className="header__link_span">About us</span>
        </Link>
      </div>
    );
  }
}
