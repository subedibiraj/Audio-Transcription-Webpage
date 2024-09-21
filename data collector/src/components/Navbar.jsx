import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [showToast, setShowToast] = useState(false); // For showing sign-out toast
  const { isLoggedIn, logOut } = useContext(AuthContext); // Use AuthContext to get login state
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setLoading(true); // Start loading
    logOut(); // Call the logOut function from AuthContext
    setShowToast(true); // Show the toast after logout
    setTimeout(() => {
      setShowToast(false); // Hide toast after 3 seconds
      setLoading(false); // End loading
      navigate('/login'); // Redirect to login page after logout
    }, 3000); // Show toast for 3 seconds
  };

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        {/* Logo */}
        <Link className="text-3xl font-bold leading-none" to="/">
          <svg className="h-10" alt="logo" viewBox="0 0 10240 10240"></svg>
        </Link>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        {/* Links for desktop */}
        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/">Home</Link></li>
          <li><Link className="text-sm text-blue-600 font-bold" to="/about">About Us</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/contact">Contact</Link></li>
        </ul>

        {/* Authentication buttons for desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          {!isLoggedIn ? (
            <>
              <Link className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" to="/login">Sign In</Link>
              <Link className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to="/signup">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className={`py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Sign Out'
              )}
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link className="text-sm text-blue-600 font-bold" to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
              <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              
              {/* Authentication buttons for mobile */}
              {!isLoggedIn ? (
                <>
                  <Link
                    className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className={`py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Sign Out'
                  )}
                </button>
              )}
            </ul>
          </div>
        )}

        {/* Bootstrap Toast for showing sign-out status */}
        {showToast && (
          <div className="toast show position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className="toast-body text-success">
              You have signed out successfully.
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
