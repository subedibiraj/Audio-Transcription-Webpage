import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link className="text-3xl font-bold leading-none" to="/">
          <svg className="h-10" alt="logo" viewBox="0 0 10240 10240">
          </svg>
        </Link>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/">Home</Link></li>
          <li><Link className="text-sm text-blue-600 font-bold" to="/about">About Us</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/services">Services</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/pricing">Pricing</Link></li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" to="/contact">Contact</Link></li>
        </ul>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Link className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" to="/login">Sign In</Link>
          <Link className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to="/signup">Sign Up</Link>
        </div>
      </nav>
      <div className={`navbar-menu relative z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
              </svg>
            </a>
            <button className="navbar-close" onClick={() => setIsOpen(false)}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul>
            {/* Mobile view links */}
            <li><Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/">Home</Link></li>
            <li><Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/about">About Us</Link></li>
            <li><Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/services">Services</Link></li>
            <li><Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/pricing">Pricing</Link></li>
            <li><Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/contact">Contact</Link></li>
            <li><Link className="block py-2 px-6 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="/login">Sign In</Link></li>
            <li><Link className="block py-2 px-6 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded" to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
