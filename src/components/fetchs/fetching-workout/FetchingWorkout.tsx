'use client';

import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import {
  getProgressByWorkout,
  getWorkout,
} from '@/services/fitness/fitnessApi';
import {
  setCurrentWorkout,
  setErrorMessage,
  setIsLoading,
  setProgressByWorkout,
  setSelectedCourse,
} from '@/store/features/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function FetchingWorkoutAndProgress() {
  const pathname = usePathname();
  const paramsWorkout = useParams<{ workout_id: string }>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.workouts);
  const { token } = useAppSelector((state) => state.auth);
  const [selectCourseId, setSelectCourseId] = useState<string | null>(null);

  useEffect(() => {
    const courseId = localStorage.getItem('selectCourseId');
    if (courseId) {
      dispatch(setSelectedCourse(courseId));
    }
    setSelectCourseId(courseId);
  }, [dispatch]);

  // Загрузка данных конкретной тренировки
  useEffect(() => {
    if (pathname.startsWith('/fitness/workouts')) {
      dispatch(setErrorMessage(''));
      if (token) {
        dispatch(setIsLoading(true));
        getWorkout(paramsWorkout.workout_id, token)
          .then((res) => {
            dispatch(setCurrentWorkout(res));
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
          })
          .finally(() => {
            dispatch(setIsLoading(false));
          });
      }
    }
  }, [dispatch, pathname, token, paramsWorkout.workout_id]);

  // Загрузка прогресса по тренировке
  useEffect(() => {
    if (pathname.startsWith('/fitness/workouts')) {
      dispatch(setErrorMessage(''));
      if (token && selectCourseId) {
        getProgressByWorkout(token, selectCourseId, paramsWorkout.workout_id)
          .then((res) => dispatch(setProgressByWorkout(res)))
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
          })
          .finally(() => {
            dispatch(setIsLoading(false));
          });
      }
    }
  }, [
    dispatch,
    token,
    pathname,
    isLoading,
    paramsWorkout.workout_id,
    selectCourseId,
  ]);

  return <></>;
}
