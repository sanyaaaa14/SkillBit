import { clerkClient } from '@clerk/clerk-sdk-node'
import Course from '../models/Course.js';
import {v2 as cloudinary} from 'cloudinary'
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';



export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = req.auth();

    console.log("UserId:", userId);

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      }
    });

    res.json({ success: true, message: 'You can publish a course now' });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//ADD NEW COURSE
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;

    console.log("BODY:", req.body);
console.log("FILE:", req.file);
    const imageFile = req.file;
    const { userId: educatorId } = req.auth(); // ✅ FIXED

    if (!imageFile) {
      return res.json({ success: false, message: 'Thumbnail Not Attached' });
    }

    const parsedCourseData = await JSON.parse(courseData); // ✅ FIXED
    parsedCourseData.educator = educatorId;

    // Upload image first
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // Create course
    const newCourse = await Course.create({
      ...parsedCourseData,
      courseThumbnail: imageUpload.secure_url,
    });

    res.json({
      success: true,
      message: 'Course Added Successfully',
      courseId: newCourse._id
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const { userId: educator } = req.auth();

    const courses = await Course.find({ educator });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};