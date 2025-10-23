import axios from 'axios';
import {
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
      console.log('res.data:', res);
      return res.data;
    });
};

type ResponseLoginType = {
  token: string;
};

export const login = async (
  userData: UserAuthType,
): Promise<ResponseLoginType> => {
  return await axios
    .post(BASE_URL + '/auth/login', userData, {
      headers: { 'Content-Type': '' },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const getUserData = async (token: string): Promise<UserForApiType> => {
  return await axios(BASE_URL + '/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log('User data from api file:', res.data.user);
    return res.data.user;
  });
};
