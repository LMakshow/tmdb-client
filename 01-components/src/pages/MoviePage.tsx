import React from 'react';
import MovieDetails from 'components/MovieDetails';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { getErrorMessage, movieDetailsUrl } from 'utils/fetchUtils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppSelector } from 'app/hooks';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    if (params.movieId) {
      const response = await fetch(movieDetailsUrl(Number(params.movieId), params.searchModel));
      if (!response.ok) throw Error('Error fetching the movie details data');
      const details = await response.json();
      return details;
    }
  } catch (err) {
    const message = getErrorMessage(err);
    console.log(getErrorMessage(message));
    return redirect('/');
  }
};

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
