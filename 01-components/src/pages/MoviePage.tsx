import React from 'react';
import MovieDetails from 'components/MovieDetails';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

export default function MoviePage() {
  const { searchModel: model } = useParams();
  return (
    <div className="root">
      <Header pageName={`Details of the ${model === 'tv' ? 'TV show' : model}`} />
      <MovieDetails />
      <Footer />
    </div>
  );
}
