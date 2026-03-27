import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 ">
        <div className="flex flex-col md:items-start items-center w-full">
          <img className="w-45 h-30 -mt-5" src={assets.logo_dark} alt="logo" />
          <p className="mt-2  text-center md:text-left text-sm text-white/80">
            SkillBit is a modern learning platform designed to help students and
            professionals build real-world skills through structured courses,
            expert guidance, and hands-on learning experiences. Our mission is
            to make quality education accessible, practical, and engaging for
            everyone.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80">The latest news, articles, and resources delivered to your inbox.</p>
        
        <div className="flex items-center gap-2 pt-4">
          <input type="email" placeholder="Your email address" className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" />
          <button className="bg-cyan-800 text-white w-24 h-9 px-4 py-2 rounded ml-2">Subscribe</button>
        </div>
      </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        © 2026 SkillBit. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
