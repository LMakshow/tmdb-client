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

describe('AboutUs', () => {
  test('renders AboutUs component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return to the main/ })).toBeInTheDocument();
  });
});
