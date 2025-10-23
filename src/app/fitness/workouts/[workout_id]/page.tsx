'use client';

import { useParams } from 'next/navigation';
import { courses, progress, workouts } from '@/data';
import Button from '@/components/button/Button';
import WorkoutVideo from '@/components/video-player/VideoPlayer';
import { useState } from 'react';
import ProgressPop from '@/components/popups/progess-pop/ProgressPop';
import CountProgressPop from '@/components/popups/count-progress-pop/CountProgressPop';

export default function WorkoutPage() {
  const params = useParams<{ workout_id: string }>();

  const [openProgressPop, setOpenProgressPop] = useState<boolean>(false);
  const [openCountProgressPop, setOpenCountProgressPop] =
    useState<boolean>(false);

  const workout = workouts.find((workout) => workout._id === params.workout_id);
  const course = courses.find((course) => course._id === params.workout_id);

  if (!workout) {
    console.log('Не удалось загрузить данные по тренировке');
  }

  const onOpenProgressPop = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setOpenProgressPop(!openProgressPop);
  };

  const onSaveProgress = () => {
    setOpenProgressPop(false);
    setOpenCountProgressPop(!openCountProgressPop);
  };

  const onOverlayClick = () => {
    if (openProgressPop || openCountProgressPop) {
      setOpenProgressPop(false);
      setOpenCountProgressPop(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-start mb-[260px] ">
      <h1 className="text-black text-[60px] font-medium leading-[70px] ">
        {course?.nameRU}
      </h1>
      <WorkoutVideo workoutSrc={workout?.video} />
      <div className="w-full p-10 rounded-[30px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white ">
        <h2 className="text-black text-[32px] font-normal leading-[38px] ">
          {workout?.name}
        </h2>
        <div className="flex flex-wrap gap-x-[60px] gap-y-[20px] pt-[20px] pb-[40px] ">
          {progress.map((item) => (
            <div
              key={item._id}
              className="w-[320px] flex flex-col items-start gap-[10px]"
            >
              <p className=" text-black text-[17px] font-normal leading-[21px] ">
                {` ${item.name} ${item.progress}%`}
              </p>
              <div className="w-[320px] h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden ">
                <div
                  className=" h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                  style={{ width: `${item?.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={onOpenProgressPop}
          className="w-[320px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white"
        >
          Заполнить свой прогресс
        </Button>
      </div>
      <div onClick={onOverlayClick}>
        {openProgressPop && <ProgressPop onSelect={() => onSaveProgress()} />}
        {openCountProgressPop && <CountProgressPop />}
      </div>
    </div>
  );
}
