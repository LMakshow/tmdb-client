import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import AboutUs from '../pages/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AboutUs />,
  },
]);

describe('AboutUs', () => {
  test('renders AboutUs component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Главная TMDB/i })).toBeInTheDocument();
  });
});
