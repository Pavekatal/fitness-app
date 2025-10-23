import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux';
import { workoutSliceReducer } from './features/workoutSlice';
import { authSliceReducer } from './features/authSlice';

// создаем хранилище makeStore
export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      workouts: workoutSliceReducer,
      auth: authSliceReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const AppDispatch: () => AppStore = useStore;
