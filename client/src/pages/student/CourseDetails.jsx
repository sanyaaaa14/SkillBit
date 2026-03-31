import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateAverageRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
    currency,
    backendURL,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/course/" + id
      );

      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn("Login to Enroll");
      if (isAlreadyEnrolled) return toast.warn("Already Enrolled");

      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/purchase",
        { courseId: courseData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(
        userData.enrolledCourses.includes(courseData._id)
      );
    }
  }, [userData, courseData]);

  if (!courseData) return <Loading />;

  const rating = calculateAverageRating(courseData);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-10 relative px-4 md:px-36 md:pt-16 pt-10 max-w-full mx-auto justify-between">

        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/80 via-cyan-50 to-white"></div>

        {/* LEFT */}
        <div className="max-w-xl  relative z-10 text-gray-500">

          <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>

          <p
            className="pt-4 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription?.slice(0, 200),
            }}
          />

          {/* Ratings */}
          <div className="flex items-center gap-2 pt-3 text-sm">
            <p className="text-yellow-600 font-medium">{rating}</p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-cyan-800">
              ({courseData.courseRatings.length} ratings)
            </p>

            <p>
              {courseData.enrolledStudents.length} students
            </p>
          </div>

          <p className="text-sm mt-1">
            Course by{" "}
            <span className="text-cyan-800 underline">
              {courseData.educator.name}
            </span>
          </p>

          {/* COURSE STRUCTURE */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="bg-white mb-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md"
                >
                  {/* HEADER */}
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleSection(index)}
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-start gap-3">
                      <img
                        className={`w-4 h-4 mt-2 transition-transform ${openSections[index] ? "rotate-180" : ""
                          }`}
                        src={assets.down_arrow_icon}
                        alt="arrow"
                      />

                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                          {chapter.chapterTitle}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {chapter.chapterContent.length} lectures •{" "}
                          {calculateChapterTime(chapter)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${openSections[index]
                        ? "max-h-[500px]"
                        : "max-h-0"
                      }`}
                  >
                    <ul className="pl-5 pr-5 py-3 bg-gray-50 border-t border-gray-200">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 py-2 hover:bg-white px-2 rounded transition"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play"
                            className="w-4 h-4 mt-1 opacity-70"
                          />

                          <div className="flex items-center justify-between w-full gap-4">

                            {/* LEFT: TITLE */}
                            <p className="text-gray-800 text-sm leading-snug">
                              {lecture.lectureTitle}
                            </p>

                            {/* RIGHT: ACTIONS */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 whitespace-nowrap">

                              {lecture.isPreviewFree && (
                                <span
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl.split("/").pop(),
                                    })
                                  }
                                  className="text-cyan-700 font-medium cursor-pointer hover:underline"
                                >
                                  Preview
                                </span>
                              )}

                              <span>{lecture.lectureDuration} min</span>
                            </div>

                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="py-20 text-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="max-w-[420px] z-10 shadow-lg rounded overflow-hidden bg-white">

          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="Course"
              className="w-full"
            />
          )}

          <div className="p-5">

            <p className="text-red-500 text-sm">
              <span className="font-medium">5 days</span> left at this price!
            </p>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-3xl font-semibold text-gray-800">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>

              <p className="text-gray-500">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center gap-4 pt-3 text-sm text-gray-500">
              <p>⭐ {rating}</p>
              <p>{calculateCourseDuration(courseData)}</p>
              <p>{calculateNumberOfLectures(courseData)} lessons</p>
            </div>

            <button
              onClick={enrollCourse}
              className="mt-5 w-full py-3 rounded bg-cyan-800 text-white font-medium hover:bg-cyan-900 transition cursor-pointer"
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="text-lg font-medium text-gray-800">
                What's in the Course?
              </p>

              <ul className="ml-4 pt-2 text-sm list-disc text-gray-500 space-y-1">
                <li>Unlimited access with updates</li>
                <li>Hands-on guided learning</li>
                <li>Downloadable materials</li>
                <li>Interactive quizzes</li>
                <li>Certificate on completion</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;