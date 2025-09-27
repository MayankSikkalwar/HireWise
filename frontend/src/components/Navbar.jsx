import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          HireWise
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/register" 
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;