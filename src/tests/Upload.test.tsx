    
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '../views/Upload';
import { expect, test } from 'vitest';

test('renders h2 headline', () => {
  render(<Upload />);
  const header = screen.getByRole('heading', { level: 2 });
  expect(header).toBeInTheDocument();
});

test('shows upload button', () => {
  render(<Upload />);
  const button = screen.getByRole('button', { name: /start upload/i });
  expect(button).toBeInTheDocument();
});

test('displays uploading notification after button is clicked', () => {
  render(<Upload />);
  fireEvent.click(screen.getByRole('button', { name: /start upload/i }));
  expect(screen.getByText('Uploading...')).toBeInTheDocument();
});