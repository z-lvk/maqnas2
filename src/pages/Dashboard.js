// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import backgroundImage from '../assets/background.jpg';
import personImage from '../assets/person.png';

const categories = [
  { ar: 'مقناص محمية المرزوم', en: 'Marzoom Reserve Maqnas' },
  { ar: 'مقناص منقوليا',       en: 'Mongolia Maqnas' },
  { ar: 'مقناص تلال العين',     en: 'Al Ain Hills Maqnas' }
];

export default function Dashboard() {
  const { user } = useAuth();
  const uploaderEmail = 'karimsahib@gmail.com';
  const isUploader = user?.email === uploaderEmail;

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="relative w-full overflow-hidden h-[50vh] sm:h-[70vh]">
        {/* background */}
        <img
          src={backgroundImage}
          alt="Maqnas Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/60" />
        
        {/* person image (This is the version with the correct responsive positioning) */}
        <img
          src={personImage}
          alt="Subject"
          className="absolute -bottom-12 h-[95%] left-0 sm:left-14 sm:-bottom-2 sm:h-[120%] object-contain z-10"
        />

        {/* --- START OF TEXT LAYOUT CHANGES --- */}

        {/* Layout for MOBILE screens (top-left and top-right) */}
        <div className="absolute inset-0 z-20 flex justify-between items-start p-4 text-white md:hidden">
          <div className="w-1/2 text-left">
            <h1 className="font-title text-lg font-black uppercase tracking-wider drop-shadow-lg">
              Maqnas HH Prince Naif bin Sultan
            </h1>
          </div>
          <div className="w-1/2 text-right">
            <h2 className="font-titleArabic text-xl font-bold" dir="rtl">
              مقناص سمو الأمير نايف بن سلطان
            </h2>
          </div>
        </div>

        {/* Layout for DESKTOP screens (original layout) */}
        <div className="hidden md:flex absolute inset-0 z-20 items-center justify-end p-6 md:p-12 text-white">
          <div className="w-full md:w-1/2 text-right">
            <h1 className="font-title text-2xl font-black uppercase tracking-wider drop-shadow-xl">
              Maqnas HH Prince Naif bin Sultan
            </h1>
            <div className="w-1/3 my-4 border-b-2 border-white ml-auto" />
            <h2 className="font-titleArabic text-2xl font-bold" dir="rtl">
              مقناص سمو الأمير نايف بن سلطان
            </h2>
          </div>
        </div>
        {/* --- END OF TEXT LAYOUT CHANGES --- */}
      </div>

      {/* CATEGORY LINKS */}
      <div className="container mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.en}
            to={`/gallery/${encodeURIComponent(cat.ar)}`}
            className="flex flex-col items-center justify-center p-6 bg-brand-dark-light rounded-xl shadow-md hover:shadow-lg transition"
          >
            <span className="font-titleArabic text-2xl mb-2" dir="rtl">
              {cat.ar}
            </span>
            <span className="text-sm text-brand-gray">{cat.en}</span>
          </Link>
        ))}
      </div>

      {/* UPLOAD BUTTON (uploader only) */}
      {isUploader && (
        <div className="container mx-auto p-8 text-center">
          <Link
            to="/upload"
            className="inline-block px-8 py-4 bg-navy-light rounded-xl shadow-lg hover:shadow-2xl transition-all text-white font-title text-lg"
          >
            Upload Media
          </Link>
        </div>
      )}
    </div>
  );
}