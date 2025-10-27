'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { CourseType, RequestProgressData } from '@/shared-types/sharedTypes';
import { useAppSelector } from '@/store/store';

type ProgressPopProps = {
  progressData: number[];
  course: CourseType;
  onAddProgress: (progressData: RequestProgressData) => void;
};

export default function ProgressPop({
  progressData,
  onAddProgress,
}: ProgressPopProps) {
  const { currentWorkout, isLoading } = useAppSelector(
    (state) => state.workouts,
  );

  const [dataFieldProgress, setDataFieldProgress] = useState<number[]>([]);

  useEffect(() => {
    setDataFieldProgress(progressData);
  }, [progressData]);

  const onChangeDataProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newDataProgress = [...dataFieldProgress];

    const index = currentWorkout?.exercises.findIndex(
      (exercise) => exercise._id === name,
    );

    if (index !== -1 && index !== undefined) {
      if (value.trim() === '') {
        newDataProgress[index] = progressData[index];
      } else {
        newDataProgress[index] = Number(value);
      }
    }
    setDataFieldProgress(newDataProgress);
  };

  const dataToSend: RequestProgressData = {
    progressData: dataFieldProgress,
  };

  const onSaveProgress = () => {
    onAddProgress(dataToSend);
  };

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[426px] h-[596px] p-10 rounded-[30px] shadow-[0p_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white z-50"
      >
        <h2 className="text-black text-[32px]  font-normal leading-[38px]">
          Мой прогресс
        </h2>
        <div className="flex flex-col w-[346px] h-[347px] items-start gap-[20px] mt-[47px] mb-[34px] pr-5 workoutlist">
          {currentWorkout?.exercises.map((exercise, i) => (
            <div
              key={exercise._id}
              className="flex flex-col items-start gap-[10px] mb-[1px]"
            >
              <p className=" w-[320px] h-10 text-black text-[18px] font-normal leading-[19px] ">
                Сколько раз вы сделали {exercise.name.toLowerCase()}?
              </p>

              <Input
                onChange={onChangeDataProgress}
                id={exercise._id}
                name={exercise._id}
                value={String(dataFieldProgress[i] || 0)}
                type="number"
                placeholder={`${progressData[i] !== undefined ? progressData[i] : 0}`}
                className="w-[320px] h-[52px]"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={onSaveProgress}
          className={`w-[346px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
}
