import { UserAuthType } from '@/shared-types/sharedTypes';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const registry = async (
  userData: UserAuthType,
): Promise<UserAuthType> => {
  return await axios
    .post(BASE_URL + '/auth/register', userData, {
      headers: { 'Content-Type': '' },
    })
    .then((res) => {
      console.log('res.data.result:', res.data.result);
      return res.data.result;
    });
};

export const login = async (userData: UserAuthType): Promise<UserAuthType> => {
  return await axios
    .post(BASE_URL + '/auth/login', userData, {
      headers: { 'Content-Type': '' },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
