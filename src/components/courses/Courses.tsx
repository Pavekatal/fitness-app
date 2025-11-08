'use client';

import { useAppSelector } from '@/store/store';
import Course from '../course/Course';

export default function Courses() {
  const { allCourses } = useAppSelector((state) => state.workouts);

  return (
    <div className="mb-6 md:mb-[34px] flex flex-col items-center md:flex-row md:flex-wrap gap-6 md:gap-10">
      {allCourses.map((course) => (
        <Course key={course._id} course={course} />
      ))}
    </div>
  );
}
