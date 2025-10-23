import axios from 'axios';
import { BASE_URL } from '../constants';
import { CourseType } from '@/shared-types/sharedTypes';

export const getAllCourses = async (): Promise<CourseType[]> => {
  return await axios(BASE_URL + '/courses').then((res) => {
    return res.data;
  });
};

export const getCourse = async (course_id: string): Promise<CourseType> => {
  return await axios(BASE_URL + `/courses/${course_id}`).then((res) => {
    console.log('course by id:', res.data);
    return res.data;
  });
};
