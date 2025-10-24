import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { addCourse } from '@/services/fitness/fitnessApi';
import { setIsLoading } from '@/store/features/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useAddCourse = () => {
  const dispath = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const onAddCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    courseID: string,
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

  return { onAddCourse };
};
