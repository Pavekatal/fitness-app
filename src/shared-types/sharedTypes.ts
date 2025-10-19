export type CourseType = {
  _id: string;
  name: string;
  cover: null | string;
  description: string;
  directions: string[];
  fitting: string[];
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  workouts: string[];
  progress: number;
};

export type BannerCourseType = {
  _id: string;
  banner: string;
  bgc: string;
};

export type UserType = {
  _id: string | number;
  login: string;
  name: string;
  email: string;
  password: string;
  selectedCourses: string[];
};

export type WorkoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: string;
};

export type ProgressTest = {
  _id: string;
  progress: number;
};
