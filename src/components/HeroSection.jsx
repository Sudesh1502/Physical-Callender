import React from 'react';
import { format } from 'date-fns';
import heroImage from '../assets/hero_mountains.png';

export default function HeroSection({ currentMonth, activeDate }) {
  const displayDate = new Date();

  return (
    <div className="relative h-64 md:h-72 w-full bg-white z-10 rounded-t-3xl overflow-hidden">

     
      <img
        src={heroImage}
        alt="Calendar Hero Theme"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-900/30" />

     
      <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden" style={{ transform: 'translateY(1px)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto drop-shadow-sm">
          
          <path fill="#ffffff" fillOpacity="1" d="M0,160L80,181.3C160,203,320,245,480,240C640,235,800,181,960,160C1120,139,1280,149,1360,154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      <div className="absolute inset-x-0 inset-y-6 md:inset-y-10 px-8 md:px-12 pointer-events-none flex justify-between items-start">

        <div className="text-white drop-shadow-md mt-4">
          <p className="text-3xl md:text-5xl font-bold">{format(displayDate, 'dd')}</p>
          <p className="text-lg md:text-xl font-light">{format(displayDate, 'EEEE')}</p>
        </div>

    
        <div className="text-white text-right drop-shadow-md mt-4">
          <p className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">{format(currentMonth, 'MMM')}</p>
          <p className="text-xl md:text-3xl font-light opacity-90 tracking-widest">{format(currentMonth, 'yyyy')}</p>
        </div>
      </div>
    </div>
  );
}
