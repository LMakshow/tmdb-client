import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Page404 from '../pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page404 />,
  },
]);

describe('Testing 404 page', () => {
  test('renders 404 component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getAllByText('404')[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return to the main/ })).toBeInTheDocument();
  });
});
