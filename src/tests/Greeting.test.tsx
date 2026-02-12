import { render, screen, fireEvent } from '@testing-library/react';
import Greeting from '../components/Greeting';
import '@testing-library/jest-dom';

describe('Greeting component', () => {
  test('shows guest greeting by default', () => {
    render(<Greeting />);
    expect(screen.getByText(/terve vieras/i)).toBeInTheDocument();
  });

  test('shows user greeting after login', () => {
    render(<Greeting />);
    const loginButton = screen.getAllByRole('button', { name: /login/i })[0];
    fireEvent.click(loginButton);
    expect(screen.getByText(/terve kirjautunut/i)).toBeInTheDocument();
  });

  test('toggles between guest and user greeting', () => {
    render(<Greeting />);
    const toggleButton = screen.getAllByRole('button')[1];
    fireEvent.click(toggleButton); // login
    expect(screen.getByText(/terve kirjautunut/i)).toBeInTheDocument();
    fireEvent.click(toggleButton); // logout
    expect(screen.getByText(/terve vieras/i)).toBeInTheDocument();
  });
});
