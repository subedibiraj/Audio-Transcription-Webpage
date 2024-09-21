import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigate to login page when "Get Started" is clicked
  const handleGetStarted = () => {
    navigate('/login');
  };

  // Navigate to about page when "Learn More" is clicked
  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-8">
          Help Us Build the Future of AI-Powered Speech Recognition
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          We are collecting diverse voice recordings to improve speech-to-text systems, making them more accurate for everyone. Whether you're speaking a regional dialect or have a unique accent, your voice can help build a more inclusive transcription system.
        </p>
        <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Get Started
          </button>
          <button
            onClick={handleLearnMore}
            className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
