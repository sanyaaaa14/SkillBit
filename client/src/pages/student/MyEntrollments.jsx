import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import axios from "axios";


const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate, userData, fetchUserEnrolledCourses, backendURL, getToken, calculateNumberOfLectures } =
    useContext(AppContext);

  const [progressArray, setProgressArray] = useState([

  ]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendURL}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLectures = calculateNumberOfLectures(course);

          const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
          return { totalLectures, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);



    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData])

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses])

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
                      progressArray[index].totalLectures > 0 &&
                      progressArray[index].lectureCompleted >=
                      progressArray[index].totalLectures
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
