'use client';

import { useAppSelector } from '@/store/store';
import Course from '../course/Course';

export default function Courses() {
  const { allCourses } = useAppSelector((state) => state.workouts);

  return (
    <div className="mt-[50px] mb-[34px] flex flex-wrap gap-[40px]">
      {allCourses.map((course) => (
        <Course key={course._id} course={course} />
      ))}
    </div>
  );
}
