import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  CourseType,
  ProgressTypeOfCourse,
  ProgressTypeOfWorkout,
  RequestIdCourse,
  RequestProgressData,
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
    },
  }).then((res) => {
    return res.data;
  });
};

export const getWorkout = async (workoutId: string, token: string) => {
  return await axios(BASE_URL + `/workouts/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getProgressByWorkout = async (
  token: string,
  courseId: string,
  workoutID: string,
): Promise<ProgressTypeOfWorkout> => {
  return await axios(
    BASE_URL + `/users/me/progress?courseId=${courseId}&workoutId=${workoutID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => {
    return res.data;
  });
};

export const getProgressByCourse = async (
  courseId: string,
  token: string,
): Promise<ProgressTypeOfCourse> => {
  return await axios(BASE_URL + `/users/me/progress?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log('Progress of course from api:', res.data);
    return res.data;
  });
};

export const addProgress = async (
  token: string,
  courseId: string,
  workoutId: string,
  progressData: RequestProgressData,
): Promise<ResponseMessageType> => {
  return await axios
    .patch(
      BASE_URL + `/courses/${courseId}/workouts/${workoutId}`,
      progressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': '',
        },
      },
    )
    .then((res) => {
      console.log('add progress from api:', res.data);
      return res.data;
    });
};

export const deleteProgress = async (
  token: string,
  courseId: string,
  workoutId: string,
): Promise<ResponseMessageType> => {
  return await axios
    .patch(
      BASE_URL + `/courses/${courseId}/workouts/${workoutId}/reset`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': '',
        },
      },
    )
    .then((res) => {
      console.log('Res from delete progress api:', res.data);
      return res.data;
    });
};
