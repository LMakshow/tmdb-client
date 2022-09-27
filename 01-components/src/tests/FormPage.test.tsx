import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FormPage from 'pages/FormPage';
import userEvent from '@testing-library/user-event';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
]);

describe('Form Page (with user generated cards)', () => {
  test('creates new card after submitting', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeDisabled();
    userEvent.type(screen.getByRole('textbox'), 'New Camera Card');
    expect(screen.getAllByRole('button')[0]).not.toBeDisabled();
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText(/New Camera Card/)).toBeInTheDocument();
  });
});
