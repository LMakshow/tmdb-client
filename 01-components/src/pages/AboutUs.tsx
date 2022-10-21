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
          This is the study/pet project built on React.js by{' '}
          <a href="https://github.com/LMakshow">Maksym Lytvyn</a>.
          <br /> Several versions were made to test-drive modern technologies that are commonly used
          with React.
        </h3>
        <ul className="about-page__list">
          <li>
            <b>Page switcher</b> — built on React Router v6.4 making the site a SPA.
          </li>
          <li>
            <b>Main page</b> — the API client of TMDB built on a custom fetch hook or Redux Toolkit
            Query.
          </li>
          <li>
            <b>Searchbox</b> — not only makes its job right but also saves the last search in Local
            Storage when refreshing the page.
          </li>
          <li>
            <b>Input selectors</b> — user can choose whether he wants to search for movies or tv
            shows, include or exclude adult movies from the list and narrow the search with the
            movies released in a particular year.
          </li>
          <li>
            <b>State management</b> — using (in different versions) native React Context Provider or
            Redux.
          </li>
          <li>
            <b>Pagination</b> — using React-paginate library, but items per page switcher is an
            extra custom logic with fetched data manipulation.
          </li>
          <li>
            <b>Loading spinner</b> and error messages help with UX, also 404 error page.
          </li>
          <li>
            <b>Request form</b> — built (in different versions) on controlled components,
            uncontrolled components, and React-hook-form library. Includes validation and supports
            file uploading.
          </li>
          <li>
            <b>And more!</b> — Each movie card is clickable to see the details on a separate page,
            including all video trailers and featurettes published to date.
          </li>
          <li>
            <b>Automated tests</b> — built on Jest + React Testing Library.
          </li>
        </ul>
        <h3>
          The data source is <a href="https://www.themoviedb.org/">The Movie Database</a>.
        </h3>
        <img src={logoMain} style={{ width: '100px' }} alt="TMDB" />
      </div>
      <Footer />
    </div>
  );
}
