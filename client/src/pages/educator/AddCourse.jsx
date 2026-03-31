import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCourse = () => {

  const { backendURL, getToken } = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false); // ✅ fixed typo
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  // ---------------- CHAPTER HANDLER ----------------
  const handleChapter = (action, chapterId) => {

    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters.slice(-1)[0].chapterOrder + 1
              : 1,
        };

        setChapters([...chapters, newChapter]);
      }

    } else if (action === 'remove') {

      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );

    } else if (action === 'toggle') {

      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  // ---------------- LECTURE HANDLER ----------------
  const handleLecture = (action, chapterId, lectureIndex) => {

    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);

    } else if (action === 'remove') {

      // ✅ fixed mutation issue
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, i) => i !== lectureIndex
              ),
            }
            : chapter
        )
      );
    }
  };

  // ---------------- ADD LECTURE ----------------
  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };

          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );


    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail not selected")
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)

      const token = await getToken()
      const { data } = await axios.post(backendURL + '/api/educator/add-course', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  // ---------------- QUILL INIT ----------------
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>

        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Description */}
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef} />
        </div>

        {/* Price + Thumbnail */}
        <div className="flex items-center justify-between flex-wrap">

          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <p>Course Thumbnail</p>

            <label htmlFor="thumbnailImage" className="flex items-center gap-3">

              <img
                src={assets.file_upload_icon}
                className="p-3 bg-cyan-800 rounded cursor-pointer"
                alt=""
              />

              <input
                type="file"
                id="thumbnailImage"
                onChange={e => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />

              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={e => setDiscount(e.target.value)}
            value={discount}
            type="number"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Chapters */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-white border rounded-lg mb-4">

              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <img onClick={() => handleChapter('toggle', chapter.chapterId)} src={assets.dropdown_icon} width={14} alt="dropdown_icon" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} />
                <span className="font-semibold">
                  {chapterIndex + 1} {chapter.chapterTitle}
                </span>

                <div className="flex items-center gap-3">
                  <span>{chapter.chapterContent.length} Lectures</span>

                  <img
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    src={assets.cross_icon}
                    className='cursor-pointer'
                    alt=""
                  />
                </div>
              </div>


              {/* Lecture Section */}
              {!chapter.collapsed && (
                <div className="p-4">

                  <div className="flex flex-col gap-2">
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className="flex justify-between items-center">
                        <div
                          key={lectureIndex}
                          className="flex items-center justify-between w-full text-sm"
                        >

                          {/* LEFT SIDE */}
                          <div className="flex-1 min-w-0">
                            <p className="truncate">
                              {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                              <span className="text-gray-500">
                                {lecture.lectureDuration} mins
                              </span>{" "}
                              -{" "}
                              <a
                                href={lecture.lectureUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Link
                              </a>{" "}
                              -{" "}
                              <span
                                className={`font-medium ${lecture.isPreviewFree ? "text-cyan-800" : "text-cyan-800"
                                  }`}
                              >
                                {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                              </span>
                            </p>
                          </div>

                          {/* RIGHT SIDE */}
                          <div className="flex-shrink-0 ml-3">
                            <img
                              src={assets.cross_icon}
                              alt="delete"
                              onClick={() =>
                                handleLecture("remove", chapter.chapterId, lectureIndex)
                              }
                              className="cursor-pointer"
                            />
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="inline-flex bg-gray-100 px-3 py-1.5 rounded cursor-pointer mt-3"
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>

                </div>
              )}
            </div>
          ))}

          {/* Add Chapter */}
          <div
            className='flex justify-center items-center bg-cyan-100 p-2 rounded-lg cursor-pointer'
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

              <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">

                {/* Close Button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Add Lecture
                </h2>

                {/* Lecture Title */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Lecture Title</p>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Duration */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Duration (minutes)</p>
                  <input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* URL */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Lecture URL</p>
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  <p className="text-sm text-gray-600">Is Preview Free?</p>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full bg-cyan-800 hover:bg-cyan-600 text-white py-2 rounded-md transition cursor-pointer"
                >
                  Add
                </button>

              </div>
            </div>
          )}

        </div>

        <button type='submit' className='bg-black text-white px-6 py-2 rounded cursor-pointer'>
          ADD COURSE
        </button>

      </form>

    </div>
  )
}

export default AddCourse