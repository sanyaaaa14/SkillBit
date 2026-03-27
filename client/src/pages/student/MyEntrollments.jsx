import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 10 },
    { lectureCompleted: 5, totalLectures: 12 },
    { lectureCompleted: 1, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 6, totalLectures: 15 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 7, totalLectures: 9 },
    { lectureCompleted: 10, totalLectures: 20 },
    { lectureCompleted: 0, totalLectures: 5 },
    { lectureCompleted: 8, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 9, totalLectures: 12 },
    { lectureCompleted: 4, totalLectures: 4 },
  ]);

  return (
    <>
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <table className="md:table-auto table-fixed w-full border mt-10">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold">Course</th>
            <th className="px-4 py-3 font-semibold max-sm:hidden">Duration</th>
            <th className="px-4 py-3 font-semibold max-sm:hidden">Completed</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-b border-gray-200">
              {/* Course Column */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt="course"
                    className="w-14 sm:w-24 md:w-28 rounded"
                  />
                  <p className="max-sm:text-sm font-medium">
                    {course.courseTitle}
                  </p>
                </div>

                <div className="flex-1 mt-2">
                  <Line
                    strokeWidth={2}
                    percent={
                      progressArray[index]
                        ? (progressArray[index].lectureCompleted * 100) /
                          progressArray[index].totalLectures
                        : 0
                    }
                    strokeColor="#155e75" // cyan-800
                    trailColor="#e5e7eb"
                    strokeLinecap="round"
                    className="bg-gray-300 rounded-full"
                  />
                </div>
              </td>

              {/* Duration */}
              <td className="px-4 py-3 max-sm:hidden">
                {calculateCourseDuration(course)}
              </td>

              {/* Completed */}
              <td className="px-4 py-3 max-sm:hidden">
                {progressArray[index] &&
                  `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}{" "}
                <span className="text-gray-500">Lectures</span>
              </td>

              {/* Status */}
              <td className="px-4 py-3 max-sm:text-right">
                <button
                  className="px-3 sm:px-5 py-1.5 sm:py-2 bg-cyan-800 max-sm:text-xs text-white"
                  onClick={() => navigate("/player/" + course._id)}
                >
                  {progressArray[index] &&
                  progressArray[index].lectureCompleted /
                    progressArray[index].totalLectures ===
                    1
                    ? "Completed"
                    : "On Going"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
};

export default MyEnrollments;
