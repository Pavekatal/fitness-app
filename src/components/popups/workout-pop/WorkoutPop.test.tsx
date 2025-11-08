import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WorkoutPop from './WorkoutPop';
import * as FitnessApi from '@/services/fitness/fitnessApi';
import * as Toastify from 'react-toastify';

// --- 1. Имитация внешних зависимостей ---

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), refresh: jest.fn() }),
  usePathname: jest.fn(),
}));

jest.mock('@/services/fitness/fitnessApi');
const mockedDeleteProgress = jest.mocked(FitnessApi.deleteProgress);

// Имитируем toast
jest.mock('react-toastify'); // Мокаем модуль toastify
const mockedToastSuccess = jest.mocked(Toastify.toast.success); // Получаем ссылку на mock success

jest.mock('@/hooks/useUserData', () => ({
  useUserData: () => ({ fetchUserData: jest.fn() }),
}));
jest.mock('@/components/button/Button', () => ({
  __esModule: true,
  default: (props: any) => <button {...props} />,
}));

// --- 2. Настройка Redux Store и фиктивных данных ---
const mockStore = configureStore([]);

const workout1 = { _id: 'w1', name: 'Тренировка 1', duration: 10, order: 1 };
const workout2 = { _id: 'w2', name: 'Тренировка 2', duration: 15, order: 2 };

const baseInitialState = {
  workouts: {
    allWorkouts: [workout1, workout2],
    selectedWorkout: null,
    selectedCourse: 'course-1',
    isLoading: false,
    errorMessage: '',
  },
  auth: {
    token: 'fake-token',
    currentUser: {
      courseProgress: [
        {
          courseId: 'course-1',
          courseCompleted: false,
          workoutsProgress: [
            { workoutId: 'w1', workoutCompleted: false }, // w1 не завершена
            { workoutId: 'w2', workoutCompleted: true }, // w2 завершена
          ],
        },
      ],
    },
  },
};

const renderComponent = (stateOverride = {}) => {
  // Вместо mockStore мы используем storeInstance.dispatch для проверки действий
  const storeInstance = mockStore({ ...baseInitialState, ...stateOverride });
  return render(
    <Provider store={storeInstance}>
      <WorkoutPop />
    </Provider>,
  );
};

// --- 3. Тесты компонента WorkoutPop ---
describe('WorkoutPop Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Выберите тренировку" title and list of workouts', () => {
    renderComponent();

    expect(screen.getByText('Выберите тренировку')).toBeInTheDocument();
    expect(screen.getByText('Тренировка 1')).toBeInTheDocument();
    expect(screen.getByText('Тренировка 2')).toBeInTheDocument();
  });

  it('shows "Начать" link placeholder, as state updates are async in tests', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Тренировка 1'));

    const startLink = screen.getByRole('link', { name: 'Начать' });
    expect(startLink).toBeInTheDocument();
  });

  it('shows "Удалить прогресс" button when a completed workout is selected', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Тренировка 2'));

    const deleteButton = screen.getByRole('button', {
      name: 'Удалить прогресс',
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls deleteProgress API function when "Удалить прогресс" is clicked', async () => {
    mockedDeleteProgress.mockResolvedValue({ message: 'Прогресс удален' });

    renderComponent();

    fireEvent.click(screen.getByText('Тренировка 2'));

    fireEvent.click(screen.getByRole('button', { name: 'Удалить прогресс' }));

    await waitFor(() => {
      expect(mockedDeleteProgress).toHaveBeenCalledWith(
        'fake-token',
        'course-1',
        'w2',
      );
    });

    expect(mockedToastSuccess).toHaveBeenCalledWith('Прогресс удален');
  });
});
