'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setErrorMessage, setIsLoading } from '@/store/features/workoutSlice';
import Button from '@/components/button/Button';
import WorkoutVideo from '@/components/video-player/VideoPlayer';
import ProgressPop from '@/components/popups/progess-pop/ProgressPop';
import CountProgressPop from '@/components/popups/count-progress-pop/CountProgressPop';
import { addProgress } from '@/services/fitness/fitnessApi';
import { RequestProgressData } from '@/shared-types/sharedTypes';

export default function WorkoutPage() {
  const dispatch = useAppDispatch();
  const {
    allCourses,
    progressByWorkout,
    selectedCourse,
    currentWorkout,
    isLoading,
  } = useAppSelector((state) => state.workouts);
  const { token } = useAppSelector((state) => state.auth);
  const [openProgressPop, setOpenProgressPop] = useState<boolean>(false);
  const [openCountProgressPop, setOpenCountProgressPop] =
    useState<boolean>(false);
  const [isStartedWorkout, setIsStartedWorkout] = useState<boolean>(false);
  const [successAddProgress, setSuccessAddProgress] = useState('');
  const [errorAddProgress, setErrorAddProgress] = useState('');
  const selectCourseId = selectedCourse;
  const course = allCourses.find((course) => course._id === selectCourseId);

  const { progressData } = progressByWorkout || {};
  const checkedProgressData = Array.isArray(progressData) ? progressData : [];
  const exercisesCount = currentWorkout?.exercises.length || 0;
  const isProgressMatching = checkedProgressData.length === exercisesCount;
  const totalComletedExrcises = progressData?.reduce((sum, i) => sum + i, 0);

  useEffect(() => {
    if (
      progressData?.length !== undefined &&
      totalComletedExrcises !== undefined
    ) {
      if (progressData?.length >= 0 && totalComletedExrcises >= 0) {
        setIsStartedWorkout(true);
      }
    }
  }, [progressData, totalComletedExrcises]);

  const onAddProgress = (progressData: RequestProgressData) => {
    if (token && currentWorkout?._id && course) {
      dispatch(setIsLoading(true));
      addProgress(token, course._id, currentWorkout?._id, progressData)
        .then((res) => {
          setSuccessAddProgress(res.message);
          console.log('result add progress data', res);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              const data = error.response.data;
              dispatch(setErrorMessage(data.message));
              setErrorAddProgress(data.message);
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
              );
            } else {
              setErrorMessage(
                'Неизвестная ошибка. Попробуйте перезагрузить страницу',
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
      setOpenProgressPop(false);
      setOpenCountProgressPop(!openCountProgressPop);
    }
  };

  const onOpenProgressPop = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setOpenProgressPop(!openProgressPop);
  };

  const onOverlayClick = () => {
    if (openProgressPop || openCountProgressPop) {
      setOpenProgressPop(false);
      setOpenCountProgressPop(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 items-center md:items-start mb-10 md:mb-[260px] ">
      <div className="flex flex-col items-start w-full">
        <h1 className="text-black text-[24px] md:text-[60px] font-medium leading-7 md:leading-[70px] ">
          {course?.nameRU}
        </h1>
      </div>

      <WorkoutVideo workoutSrc={currentWorkout?.video} />
      <div className="w-[343px] md:w-full p-[30px] md:p-10 rounded-[30px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white ">
        <h2 className="text-black text-[32px] font-normal leading-[38px] ">
          {currentWorkout?.name}
        </h2>
        <div className="flex flex-wrap gap-x-[60px] gap-y-5 mt-5 mb-10 ">
          {currentWorkout?.exercises.length === 0 ? (
            <p className=" text-black text-[17px] font-normal leading-[21px] ">
              Список упражнений по данной тренировке пуст
            </p>
          ) : (
            currentWorkout?.exercises.map((exercise, i) =>
              !isProgressMatching || i >= checkedProgressData.length ? (
                <div
                  key={exercise._id}
                  className="w-[283px] md:w-[320px] flex flex-col items-start gap-2.5"
                >
                  <p className="text-black text-[17px] font-normal leading-[21px]">{`${exercise.name} ${isLoading ? 'данные загружаются...' : '0%'} `}</p>
                  <div className="w-[283px] md:w-[320px] h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden ">
                    <div
                      className="h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ) : (
                (() => {
                  const progressCount = checkedProgressData[i];
                  const progressPercent = Math.min(
                    (progressCount / exercise.quantity) * 100,
                    100,
                  );
                  return (
                    <div
                      key={exercise._id}
                      className="w-[283px] md:w-[320px] flex flex-col items-start gap-2.5"
                    >
                      <p className="text-black text-[17px] font-normal leading-[21px] ">{`${exercise.name} (${progressCount}/${exercise.quantity})`}</p>
                      <div className="w-[283px] md:w-[320px] h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden">
                        <div
                          className="h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()
              ),
            )
          )}
        </div>
        {!isStartedWorkout ? (
          currentWorkout?.exercises.length === 0 ? (
            <Button
              onClick={onOpenProgressPop}
              className={`w-[283px] md:w-[320px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white ${isLoading ? 'cursor-wait' : 'cursor-none'}`}
            >
              Заполнить свой прогресс
            </Button>
          ) : (
            <Button
              onClick={onOpenProgressPop}
              className="w-[283px] md:w-[320px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white "
            >
              Заполнить свой прогресс
            </Button>
          )
        ) : (
          <Button
            onClick={onOpenProgressPop}
            className={`w-[283px] md:w-[320px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
          >
            Обновить свой прогресс
          </Button>
        )}
      </div>
      <div onClick={onOverlayClick}>
        {course && openProgressPop && (
          <ProgressPop
            progressData={checkedProgressData}
            onAddProgress={onAddProgress}
            course={course}
          />
        )}
        {openCountProgressPop && (
          <CountProgressPop
            errorResult={errorAddProgress}
            successResult={successAddProgress}
          />
        )}
      </div>
    </div>
  );
}
