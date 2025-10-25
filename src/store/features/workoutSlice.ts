import { CourseType, WorkoutType } from '@/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  allCourses: CourseType[];
  currentCourse: null | CourseType;
  allWorkouts: WorkoutType[];
  selectedWorkout: null | string;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialStateType = {
  allCourses: [],
  currentCourse: null,
  allWorkouts: [],
  selectedWorkout: null,
  isLoading: false,
  errorMessage: '',
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<CourseType>) => {
      state.currentCourse = action.payload;
    },
    setAllWorkouts: (state, action: PayloadAction<WorkoutType[]>) => {
      state.allWorkouts = action.payload;
    },
    setSelectedWorkout: (state, action: PayloadAction<string>) => {
      state.selectedWorkout = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setCurrentCourse,
  setAllWorkouts,
  setSelectedWorkout,
  setIsLoading,
  setErrorMessage,
} = workoutSlice.actions;
export const workoutSliceReducer = workoutSlice.reducer;
