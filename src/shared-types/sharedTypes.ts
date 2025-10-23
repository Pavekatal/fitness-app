export type CourseType = {
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  workouts: string[];
  // progress: number;
  __v: number;
};

export type BannerCourseType = {
  _id: string;
  banner: string;
  bgc: string;
  cover: null | string;
};

export interface UserAuthType {
  email: string;
  password: string;
  repeatePassword?: string;
}

// export type UserRegType = UserAuthType & {
//   repeatePassword: string;
// };

// export type UserDataType = {
//   _id: string;
//   email: string;
//   selectedCourses: string[];
// };

export interface UserForApiType {
  _id?: string;
  email: string;
  password?: string;
  selectedCourses?: string[];
  courseProgress?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type WorkoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: string;
};

export type ProgressTest = {
  _id: string;
  name: string;
  progress: number;
};
