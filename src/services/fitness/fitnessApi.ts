import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  CourseType,
  RequestIdCourse,
  ResponseMessageType,
  WorkoutType,
} from '@/shared-types/sharedTypes';

export const getAllCourses = async (): Promise<CourseType[]> => {
  return await axios(BASE_URL + '/courses').then((res) => {
    return res.data;
  });
};

export const getCourse = async (courseId: string): Promise<CourseType> => {
  return await axios(BASE_URL + `/courses/${courseId}`).then((res) => {
    return res.data;
  });
};

export const getAllWorkouts = async (
  courseId: string,
  token: string,
): Promise<WorkoutType[]> => {
  return await axios(BASE_URL + `/courses/${courseId}/workouts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': '',
    },
  }).then((res) => {
    console.log('All workouts from api:', res.data);
    return res.data;
  });
};

export const addCourse = async (
  courseId: RequestIdCourse,
  token: string,
): Promise<ResponseMessageType> => {
  return await axios
    .post(BASE_URL + '/users/me/courses', courseId, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': '',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const deleteCourse = async (
  courseId: string,
  token: string,
): Promise<ResponseMessageType> => {
  return await axios
    .delete(BASE_URL + `/users/me/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': '',
      },
    })
    .then((res) => {
      console.log('Response data from delete api:', res.data);
      return res.data;
    });
};
