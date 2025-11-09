'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setAllCourses,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';
import { getAllCourses } from '@/services/fitness/fitnessApi';

export default function FetchingCourses() {
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.workouts);
  const pathname = usePathname();

  // Загрузка всех курсов
  useEffect(() => {
    if (
      pathname.startsWith('/fitness/main') ||
      pathname.startsWith('/fitness/profile')
    ) {
      dispatch(setErrorMessage(''));

      if (!allCourses.length) {
        dispatch(setIsLoading(true));
        getAllCourses()
          .then((res) => {
            dispatch(setAllCourses(res));
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
      }
    }
  }, [dispatch, allCourses, pathname]);
  return <></>;
}
