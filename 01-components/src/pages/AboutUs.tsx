import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import logoMain from '../assets/svg/TMDB.svg';

export default function AboutUs() {
  return (
    <div className="root">
      <Header pageName="About Us: Learn More About Website" />
      <div className="about-page">
        <h1 style={{ margin: 'auto' }}>About Us</h1>
        <h3>
          This is the React app to show you popular movies and to search for any movie you would
          like!
          <br />
          Get information about your favorite titles, release date, and watch teasers, trailers and
          more!
        </h3>
        <h3>
          The webpage made by <a href="https://github.com/LMakshow">Maksym Lytvyn.</a>
        </h3>
        <h3>
          The data source is <a href="https://www.themoviedb.org/">The Movie Database</a> shop.
        </h3>
        <img src={logoMain} style={{ width: '100px' }} alt="TMDB" />
      </div>
      <Footer />
    </div>
  );
}
