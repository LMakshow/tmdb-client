import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from 'components/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
]);

describe('Search', () => {
  test('renders Search component', () => {
    localStorage.setItem('searchQuery', 'test');
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Canon' },
    });
    expect(screen.getByDisplayValue('Canon')).toBeInTheDocument();
  });
});
