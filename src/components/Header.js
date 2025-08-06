import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';

// REMOVED: The logo import is no longer needed.

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
    // REVERTED: Header is back to its original simple state
    <header className="bg-brand-dark-light shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div>
          {/* REVERTED: The NavLink now contains text instead of an image */}
          <NavLink to="/" className="text-2xl font-bold text-white font-title">
            ZK TECHNOLOGY
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