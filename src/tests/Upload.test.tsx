    
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '../views/Upload';
import {expect, test, vi} from 'vitest';

// jsdom does not implement URL.createObjectURL; mock it for tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).URL.createObjectURL = vi.fn();

test('renders Upload heading', () => {
  render(<Upload />);
  const header = screen.getByRole('heading', {level: 2});
  expect(header).toHaveTextContent(/upload media/i);
});

test('shows disabled Start upload button initially', () => {
  render(<Upload />);
  const button = screen.getByRole('button', {name: /start upload/i});
  expect(button).toBeDisabled();
});

test('shows error when uploading without token', async () => {
  render(<Upload />);

  // ensure there is no token
  window.localStorage.removeItem('token');

  // simulate selecting a file so the button becomes enabled
  const fileInput = screen.getByLabelText(/file/i) as HTMLInputElement;
  const file = new File(['dummy'], 'test.png', {type: 'image/png'});
  fireEvent.change(fileInput, {target: {files: [file]}});

  const button = screen.getByRole('button', {name: /start upload/i});
  expect(button).not.toBeDisabled();

  fireEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText(/please choose a file and make sure you are logged in/i),
    ).toBeInTheDocument();
  });
});