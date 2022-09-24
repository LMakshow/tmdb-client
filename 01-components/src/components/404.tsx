import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default class Page404 extends React.Component {
  render() {
    return (
      <div className="root">
        <Header />
        <div className="container404">
          <h1>404</h1>
          <p>Sorry, this page is not found.</p>
          <Link to="/" className="header__link_span">
            Return to the main?
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}
