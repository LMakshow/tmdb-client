import React from 'react';
import MovieDetails from 'components/MovieDetails';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppSelector } from 'app/hooks';

export default function MoviePage() {
  const model = useAppSelector((state) => state.search.model);
  return (
    <div className="root">
      <Header pageName={`Details of the ${model === 'tv' ? 'TV show' : model}`} />
      <MovieDetails />
      <Footer />
    </div>
  );
}
