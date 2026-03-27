import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";


const Navbar = () => {

  const {navigate,isEducator}= useContext(AppContext);


  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-40 border-b border-gray-400 py-0.5 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* Logo */}
      <img onClick={()=>navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-40 py-0 -my-2 cursor-pointer"
      />

      {/* ✅ Desktop View */}
      <div className="hidden md:flex items-center gap-6 text-gray-600">
        {/* Links (only when logged in) */}
        {user && (
          <div className="flex items-center gap-2 ">
            <button onClick={()=>{navigate('/educator')}} className="cursor-pointer">
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <span>|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}

        {/* Account/Login */}
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-cyan-800 text-white px-4 py-2 rounded-full text-sm"
          >
            Create Account
          </button>
        )}
      </div>

      {/* ✅ Mobile View */}
      <div className="md:hidden flex items-center gap-3 sm:gap-4 text-gray-600">
        {user ? (
          <>
            {/* Show buttons if logged in */}
            <Link to="/my-enrollments" className="text-sm font-medium">
              My Enrollments
            </Link>
             <button onClick={()=>{navigate('/educator')}}>
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="User Account"
              className="w-6 h-6"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
