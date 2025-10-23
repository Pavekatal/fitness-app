import axios from 'axios';
import {
  ResponseLoginType,
  ResponseMessageType,
  UserAuthType,
  UserForApiType,
} from '@/shared-types/sharedTypes';
import { BASE_URL } from '../constants';

export const registry = async (
  userData: UserAuthType,
): Promise<ResponseMessageType> => {
  return await axios
    .post(BASE_URL + '/auth/register', userData, {
      headers: { 'Content-Type': '' },
    })
    .then((res) => {
      return res.data;
    });
};

export const login = async (
  userData: UserAuthType,
): Promise<ResponseLoginType> => {
  return await axios
    .post(BASE_URL + '/auth/login', userData, {
      headers: { 'Content-Type': '' },
    })
    .then((res) => {
      return res.data;
    });
};

export const getUserData = async (token: string): Promise<UserForApiType> => {
  return await axios(BASE_URL + '/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data.user;
  });
};
