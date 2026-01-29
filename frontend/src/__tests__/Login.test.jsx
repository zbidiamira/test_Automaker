import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock the auth service
vi.mock('../../services/authService', () => ({
  loginUser: vi.fn(),
  getCurrentUser: vi.fn(),
}));

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('should render login form', () => {
      renderLogin();

      expect(screen.getByText('Welcome back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to VetAI Assistant')).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render link to register page', () => {
      renderLogin();

      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /create one/i })).toHaveAttribute('href', '/register');
    });

    it('should have email and password inputs', () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error when submitting with empty fields', async () => {
      renderLogin();
      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('you@example.com');
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('should show error when password is empty', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('you@example.com');
      await user.type(emailInput, 'valid@email.com');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility when clicking eye icon', async () => {
      renderLogin();
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText('••••••••');
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Find and click the toggle button
      const toggleButton = screen.getByRole('button', { name: '' });
      await user.click(toggleButton);

      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Form Submission', () => {
    it('should allow typing in form fields', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });
});
