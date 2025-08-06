import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import UploadPage from './pages/UploadPage';
import AuthPage from './pages/AuthPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const UploaderRoute = ({ children }) => {
  const { user } = useAuth();
  // ***************************************************************
  // IMPORTANT: REPLACE THE EMAIL BELOW WITH YOUR UPLOADER'S EMAIL
  // ***************************************************************
  const uploaderEmail = 'karimsahib@gmail.com';

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return user.email === uploaderEmail ? children : <Navigate to="/" />;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <main>
          <Routes>
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            {/* Dynamic route for our galleries */}
            <Route path="/gallery/:categoryName" element={<PrivateRoute><Gallery /></PrivateRoute>} />
            <Route path="/upload" element={<UploaderRoute><UploadPage /></UploaderRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;