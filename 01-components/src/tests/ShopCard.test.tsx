import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import data from 'assets/cameraData';

import ShopCard from 'components/ShopCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShopCard {...data[0]} />,
  },
]);

describe('Card', () => {
  test('renders Card component', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByText('Canon EOS 4000D 18-55 DC III')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /12899/ })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Photo/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/ }));
    expect(screen.getByRole('button', { name: /Added/ })).toBeInTheDocument();
  });
});
