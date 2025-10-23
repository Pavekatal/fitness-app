import { UserAuthType } from '@/shared-types/sharedTypes';
import axios from 'axios';
import { BASE_URL } from '../constants';

type ResponseRegistryType = {
  message: string;
};

export const registry = async (
  userData: UserAuthType,
): Promise<ResponseRegistryType> => {
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
