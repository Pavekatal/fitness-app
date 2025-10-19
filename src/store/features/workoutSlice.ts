import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  selectedWorkout: null | string;
};

const initialState: initialStateType = {
  selectedWorkout: null,
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<string>) => {
      state.selectedWorkout = action.payload;
    },
  },
});

export const { setSelectedWorkout } = workoutSlice.actions;
export const workoutSliceReducer = workoutSlice.reducer;
