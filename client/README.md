# 🚀 SkillBit - Learning Management System (LMS)

SkillBit is a full-stack Learning Management System (LMS) being built using the MERN stack.  
It is designed to provide an interactive platform for students to learn and for educators to manage courses.

---

## 📌 Project Status

- ✅ Student Dashboard Frontend — **Completed**
- 🚧 Educator Dashboard Frontend — **In Progress (Structure Ready)**
- ⏳ Backend (Node.js, Express, MongoDB) — **Not Started Yet**
- 🔐 Authentication — **Implemented using Clerk**

---

## 🧑‍🎓 Student Dashboard (Completed)

The student-facing side of the application is fully developed with the following features:

- 🏠 Home page with hero section and featured courses
- 📚 Course listing and detailed course view
- 🎬 Video player for lectures
- ⏱️ Lecture duration tracking
- ⭐ Course rating system
- 🔍 Search functionality
- 📦 My Enrollments page
- 📱 Fully responsive UI

### 📂 Key Pages

- `pages/student/Home.jsx`
- `pages/student/CoursesList.jsx`
- `pages/student/CourseDetails.jsx`
- `pages/student/Player.jsx`
- `pages/student/MyEnrollments.jsx`

---

## 👨‍🏫 Educator Dashboard

The structure for the educator dashboard is ready, and frontend development is currently in progress.

### 📂 Available Pages (Structure Created)

- `pages/educator/Dashboard.jsx`
- `pages/educator/AddCourse.jsx`
- `pages/educator/MyCourses.jsx`
- `pages/educator/StudentsEnrolled.jsx`

### 🔄 Upcoming Features

- Add and manage courses
- View enrolled students
- Dashboard analytics

---

## 🧩 Component Structure

### Student Components

- Navbar
- Hero Section
- CourseCard
- CourseSection
- SearchBar
- Rating Component
- Testimonials Section
- CallToAction
- Footer

### Educator Components

- Navbar
- Sidebar
- Footer

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **State Management:** Context API
- **Authentication:** Clerk
- **Backend (Planned):** Node.js, Express.js
- **Database (Planned):** MongoDB
- **Payments (Planned):** Stripe

---

## 🔐 Authentication

User authentication and authorization are implemented using **Clerk**, enabling secure login and user session handling.

---

## 🔄 Future Scope

- Backend API development
- Database integration with MongoDB
- Stripe payment gateway integration
- Course purchase and enrollment system
- Progress tracking system
- Role-based access (Student / Educator)
- Deployment (Frontend + Backend)

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/sanyaaaa14/SkillBit.git
cd SkillBit
npm install
npm run dev 
```
---

## 📁 Project Structure
```bash
src/
├── assets/
├── components/
│ ├── student/
│ └── educator/
├── pages/
│ ├── student/
│ └── educator/
├── context/
├── App.jsx
├── main.jsx
```

---

## 👩‍💻 Author

**Sanya Bhatia**

- LinkedIn: https://www.linkedin.com/in/sanyabhatia/
- GitHub: https://github.com/sanyaaaa14