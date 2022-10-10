import RequestForm from 'components/Form';
import RequestCard from 'components/MovieReqCard';
import { UserContext } from 'components/UserContext';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FormPage() {
  const { movieReqData, addRequest } = React.useContext(UserContext);
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
