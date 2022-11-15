import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import RequestForm from 'components/Form';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  test('renders form', () => {
    const addRequest = jest.fn;
    render(<RequestForm movieReq={addRequest} />);

    expect(screen.getByPlaceholderText(/Description for a movie/)).toBeInTheDocument();
    expect(screen.getByText(/Release date:/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Picture/)).toBeInTheDocument();
  });

  test('submit should be disabled and enable after typing something in the Name field', async () => {
    const addRequest = jest.fn;
    render(<RequestForm movieReq={addRequest} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    await act(async () => {
      userEvent.type(screen.getAllByRole('textbox')[0], 'New Movie');
    });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('form should submit correctly and reset after submitting', async () => {
    const addRequest = jest.fn;
    render(<RequestForm movieReq={addRequest} />);

    await act(async () => {
      userEvent.type(screen.getAllByRole('textbox')[0], 'New Movie');
    });
    expect(screen.getByDisplayValue('New Movie')).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });
    expect(screen.queryByDisplayValue('New Movie')).not.toBeInTheDocument();
  });

  test("In case some field was filled incorrectly, submit shouldn't work", async () => {
    const addRequest = jest.fn;
    render(<RequestForm movieReq={addRequest} />);

    userEvent.type(screen.getAllByRole('textbox')[0], 'New Movie');
    fireEvent.change(screen.getByLabelText(/picture/i), {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.txt', { type: 'txt' })],
      },
    });
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByDisplayValue('New Movie')).toBeInTheDocument();
  });
});
