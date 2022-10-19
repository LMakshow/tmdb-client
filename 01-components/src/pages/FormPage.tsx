import RequestForm from 'components/Form';
import RequestCard from 'components/MovieReqCard';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { addRequestData } from 'app/requestsSlice';
import { MovieReqData } from 'utils/TMDBinterfaces';

export default function FormPage() {
  const requests = useAppSelector((state) => state.requests.requests);
  const dispatch = useAppDispatch();
  const requestFormHandler = (data: MovieReqData) => dispatch(addRequestData(data));
  const cards = requests.map((item) => <RequestCard key={item.num} {...item} />);

  return (
    <div className="root">
      <Header pageName="Form: Add a Movie Request" />
      <div className="used-cameras-container">
        <div className="used-cameras-left">
          <h2 className="used-cameras-heading">Add your request for a movie</h2>
          <RequestForm movieReq={requestFormHandler} />
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
