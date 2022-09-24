import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../components/Header';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header pageName="Main" />,
  },
]);

describe('Header', () => {
  test('renders Header component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('Current page: Main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Главная PhotoShop/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About us/ })).toBeInTheDocument();
  });
});
