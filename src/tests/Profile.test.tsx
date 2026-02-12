import {render, screen} from '@testing-library/react';
import ProfileView from '../views/Profile';
import ProfileComponent from '../components/Profile';
import {expect, test} from 'vitest';
import '@testing-library/jest-dom';
import {UserContext} from '../contexts/UserContext';
import type {AuthContextType} from '../types/LocalTypes';

test('renders headline for Profile view', () => {
  const defaultValue: AuthContextType = {
    user: null,
    loading: false,
    handleLogin: () => {},
    handleLogout: () => {},
    handleAutoLogin: () => {},
  };

  render(
    <UserContext.Provider value={defaultValue}>
      <ProfileView />
    </UserContext.Provider>,
  );
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/profile/i);
});

test('renders headline and content for Profile component', () => {
  render(<ProfileComponent />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/profile/i);
  expect(screen.getByText(/your profile/i)).toBeInTheDocument();
});