'use client';

import { addCourse } from '@/services/fitness/fitnessApi';
type OnAddCourseType = {
  courseID: string;
  token: string;
};

export const onAddCourse = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  { courseID, token }: OnAddCourseType,
) => {
  e.stopPropagation();
  e.preventDefault();

  const courseId = { courseId: courseID };

  if (token) {
    dispath(setIsLoading(true));
    addCourse(courseId, token)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            toast.error(error.response.data);
          } else if (error.request) {
            toast.error(
              'Похоже, что-то с интернет-соединением. Попробуйте позже',
            );
          } else {
            toast.error(
              'Неизвестная ошибка. Попробуйте перезагрузить страницу',
            );
          }
        }
      })
      .finally(() => {
        dispath(setIsLoading(false));
      });
  } else {
    toast.info('Войдите, чтобы добавить курс');
  }
};
