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
  test('renders popular movies cards and render votes number', async () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Browse the most popular movies/)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    expect(screen.getByText(/797/)).toBeInTheDocument();
  });

  test('shows modal window after a click on a card and renders release date', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(/Orphan: First Kill/));
    userEvent.click(screen.getByText(/Orphan: First Kill/));
    await waitFor(() => screen.getByText(/There's always been something wrong with Esther/));
    expect(screen.getByText(/2022-07-27/)).toBeInTheDocument();
  });
});
