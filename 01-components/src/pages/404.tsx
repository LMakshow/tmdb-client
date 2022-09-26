import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Page404 extends React.Component {
  render() {
    return (
      <div className="root">
        <Header pageName="404" />
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
