# 🎓 SkillBit - Learning Management System (LMS)

SkillBit is a **full-stack Learning Management System (LMS)** built using the MERN stack.
It provides an interactive platform for students to learn and for educators to create, manage, and monetize courses.

---

## 🚀 Project Status

* ✅ Frontend — **Completed**
* ✅ Backend (Node.js, Express, MongoDB) — **Completed**
* ✅ Authentication & Authorization — **Implemented (Clerk)**
* ✅ Payments Integration — **Implemented (Stripe)**
* ✅ Deployment — **Frontend & Backend live on Vercel**

---

## 🌐 Live Demo

🚀[https://skillbit-frontend.vercel.app/]

---

## 🧑‍🎓 Student Features

* 🏠 Home page with hero section and featured courses
* 📚 Browse and view course details
* 🎬 Video player for lectures
* ⭐ Course rating system
* 🔍 Search functionality
* 📦 My Enrollments page
* 📈 Track course progress
* 💳 Purchase courses via Stripe
* 🔔 Real-time notifications using React Toastify
* 📱 Fully responsive UI

---

## 👨‍🏫 Educator Features

* 📊 Dashboard with course analytics
* ➕ Create and manage courses
* 📝 Rich text editor (**Quill**) for descriptions
* 📚 Add chapters and lectures dynamically
* 🎥 Lecture management (title, duration, URL)
* 🆓 Free/paid lecture preview toggle
* 🖼️ Upload and manage course thumbnails using Cloudinary
* 👨‍🎓 View enrolled students

---

## ✨ Key Features

* 🔐 Authentication & role-based access (Student / Educator)
* 💳 Secure payments using Stripe
* 📡 RESTful APIs with Axios integration
* 📊 Course progress tracking
* ⚡ Serverless backend deployment using Vercel Functions
* ☁️ Media storage and optimization using Cloudinary
* 🎨 Modern UI with Tailwind CSS
* ♻️ Reusable component-based architecture
* 🌍 Deployed and accessible globally via Vercel

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Vite
* **State Management:** Context API
* **Backend:** Node.js, Express.js (Serverless via Vercel)
* **Database:** MongoDB (Mongoose)
* **Authentication:** Clerk
* **Payments:** Stripe
* **Media Storage:** Cloudinary
* **Editor:** Quill
* **HTTP Client:** Axios
* **Notifications:** React Toastify

---

## ⚙️ Deployment Architecture

* Frontend deployed on Vercel
* Backend APIs deployed as serverless functions on Vercel
* MongoDB Atlas used for database
* Clerk used for authentication and user management
* Stripe integrated for secure payments
* Cloudinary used for media storage

---

## ☁️ Media Handling

* Course thumbnails are uploaded and stored using Cloudinary
* Optimized image delivery for better performance
* Secure API-based upload handling from backend

---

## 📦 Installation & Setup

```bash
git clone https://github.com/sanyaaaa14/SkillBit.git

# Frontend
cd SkillBit/client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run server
```

---

## 📜 Available Scripts

### Frontend

```bash
npm run dev      # Start frontend (Vite)
```

### Backend

```bash
npm run server   # Start backend server
```

---

## 🔐 Environment Variables

Create a `.env` file in both **client** and **server** folders and add the following:

### 🌐 Frontend (`/client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=your_backend_api_url
VITE_CURRENCY=₹
```

### ⚙️ Backend (`/server/.env`)

```env
# App Config
CURRENCY=₹
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Cloudinary (Media Storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Stripe (Payments)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## 📁 Project Structure

```bash
SkillBit/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── student/
│   │   │   └── educator/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json

├── server/                 # Backend (Node.js + Express)
│   ├── configs/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   └── package.json

├── .gitignore
└── README.md
```

---

## 🔥 Highlights

* Built a **full-stack LMS with role-based authentication**
* Implemented **secure Stripe payment integration**
* Integrated **Cloudinary for media storage and optimization**
* Designed **scalable REST APIs with MongoDB**
* Developed **real-world educator & student workflows**
* Deployed a **production-ready application using Vercel**

---

## 👩‍💻 Author

**Sanya Bhatia**

* LinkedIn: https://www.linkedin.com/in/sanyabhatia/
* GitHub: https://github.com/sanyaaaa14
* Portfolio: https://sanyabhatia-portfolio.netlify.app/
