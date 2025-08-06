// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Make sure these two files exist in src/assets:
import backgroundImage from '../assets/background.jpg';
import personImage     from '../assets/person.png';

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
      {/* ===== HERO SECTION ===== */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* 1) Full-cover background */}
        <img
          src={backgroundImage}
          alt="Maqnas Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2) Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/60" />

        {/* 3) Person on the left (fixed on all screens) */}
        <img
          src={personImage}
          alt="Subject"
          className="absolute left-4 bottom-0 w-[45%] sm:w-[35%] md:w-[30%] object-contain z-10"
        />

        {/* 4) Text on the right */}
        <div className="absolute inset-0 z-20 flex items-center justify-end p-8 md:p-12 text-white">
          <div className="w-full md:w-1/2 text-right">
            <h1 className="font-title text-2xl font-black uppercase tracking-wider drop-shadow-xl">
              Maqnas HH Prince Naif bin Sultan
            </h1>
            <div className="w-1/3 my-6 border-b-2 border-white ml-auto" />
            <h2 className="font-titleArabic text-3xl font-bold" dir="rtl">
              مقناص سمو الأمير نايف بن سلطان
            </h2>
          </div>
        </div>
      </div>
      {/* ===== end HERO ===== */}

      {/* ===== CATEGORY LINKS ===== */}
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

      {/* ===== UPLOAD BUTTON (uploader only) ===== */}
      {isUploader && (
        <div className="container mx-auto p-8 text-center">
          <Link
            to="/upload"
            className="inline-block px-8 py-4 bg-navy-light rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white font-title text-lg"
          >
            Upload Media
          </Link>
        </div>
      )}
    </div>
  );
}
