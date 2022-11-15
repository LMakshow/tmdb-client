import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../components/Footer';

describe('Testing Footer', () => {
  test('renders Footer component', () => {
    render(<Footer />);

    expect(screen.getByText('Maksym Lytvyn © 2022')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub Maksym Lytvyn/ })).toBeInTheDocument();
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});
