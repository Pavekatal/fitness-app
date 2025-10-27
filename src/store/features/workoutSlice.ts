import {
  CourseType,
  // ProgressTypeOfCourse,
  ProgressTypeOfWorkout,
  WorkoutType,
} from '@/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  allCourses: CourseType[];
  currentCourse: null | CourseType;
  allWorkouts: WorkoutType[];
  currentWorkout: null | WorkoutType;
  selectedWorkout: null | string;
  // allProgress: ProgressTypeOfCourse;
  progressByWorkout: null | ProgressTypeOfWorkout;
  openProgressPop: boolean;
  openCountProgressPop: boolean;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialStateType = {
  allCourses: [],
  currentCourse: null,
  allWorkouts: [],
  currentWorkout: null,
  selectedWorkout: null,
  // allProgress: {},
  progressByWorkout: null,
  openProgressPop: false,
  openCountProgressPop: false,
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
    setCurrentWorkout: (state, action: PayloadAction<WorkoutType>) => {
      state.currentWorkout = action.payload;
    },
    setSelectedWorkout: (state, action: PayloadAction<string>) => {
      state.selectedWorkout = action.payload;
    },
    // setAllProgress: (state, action: PayloadAction<ProgressTypeOfCourse>) => {
    //   state.allProgress = action.payload;
    // },
    setProgressByWorkout: (
      state,
      action: PayloadAction<ProgressTypeOfWorkout>,
    ) => {
      state.progressByWorkout = action.payload;
    },
    setOpenProgressPop: (state, action: PayloadAction<boolean>) => {
      state.openProgressPop = action.payload;
    },
    setOpenCountProgressPop: (state, action: PayloadAction<boolean>) => {
      state.openCountProgressPop = action.payload;
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
  setCurrentWorkout,
  setSelectedWorkout,
  // setAllProgress,
  setProgressByWorkout,
  setOpenProgressPop,
  setOpenCountProgressPop,
  setIsLoading,
  setErrorMessage,
} = workoutSlice.actions;
export const workoutSliceReducer = workoutSlice.reducer;
