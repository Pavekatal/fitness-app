import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  CourseType,
  RequestIdCourse,
  ResponseMessageType,
} from '@/shared-types/sharedTypes';

export const getAllCourses = async (): Promise<CourseType[]> => {
  return await axios(BASE_URL + '/courses').then((res) => {
    return res.data;
  });
};

export const getCourse = async (course_id: string): Promise<CourseType> => {
  return await axios(BASE_URL + `/courses/${course_id}`).then((res) => {
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
      console.log('data from add course:', res.data);
      return res.data;
    });
};
