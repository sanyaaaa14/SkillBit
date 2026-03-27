import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl font-semibold text-gray-800'>Learn Anything , anytime, anywhere </h1>
      <p className='text-gray-800 sm:text-sm'>Access expert-led courses, grow at your pace, and unlock endless learning opportunities from any place you choose.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-cyan-900'>Get Started</button>
        <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
