import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
