import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {describe, expect, test} from 'vitest';
import ProtectedRoute from '../components/ProtectedRoute';
import {UserContext} from '../contexts/UserContext';
import type {AuthContextType} from '../types/LocalTypes';

const renderWithProviders = (
  ui: React.ReactElement,
  contextValue: Partial<AuthContextType>,
) => {
  const defaultValue: AuthContextType = {
    user: null,
    loading: false,
    handleLogin: () => {},
    handleLogout: () => {},
    handleAutoLogin: () => {},
  };

  return render(
    <BrowserRouter>
      <UserContext.Provider value={{...defaultValue, ...contextValue}}>
        {ui}
      </UserContext.Provider>
    </BrowserRouter>,
  );
};

describe('ProtectedRoute', () => {
  test('redirects to home when user is not authenticated', () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Secret content</div>
      </ProtectedRoute>,
      {user: null},
    );

    // When not authenticated, ProtectedRoute returns a Navigate which will not render children
    expect(screen.queryByText(/secret content/i)).not.toBeInTheDocument();
  });

  test('renders children when user is authenticated', () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Secret content</div>
      </ProtectedRoute>,
      {user: {username: 'test-user'} as any},
    );

    expect(screen.getByText(/secret content/i)).toBeInTheDocument();
  });
});
