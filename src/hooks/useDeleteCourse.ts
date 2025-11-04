'use client';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteCourse } from '@/services/fitness/fitnessApi';
import { setIsLoading } from '@/store/features/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useUserData } from './useUserData';

export const useDeleteCourse = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { fetchUserData } = useUserData();

  const onDeleteCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    courseId: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (token) {
      dispatch(setIsLoading(true));
      deleteCourse(courseId, token)
        .then((res) => {
          toast.success(res.message);
          fetchUserData(token);
          //   window.location.reload();
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(error.response.data);
            } else if (error.request) {
              toast.error(
                'Похоже, что-то с интернет-соединением. Попробуйте позже',
              );
            } else {
              toast.error(
                'Неизвестная ошибка. Попробуйте перезагрузить страницу',
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };

  return { onDeleteCourse };
};
