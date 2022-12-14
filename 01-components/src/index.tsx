import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import reportWebVitals from './reportWebVitals';
import App from 'pages/MainPage';
import Page404 from 'pages/404';
import AboutUs from 'pages/AboutUs';
import FormPage from 'pages/FormPage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import MoviePage from 'pages/MoviePage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <Page404 />,
    },
    {
      path: '/index',
      element: <App />,
      errorElement: <Page404 />,
    },
    {
      path: '/about',
      element: <AboutUs />,
      errorElement: <Page404 />,
    },
    {
      path: '/form',
      element: <FormPage />,
      errorElement: <Page404 />,
    },
    {
      path: '/details/:searchModel/:movieId',
      element: <MoviePage />,
      errorElement: <Page404 />,
    },
  ],
  {
    basename: '/tmdb-client/06-redux',
  }
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
