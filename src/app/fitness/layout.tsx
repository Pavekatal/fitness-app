import { ReactNode } from 'react';

import Header from '@/components/header/Header';
import FetchingCourses from '@/components/fetchs/fetching-courses/FetchingCourses';
import FetchingCourse from '@/components/fetchs/fetching-course/FetchingCourse';
import FetchingUser from '@/components/fetchs/fetching-user/FetchingUser';
import FetchingWorkoutAndProgress from '@/components/fetchs/fetching-workout/FetchingWorkout';
import InitAuthAndClearError from '@/components/initial-clear/InitAuthAndClearError';

export default function FitnessLayout(props: { children: ReactNode }) {
  return (
    <div className="max-w-[1160px] mx-auto ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-10 md:mt-[60px]">
        <InitAuthAndClearError />
        <FetchingCourses />
        <FetchingCourse />
        <FetchingUser />
        <FetchingWorkoutAndProgress />
        {props.children}
      </main>
    </div>
  );
}
