import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CameraForm from 'components/Form';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  test('renders form', () => {
    const addCamera = jest.fn;
    render(<CameraForm addCamera={addCamera} />);

    expect(screen.getByPlaceholderText(/Manufacturer and model/)).toBeInTheDocument();
    expect(screen.getByText(/Manufacture date:/)).toBeInTheDocument();
    expect(screen.getByText(/Optical/)).toBeInTheDocument();
    expect(screen.getByText(/Picture/)).toBeInTheDocument();
  });

  test('submit should be disabled and enable after typing something in the Name field', () => {
    const addCamera = jest.fn;
    render(<CameraForm addCamera={addCamera} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByRole('textbox'), 'camera');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('form should submit correctly and reset after submitting', () => {
    const addCamera = jest.fn;
    render(<CameraForm addCamera={addCamera} />);

    userEvent.type(screen.getByRole('textbox'), 'camera');
    expect(screen.getByDisplayValue('camera')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByDisplayValue('camera')).not.toBeInTheDocument();
  });

  test("In case some field was filled incorrectly, submit shouldn't work", async () => {
    const addCamera = jest.fn;
    render(<CameraForm addCamera={addCamera} />);

    userEvent.type(screen.getByRole('textbox'), 'camera');
    fireEvent.change(screen.getByLabelText(/picture/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.txt', { type: 'txt' })],
      },
    });
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByDisplayValue('camera')).toBeInTheDocument();
  });
});
