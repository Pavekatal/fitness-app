import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { UserForApiType } from '@/shared-types/sharedTypes';
import { setCurrentUser, setToken } from '@/store/features/authSlice';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const dataUserFromLS = localStorage.getItem('user');

    let currentUser: UserForApiType = {
      email: '',
      _id: '',
      courseProgress: [],
      selectedCourses: [''],
    };

    if (dataUserFromLS) {
      currentUser = JSON.parse(dataUserFromLS);
      dispatch(setCurrentUser(currentUser));
    }

    dispatch(setToken(token));
  }, [dispatch]);
};
