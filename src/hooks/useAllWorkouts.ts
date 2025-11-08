'use client';

import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { getAllWorkouts } from '@/services/fitness/fitnessApi';
import {
  setAllWorkouts,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';
import { useAppDispatch } from '@/store/store';
import { WorkoutType } from '@/shared-types/sharedTypes';

export const useAllWorkouts = () => {
  const dispatch = useAppDispatch();

  const fetchAllWorkouts = useCallback(
    (courseId: string, token: string): Promise<WorkoutType[]> => {
      return getAllWorkouts(courseId, token)
        .then((res) => {
          dispatch(setAllWorkouts(res));
          return res;
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setErrorMessage(error.response.data));
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
              );
            } else {
              dispatch(
                setErrorMessage(
                  'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                ),
              );
            }
          }
          return [];
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    },
    [dispatch],
  );

  return { fetchAllWorkouts };
};
