import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendURL,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useContext(AppContext);

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const getYouTubeId = (url) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

  const getCourseData = () => {
    if (!userData) return;

    const course = enrolledCourses.find((c) => c._id === courseId);

    if (course) {
      setCourseData(course);

      const ratingObj = course.courseRatings.find(
        (item) => item.userId === userData._id
      );

      if (ratingObj) {
        setInitialRating(ratingObj.rating);
      }
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0 && userData) {
      getCourseData();
    }
  }, [enrolledCourses, userData]);

  const markLectureComplete = async (lectureId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">

        {/* LEFT SIDE */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2  rounded">

                {/* HEADER */}
                <div
                  className="flex items-center justify-between px-4 py-4 cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className={`transition-transform ${openSections[index] ? "rotate-180" : ""
                        }`}
                      src={assets.down_arrow_icon}
                      alt=""
                    />
                    <p>{chapter.chapterTitle}</p>
                  </div>

                  <p>
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>
                <div className="border-t border-gray-300"></div>

                {/* CONTENT */}
                <div
                  className={`transition-all ${openSections[index] ? "max-h-screen" : "max-h-0"
                    } overflow-hidden`}
                >
                  <ul className="pl-4 py-2 px-5">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex justify-between py-2">

                        <div className="flex gap-2 items-center">
                          <img
                            src={
                              progressData?.lectureCompleted?.includes(
                                lecture.lectureId
                              )
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            className="w-4 h-4"
                            alt=""
                          />
                          <p>{lecture.lectureTitle}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          {lecture.lectureUrl && (
                            <p
                              onClick={() =>
                                setPlayerData({
                                  ...lecture,
                                  chapter: index + 1,
                                  lecture: i + 1,
                                })
                              }
                              className="cursor-pointer text-cyan-800  "
                            >
                              Watch
                            </p>
                          )}
                          <p>{lecture.lectureDuration} min</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={getYouTubeId(playerData.lectureUrl)}
                iframeClassName="w-full aspect-video"
              />

              <div className="flex justify-between items-center mt-3 p-4 border rounded-lg bg-gray-50">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>

                <button
                  onClick={() =>
                    markLectureComplete(playerData.lectureId)
                  }
                  className="text-cyan-800 cursor-pointer"
                >
                  {progressData?.lectureCompleted?.includes(
                    playerData?.lectureId
                  )
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;