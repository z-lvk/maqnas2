import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';

// ADDED: Import your logo file.
// Make sure the filename 'logo.png' matches the actual name of your file.
import logo from '../assets/logo.png'; 

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const uploaderEmail = 'karimsahib@gmail.com';
  const isUploader = user?.email === uploaderEmail;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <header className="bg-brand-dark-light shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div>
          {/* CHANGED: Replaced text with the logo image */}
          <NavLink to="/">
            <img src={logo} alt="PhotoGallery Logo" className="h-12 w-auto" />
          </NavLink>
        </div>
        <div className="flex space-x-4 sm:space-x-6 items-center text-sm sm:text-base text-gray-300">
          <NavLink to="/" className={({ isActive }) => `hover:text-white ${isActive ? "text-white font-bold" : ""}`}>Dashboard</NavLink>

          {user && isUploader && (
             <NavLink to="/upload" className={({ isActive }) => `hover:text-white ${isActive ? "text-white font-bold" : ""}`}>Upload</NavLink>
          )}

          {user ? (
            <button onClick={handleLogout} className="bg-maroon text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-maroon-dark">
              Logout
            </button>
          ) : (
            <NavLink to="/auth" className="bg-navy text-white px-3 py-1 rounded-md text-sm font-medium">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;