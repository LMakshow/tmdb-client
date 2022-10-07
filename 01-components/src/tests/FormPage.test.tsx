import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import FormPage from 'pages/FormPage';
import userEvent from '@testing-library/user-event';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
]);

describe('Form Page (with user generated cards)', () => {
  test('creates new card after submitting', async () => {
    render(<RouterProvider router={router} />);

    userEvent.type(screen.getAllByRole('textbox')[0], 'New Camera Card');
    userEvent.click(screen.getAllByRole('button')[0]);
    await waitFor(() => screen.getByText(/New Camera Card/));
  });
});
