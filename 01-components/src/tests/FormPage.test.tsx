import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import FormPage from 'pages/FormPage';
import userEvent from '@testing-library/user-event';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
]);

describe('Form Page (with user generated cards)', () => {
  test('If entered score is >10, should display the error message', async () => {
    render(<RouterProvider router={router} />);

    await act(async () => {
      userEvent.type(screen.getAllByRole('textbox')[0], 'New Camera Card');
      userEvent.type(screen.getByRole('spinbutton'), '11');
    });
    await waitFor(() => screen.getByText(/Please, select your score from 0 to 10/));
  });

  test('creates new card after submitting', async () => {
    render(<RouterProvider router={router} />);

    await act(async () => {
      userEvent.type(screen.getAllByRole('textbox')[0], 'New Camera Card');
    });
    userEvent.click(screen.getAllByRole('button')[0]);
    await waitFor(() => screen.getByText(/New Camera Card/));
  });
});
