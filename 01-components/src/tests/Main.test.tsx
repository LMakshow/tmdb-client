import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Main from 'components/Main';
import userEvent from '@testing-library/user-event';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

// describe('Main', () => {
//   test('renders Main component', () => {
//     render(<RouterProvider router={router} />);

//     expect(screen.getByText('Canon EOS 4000D 18-55 DC III')).toBeInTheDocument();
//     expect(screen.getByText('Canon EOS 5D Mark IV 24-105L IS II')).toBeInTheDocument();
//   });
// });

describe('Main', () => {
  test('renders popular movies cards and votes count (797)', async () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Browse the most popular movies/)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    expect(screen.getByText(/797/)).toBeInTheDocument();
  });

  test('shows modal window after a click on a card and renders release date (2022-07-27)', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    userEvent.click(screen.getByText(/Orphan: First Kill/));
    await waitFor(() => screen.getByText(/There's always been something wrong with Esther/));
    expect(screen.getByText(/2022-07-27/)).toBeInTheDocument();
  });

  test('after submitting search for a movie, renders search results and average score (7.6)', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    userEvent.click(screen.getByRole('searchbox'));
    userEvent.type(screen.getByRole('searchbox'), 'Minions{Enter}');
    await waitFor(() => screen.getByText(/Minions: The Rise of Gru/));
    expect(screen.getByText(/7.6/)).toBeInTheDocument();
  });
});
