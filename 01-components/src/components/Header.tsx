import React from 'react';
import logoMain from '../assets/icons/logo-main.png';

export default function Header() {
  return (
    <div className="header header__container">
      <h1 className="navigation">
        <a className="header__link main" href="#">
          <img className="header__icon_main" src={logoMain} alt="Главная" />
          <span className="header__link_span">PhotoShop</span>
        </a>
      </h1>
      <div className="navigation">Current page: Main</div>
      <a className="navigation header__link main" href="/about">
        <span className="header__link_span">About us</span>
      </a>
    </div>
  );
}
