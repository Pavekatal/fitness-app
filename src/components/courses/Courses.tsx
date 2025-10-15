import { courses } from '@/data';
import Course from '../course/Course';

export default function Courses() {
  return (
    <div className="mt-[50px] mb-[34px] flex flex-wrap gap-[40px]">
      {courses.map((course) => (
        <Course key={course._id} course={course} />
      ))}
    </div>
  );
}
