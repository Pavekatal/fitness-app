'use client';

import { AxiosError } from 'axios';

import { getAllWorkouts } from '@/services/fitness/fitnessApi';
import {
  setAllWorkouts,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';
import { useAppDispatch } from '@/store/store';

export const useAllWorkouts = () => {
  const dispatch = useAppDispatch();

  const fetchAllWorkouts = (courseId: string, token: string) => {
    if (courseId) {
      getAllWorkouts(courseId, token)
        .then((res) => {
          dispatch(setAllWorkouts(res));
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
              setErrorMessage(
                'Неизвестная ошибка. Попробуйте перезагрузить страницу',
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setErrorMessage('Не удалось получить ид курса'));
    }
  };

  return { fetchAllWorkouts };
};
