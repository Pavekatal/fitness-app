import { CourseType } from '@/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  allCourses: CourseType[];
  currentCourse: null | CourseType;
  selectedWorkout: null | string;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialStateType = {
  allCourses: [],
  currentCourse: null,
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
  setSelectedWorkout,
  setIsLoading,
  setErrorMessage,
} = workoutSlice.actions;
export const workoutSliceReducer = workoutSlice.reducer;
