import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide authentication state to the rest of the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by looking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Function to log in (save token and update state)
  const logIn = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Function to log out (remove token and update state)
  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
