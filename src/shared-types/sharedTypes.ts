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

export type WorkoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: {
    name: string;
    quantity: number;
    _id: string;
  }[];
};

export type ProgressTypeOfWorkout = {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
};

export type ProgressTypeOfCourse = {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: {
    workoutId: string;
    workoutCompleted: boolean;
    progressData: number[];
  }[];
};

export type ProgressTest = {
  _id: string;
  name: string;
  progress: number;
};

export interface UserAuthType {
  email: string;
  password: string;
  repeatePassword?: string;
}

// export type UserRegType = UserAuthType & {
//   repeatePassword: string;
// };

export interface UserForApiType {
  _id?: string;
  email: string;
  password?: string;
  selectedCourses?: string[];
  courseProgress?: {
    courseId: string;
    courseCompleted: boolean;
    workoutsProgress: {
      workoutId: string;
      workoutCompleted: boolean;
      progressData: number[];
      _id: string;
    }[];
  }[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type ResponseMessageType = {
  message: string;
};

export type RequestIdCourse = {
  courseId: string;
};

export type ResponseLoginType = {
  token: string;
};
