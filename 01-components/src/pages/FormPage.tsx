import RequestForm from 'components/Form';
import RequestCard, { MovieReqData } from 'components/MovieReqCard';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FormPage() {
  const [movieReqData, setMovieReqData] = useState([] as MovieReqData[]);

  const addRequest = (cameraData: MovieReqData) => {
    const newCameraData = cameraData;
    newCameraData.num = movieReqData.length + 1;
    setMovieReqData([...movieReqData, newCameraData]);
  };

  const cards = movieReqData.map((item) => <RequestCard key={item.num} {...item} />);

  return (
    <div className="root">
      <Header pageName="Form: Add a Movie Request" />
      <div className="used-cameras-container">
        <div className="used-cameras-left">
          <h2 className="used-cameras-heading">Add your request for a movie</h2>
          <RequestForm movieReq={addRequest} />
          <Link to="/">
            <button className="button_big">Return to main</button>
          </Link>
        </div>
        <div className="shop-page">
          {cards.length === 0 ? 'No requests so far. Please add some!' : cards}
        </div>
      </div>
      <Footer />
    </div>
  );
}
