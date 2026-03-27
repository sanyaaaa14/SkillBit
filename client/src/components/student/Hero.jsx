import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div
      className='flex flex-col items-center justify-center w-full 
                 pt-20 md:pt-36 
                 px-7 md:px-0 space-y-7 text-center 
                 bg-gradient-to-b from-cyan-100/70 to-white'
    >
      <h1
        className='md:text-home-heading-large text-home-heading-small 
                   relative font-bold text-gray-800 max-w-4xl mx-auto leading-tight'
      >
        Advance your career path with skills designed 
        <span className='text-cyan-800'>
          {' '}for today’s&nbsp;demands.
        </span>

        <img
          src={assets.sketch}
          alt="sketch"
          className='absolute -bottom-7 right-0 md:block hidden'
        />
      </h1>

      {/* DESKTOP P TAG */}
      <p className='hidden md:block text-gray-500 max-w-2xl mx-auto'>
        Our curated learning paths, combined with hands-on projects, transform your ambition into tangible professional results.
      </p>

      {/* MOBILE P TAG */}
      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
        Structured paths and projects turn ambition into professional results.
      </p>

      <SearchBar/>
    </div>
  )
}

export default Hero
