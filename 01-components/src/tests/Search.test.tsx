import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import Search from 'components/Search';

const onSearchSubmit = jest.fn;
const searchQuery = 'test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search onSearchSubmit={onSearchSubmit} searchQuery={searchQuery} />,
  },
]);

describe('Search', () => {
  test('renders Search component', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });
});
