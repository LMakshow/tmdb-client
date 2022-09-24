import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="root">
        <Header pageName="About Us" />
        <div className="about-page">
          <h1 style={{ margin: 'auto' }}>About Us</h1>
          <h3>
            This is the basic React app to show basic search bar and some cards using React class
            components. It currently shows some cool cameras, their price, type, stabilization,
            megapixels number and the photos, of course!
            <br />
            The data source is the <a href="https://elmir.ua/">elmir</a> shop.
          </h3>
        </div>
        <Footer />
      </div>
    );
  }
}
