import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react"
import axios from "axios";
import { toast } from "react-toastify";



export const AppContext = createContext();


export const AppProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth()
  const { user } = useUser()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  //Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/course/all');
      if (data.success) {
        setAllCourses(data.courses);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  //fetch user Data
  const fetchUserData = async () => {
    if (user.publicMetadata.role === 'educator') {
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(backendURL + '/api/user/data', { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setUserData(data.user);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Funtion to calculate average rating of course
  const calculateAverageRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating;
    })
    return Math.floor(totalRating / course.courseRatings.length);
  }
  //Function to calculate course chapter time 
  const calculateChapterTime = (chapter) => {
    // Implementation for calculating chapter time
    let time = 0;
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  }
  //Function to calculate course duration 
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  }
  //Function to calculate number of lectures in the course
  const calculateNumberOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  //Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendURL + '/api/user/enrolled-courses', { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchAllCourses();
    
  }, []);

  // const logToken = async () => {
  //   console.log(await getToken({ template: "backend" })); // ✅ updated
  // };

  useEffect(() => {
    if (user) {
      // logToken()
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user])

  const value = { currency, allCourses, navigate, calculateAverageRating, isEducator, setIsEducator, calculateChapterTime, calculateCourseDuration, calculateNumberOfLectures, enrolledCourses, fetchUserEnrolledCourses, backendURL, userData, setUserData, getToken, fetchAllCourses };



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

