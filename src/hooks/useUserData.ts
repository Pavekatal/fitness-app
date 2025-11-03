'use client';

import { AxiosError } from 'axios';

import { getUserData } from '@/services/auth/authApi';
import { setCurrentUser } from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { setErrorMessage, setIsLoading } from '@/store/features/workoutSlice';

export const useUserData = () => {
  const dispatch = useAppDispatch();

  const fetchUserData = async (token: string) => {
    return await getUserData(token)
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
  };

  return { fetchUserData };
};
