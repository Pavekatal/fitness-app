'use client';

import { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  getAllCourses,
  getCourse,
  getProgressByWorkout,
  getWorkout,
} from '@/services/fitness/fitnessApi';
import {
  setAllCourses,
  setCurrentCourse,
  setCurrentWorkout,
  setErrorMessage,
  setIsLoading,
  setProgressByWorkout,
} from '@/store/features/workoutSlice';
import Header from '@/components/header/Header';
import { getUserData } from '@/services/auth/authApi';
import { setCurrentUser } from '@/store/features/authSlice';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function FitnessLayout(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { allCourses, isLoading } = useAppSelector((state) => state.workouts);
  const pathname = usePathname();
  const paramsCourse = useParams<{ course_id: string }>();
  const paramsWorkout = useParams<{ workout_id: string }>();
  const selectCourseId = localStorage.getItem('selectCourseId');

  useInitAuth();

  // Загрузка всех курсов
  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setErrorMessage(''));

    if (!allCourses.length) {
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
  }, [dispatch, allCourses]);

  // Загрузка данных о пользователе
  useEffect(() => {
    if (pathname.startsWith('/fitness/profile')) {
      dispatch(setErrorMessage(''));
      if (token) {
        dispatch(setIsLoading(true));
        const fetchUserData = async () => {
          return await getUserData(token);
        };
        fetchUserData()
          .then((res) => {
            if (res) {
              dispatch(setCurrentUser(res));
            } else {
              throw new Error();
            }
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
  }, [dispatch, pathname, token]);

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
    if (pathname.startsWith('/fitness/workouts') && !isLoading) {
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

  return (
    <div className="ml-[140px] mr-[140px] ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-[60px]">{props.children}</main>
    </div>
  );
}
