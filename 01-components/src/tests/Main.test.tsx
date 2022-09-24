import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Main from 'components/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

describe('Main', () => {
  test('renders Main component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('Canon EOS 4000D 18-55 DC III')).toBeInTheDocument();
    expect(screen.getByText('Canon EOS 5D Mark IV 24-105L IS II')).toBeInTheDocument();
  });
});
