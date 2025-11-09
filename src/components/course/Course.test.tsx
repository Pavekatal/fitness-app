jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt="" />;
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Course from './Course';

// --- 1. Имитация внешних зависимостей ---

// Имитируем Next.js Router и usePathname
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), refresh: jest.fn() }),
}));

// Имитируем пользовательские хуки
jest.mock('@/hooks/useAddCourse', () => ({
  useAddCourse: () => ({ onAddCourse: jest.fn() }),
}));
jest.mock('@/hooks/useDeleteCourse', () => ({
  useDeleteCourse: () => ({ onDeleteCourse: jest.fn() }),
}));
jest.mock('@/hooks/useAllWorkouts', () => ({
  useAllWorkouts: () => ({ fetchAllWorkouts: jest.fn() }),
}));

// Имитируем хуки прогресса курса
jest.mock('@/hooks/useProgressCourse', () => ({
  // Возвращаем фиксированный прогресс для теста
  usePercentageProgressCourse: () => 50,
}));

// --- 2. Настройка Redux Store ---
const mockStore = configureStore([]);
const initialState = {
  workouts: { isLoading: false, errorMessage: '' },
  auth: { token: 'fake-token-123' },
};
const store = mockStore(initialState);

// --- 3. Фиктивные данные курса ---
const mockCourseData = {
  _id: 'course-1',
  nameRU: 'Курс по йоге',
  durationInDays: 30,
  dailyDurationInMinutes: { from: 10, to: 20 },
  description: 'Описание курса',
  directions: ['направление1', 'направление2'],
  fitting: ['Подходит для всех'],
  nameEN: 'Yoga Course',
  workouts: [],
  totalWorkouts: 0,
  level: 'Начинающий',
  order: 1,
  difficulty: '',
  __v: 1,
};

// --- 4. Тесты компонента Course ---
describe('Course Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOnWorkoutPop = jest.fn();

  const renderComponent = (isProfile: boolean) => {
    // Устанавливаем фиктивный путь для usePathname
    mockUsePathname.mockReturnValue(
      isProfile ? '/fitness/profile' : '/fitness/courses',
    );

    render(
      <Provider store={store}>
        <Course course={mockCourseData} onWorkoutPop={mockOnWorkoutPop} />
      </Provider>,
    );
  };

  it('renders course details correctly', () => {
    renderComponent(false);

    expect(screen.getByText('Курс по йоге')).toBeInTheDocument();
    expect(screen.getByText('30 дней')).toBeInTheDocument();
    expect(screen.getByText('10-20 мин/день')).toBeInTheDocument();
    expect(screen.getByText('Сложность')).toBeInTheDocument();
  });

  it('shows the "Add course" button when not on profile page', () => {
    renderComponent(false);

    // Проверяем наличие кнопки добавления
    expect(screen.getByTitle('Добавить курс')).toBeInTheDocument();
    // Проверяем отсутствие кнопки удаления
    expect(screen.queryByTitle('Удалить курс')).not.toBeInTheDocument();
  });

  it('shows the "Delete course" button when on profile page', () => {
    renderComponent(true);

    // Проверяем наличие кнопки удаления
    expect(screen.getByTitle('Удалить курс')).toBeInTheDocument();
    // Проверяем отсутствие кнопки добавления
    expect(screen.queryByTitle('Добавить курс')).not.toBeInTheDocument();
  });

  it('shows progress information when on profile page', () => {
    renderComponent(true); // Тестируем как страницу профиля

    // Проверяем наличие текста прогресса (50% мокнуто в хуке)
    expect(screen.getByText(/прогресс 50 %/i)).toBeInTheDocument();
    // Проверяем наличие кнопки "Продолжить" (т.к. прогресс > 0)
    expect(
      screen.getByRole('button', { name: 'Продолжить' }),
    ).toBeInTheDocument();
  });
});
