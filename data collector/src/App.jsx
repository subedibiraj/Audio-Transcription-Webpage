import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // Removed useLocation from here
import { AnimatePresence, motion } from 'framer-motion'; // Import Framer Motion
import Card from './components/Card';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import VerificationPage from './components/VerificationPage/VerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS (optional)

// Ensure that everything is wrapped by BrowserRouter before calling useLocation()
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/proxy?api=unbiasedText');

        if (!response.ok) {
          const responseText = await response.text(); // Inspect the raw response text
          console.error('Error fetching data:', response.status, responseText);
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          console.log("API response:", result); // Log response for debugging
          setData(result);
        } else {
          const responseText = await response.text(); // If non-JSON response, log it
          console.error("Received non-JSON response:", responseText);
          if (responseText) {
            setError("Unexpected response format");
          } else {
            setError("Received empty response");
          }
          throw new Error("Received non-JSON response");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define the transition for page changes
  const pageTransition = {
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
    out: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <AuthProvider>
      {/* Ensure BrowserRouter wraps everything */}
      <BrowserRouter>
        <Navbar />
        
        {/* AnimatePresence and Routes must be inside the BrowserRouter */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <LandingPage />
                </motion.div>
              }
            />
            <Route
              exact
              path="/data"
              element={
                <ProtectedRoute>
                  <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                    <div className="app">
                      {/* Instructional Section */}
                      <div className="bg-blue-100 p-4 rounded-lg mb-6">
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">Instructions</h2>
                        <p className="text-gray-700">
                          You are free to talk about any meaningful topic, but you must include the following three key details:
                          the person’s name, their bank name, and the amount shown in the data.
                          Ensure your speech is neutral and free of personal opinions or bias. After recording, please upload the audio file.
                        </p>
                        <p className="text-gray-700 mt-2">
                          Example (in Nepali): "सूरज कँडेलले नेपाल बैंक लिमिटेडमा ५०,००० रुपैयाँ जम्मा गरेका छन्।"
                        </p>
                      </div>

                      {/* Data Loading and Rendering Section */}
                      {loading ? (
                        <p>Loading data...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : (
                        data.map((item, index) => (
                          <Card
                            key={index}
                            person={item.destinationPerson}
                            bank={item.destinationBank}
                            amount={item.amount}
                          />
                        ))
                      )}
                    </div>
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <Signup />
                </motion.div>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <Login />
                </motion.div>
              }
            />
            {/* <Route
              exact
              path="/leaderboard"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <LeaderBoard />
                </motion.div>
              }
            /> */}
            <Route
              exact
              path="/verification"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <VerificationPage />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <NotFound />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
