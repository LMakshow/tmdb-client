import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Search from 'components/Search';

const onQueryChange = jest.fn;
const searchQuery = 'test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search onQueryChange={onQueryChange} searchQuery={searchQuery} />,
  },
]);

describe('Search', () => {
  test('renders Search component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });
});
