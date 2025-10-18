import {
  BannerCourseType,
  CourseType,
  ProgressTest,
  UserType,
} from './shared-types/sharedTypes';

export const courses: CourseType[] = [
  {
    _id: '1',
    name: 'Йога',
    cover: '/img/yoga.png',
    description: '',
    directions: [
      'Йога для новичков',
      'Кундалини-йога',
      'Хатха-йога',
      'Классическая йога',
      'Йогатерапия',
      'Аштанга-йога',
    ],
    fitting: [''],
    difficulty: '/img/difficulty.png',
    durationInDays: 25,
    dailyDurationInMinutes: {
      from: 20,
      to: 50,
    },
    workouts: ['1', '2', '3'],
    progress: 40,
  },
  {
    _id: '2',
    name: 'Стретчинг',
    cover: '/img/stretching.png',
    description: '',
    directions: [
      'Йога для новичков',
      'Кундалини-йога',
      'Хатха-йога',
      'Классическая йога',
      'Йогатерапия',
      'Аштанга-йога',
    ],
    fitting: [''],
    difficulty: '/img/difficulty.png',
    durationInDays: 25,
    dailyDurationInMinutes: {
      from: 20,
      to: 50,
    },
    workouts: ['4', '5', '6'],
    progress: 100,
  },
  {
    _id: '3',
    name: 'Фитнес',
    cover: '/img/fitness.png',
    description: '',
    directions: [
      'Йога для новичков',
      'Кундалини-йога',
      'Хатха-йога',
      'Классическая йога',
      'Йогатерапия',
      'Аштанга-йога',
    ],
    fitting: [''],
    difficulty: '/img/difficulty.png',
    durationInDays: 25,
    dailyDurationInMinutes: {
      from: 20,
      to: 50,
    },
    workouts: ['1', '4', '3'],
    progress: 0,
  },
  {
    _id: '4',
    name: 'Степ-аэробика',
    cover: '/img/step-aerobics.png',
    description: '',
    directions: [
      'Йога для новичков',
      'Кундалини-йога',
      'Хатха-йога',
      'Классическая йога',
      'Йогатерапия',
      'Аштанга-йога',
    ],
    fitting: [''],
    difficulty: '/img/difficulty.png',
    durationInDays: 25,
    dailyDurationInMinutes: {
      from: 20,
      to: 50,
    },
    workouts: ['2', '5', '6'],
    progress: 20,
  },
  {
    _id: '5',
    name: 'Бодифлекс',
    cover: '/img/bodyflex.png',
    description: '',
    directions: [
      'Йога для новичков',
      'Кундалини-йога',
      'Хатха-йога',
      'Классическая йога',
      'Йогатерапия',
      'Аштанга-йога',
    ],
    fitting: [''],
    difficulty: '/img/difficulty.png',
    durationInDays: 25,
    dailyDurationInMinutes: {
      from: 20,
      to: 50,
    },
    workouts: ['1', '3', '4'],
    progress: 80,
  },
];

export const bannersCourses: BannerCourseType[] = [
  { _id: '1', banner: '/img/card-1.png', bgc: '#FFC700' },
  { _id: '2', banner: '/img/card-2.png', bgc: '#2491D2' },
  { _id: '3', banner: '/img/card-3.png', bgc: '#F7A012' },
  { _id: '4', banner: '/img/card-4.png', bgc: '#FF7E65' },
  { _id: '5', banner: '/img/card-5.png', bgc: '#7D458C' },
];

export const users: UserType[] = [
  {
    _id: '1',
    login: 'sergey.petrov96',
    email: 'serg@test.ru',
    name: 'Сергей',
    password: '12345',
    selectedCourses: ['1', '2', '3'],
  },
  {
    _id: '2',
    login: 'ekaterina.pavlova90',
    email: 'kate@test.ru',
    name: 'Екатерина',
    password: '12345',
    selectedCourses: ['5', '4', '1'],
  },
];

export const progress: ProgressTest[] = [
  {
    _id: '1',
    progress: 40,
  },
  {
    _id: '2',
    progress: 0,
  },
  {
    _id: '3',
    progress: 100,
  },
];
