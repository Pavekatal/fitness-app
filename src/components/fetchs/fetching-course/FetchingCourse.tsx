'use client';

import { AxiosError } from 'axios';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getCourse } from '@/services/fitness/fitnessApi';
import {
  setCurrentCourse,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';
import { useAppDispatch } from '@/store/store';

export default function FetchingCourse() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const paramsCourse = useParams<{ course_id: string }>();

  // Загрузка данных конкретного курса
  useEffect(() => {
    if (pathname.startsWith('/fitness/courses')) {
      dispatch(setErrorMessage(''));
      dispatch(setIsLoading(true));
      getCourse(paramsCourse.course_id)
        .then((res) => {
          dispatch(setCurrentCourse(res));
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
  }, [dispatch, pathname, paramsCourse.course_id]);
  return <></>;
}
