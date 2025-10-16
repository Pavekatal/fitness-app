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
};

export type BannerCourseType = {
  _id: string;
  banner: string;
  bgc: string;
};
