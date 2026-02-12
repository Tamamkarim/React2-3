

import {render, screen} from '@testing-library/react';
import ProfileView from '../views/Profile';
import ProfileComponent from '../components/Profile';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';

test('renders headline for Profile view', () => {
  render(<ProfileView />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/profile/i);
});

test('renders headline and content for Profile component', () => {
  render(<ProfileComponent />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/profile/i);
  expect(screen.getByText(/your profile/i)).toBeInTheDocument();
});