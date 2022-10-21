import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Main from 'components/Main';
import userEvent from '@testing-library/user-event';
import { store } from '../app/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

describe('Main', () => {
  test('renders popular movies cards and average score for the Orphan movie (6.8)', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByText(/Browse the most popular movies/)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    expect(screen.getAllByText(/6.8/)[0]).toBeInTheDocument();
  });

  test('after submitting search for a movie, renders search results and average score (7.6)', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    userEvent.click(screen.getByRole('searchbox'));
    userEvent.type(screen.getByRole('searchbox'), 'Minions{Enter}');
    await waitFor(() => screen.getByText(/Minions: The Rise of Gru/));
    expect(screen.getByText(/7.6/)).toBeInTheDocument();
  });
});
