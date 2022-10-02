import React from 'react';
import githubLogo from '../assets/svg/github.svg';
import rsLogo from '../assets/svg/rss.svg';
import tmdbShort from '../assets/svg/TMDB-short.svg';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__text">
            <a className="footer__link" href="https://github.com/LMakshow">
              <img className="footer__image-GH" src={githubLogo} alt="GitHub" />
              Maksym Lytvyn ©&nbsp;2022
            </a>
          </div>
          <a className="footer__link" href="https://www.themoviedb.org/">
            Data source: <img className="footer__image-RS" src={tmdbShort} alt="TMDB" />
          </a>
          <a className="footer__link" href="https://rs.school/js/">
            <img className="footer__image-RS" src={rsLogo} alt="RS School logo" />
          </a>
        </div>
      </footer>
    );
  }
}
