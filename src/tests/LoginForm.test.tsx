import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {describe, expect, test, vi} from 'vitest';
import LoginForm from '../components/LoginForm';
import * as apiHooks from '../hooks/apiHooks';
import {BrowserRouter} from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginForm', () => {
  test('shows error message when login fails', async () => {
    const postLoginMock = vi.fn().mockRejectedValue(new Error('Invalid')); 
    vi.spyOn(apiHooks, 'useAuthentication').mockReturnValue({postLogin: postLoginMock} as any);

    renderWithRouter(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: {value: 'user'},
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {value: 'wrong'},
    });

    fireEvent.click(screen.getByRole('button', {name: /login/i}));

    const error = await screen.findByText(/login failed/i);
    expect(error).toBeInTheDocument();
  });
});
