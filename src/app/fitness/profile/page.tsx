'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/button/Button';
import Course from '@/components/course/Course';
import { courses, users, usersTest } from '@/data';
import WorkoutPop from '@/components/popups/workout-pop/WorkoutPop';

export default function ProfilePage() {
  const [openWorkoutPop, setOpenWorkoutPop] = useState(false);

  const userID = '1';
  const currentUser = usersTest.find((user) => userID === user._id);
  const coursesUser = courses.filter((course) =>
    currentUser?.selectedCourses.includes(course._id),
  );

  const onWorkoutPop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenWorkoutPop(!openWorkoutPop);
  };

  const onOverlayClick = () => {
    if (openWorkoutPop) {
      setOpenWorkoutPop(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-15">
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[47px]">
            Профиль
          </h2>
          <div className="mt-7.5 w-full h-[257px] p-7.5 rounded-[30px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white flex gap-[33px] items-start">
            <Image
              width={197}
              height={197}
              src="/img/profile-page.png"
              alt="avatar user"
            />
            <div className="flex flex-col items-start gap-11">
              <div className="flex flex-col gap-7.5 items-start">
                <h3 className="text-black text-[32px] font-medium leading-[38px]">
                  {users[0].name}
                </h3>
                <p className="text-black text-lg font-normal leading-[21px] ">
                  Логин: {users[0].login}
                </p>
              </div>
              <Button className="w-[192px] px-6.5 py-4 border border-solid border-black text-black text-lg font-normal leading-[21px]">
                Выйти
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[47px]">
            Мои курсы
          </h2>
          <div className="mt-10 mb-[280px] flex flex-wrap gap-10">
            {coursesUser.map((course) => (
              <Course
                onWorkoutPop={onWorkoutPop}
                key={course._id}
                course={course}
              />
            ))}
          </div>
        </div>
      </div>
      <div onClick={onOverlayClick}>{openWorkoutPop && <WorkoutPop />}</div>
    </div>
  );
}
