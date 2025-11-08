import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AuthForm from './AuthForm';
import * as AuthApi from '@/services/auth/authApi';

// --- Имитация зависимостей ---
jest.mock('@/services/auth/authApi');
const mockedLogin = jest.mocked(AuthApi.login);
const mockedRegistry = jest.mocked(AuthApi.registry);

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn(), refresh: jest.fn() }),
  usePathname: jest.fn(),
}));

jest.mock('react-toastify', () => ({ toast: jest.fn() }));

// --- Настройка Redux Store ---
const mockStore = configureStore([]);

const renderComponent = (isSignUp: boolean, storeOverride?: any) => {
  const storeInstance =
    storeOverride ||
    mockStore({
      workouts: { isLoading: false, errorMessage: '' },
      auth: { token: null, currentUser: null },
    });
  return render(
    <Provider store={storeInstance}>
      <AuthForm isSignUp={isSignUp} />
    </Provider>,
  );
};

// --- Тесты для входа (Sign In) ---
describe('AuthForm (Sign In)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-in form correctly', () => {
    renderComponent(false);

    // Используем плейсхолдеры, которые уникальны на этой странице
    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
    // Проверяем, что поля регистрации нет
    expect(
      screen.queryByPlaceholderText('Повторите пароль'),
    ).not.toBeInTheDocument();
  });

  it('shows validation error when fields are empty on submit', () => {
    renderComponent(false);

    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(screen.getByText('Заполните все поля')).toBeInTheDocument();
    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it('calls login API on successful submission', async () => {
    mockedLogin.mockResolvedValue({ token: 'fake-token-123' });
    renderComponent(false);

    fireEvent.change(screen.getByPlaceholderText('Эл. почта'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});

// --- Тесты для регистрации (Sign Up) ---
describe('AuthForm (Sign Up)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-up form correctly with all fields', () => {
    renderComponent(true);

    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Повторите пароль')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Зарегистрироваться' }),
    ).toBeInTheDocument();
  });

  it('shows error when passwords do not match during sign up', () => {
    renderComponent(true);

    // Используем уникальные плейсхолдеры для ввода
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'pass123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), {
      target: { value: 'pass456' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    expect(
      screen.getByText('Пароли не совпадают. Повторите попытку'),
    ).toBeInTheDocument();
    expect(mockedRegistry).not.toHaveBeenCalled();
  });
});
