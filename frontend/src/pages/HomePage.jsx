import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Navbar />
      
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-5 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Find Your Next Great Hire, Faster.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300"
        >
          HireWise uses the power of Gemini AI to screen resumes, rank candidates, and help you make smarter hiring decisions in a fraction of the time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Link 
            to="/register" 
            className="bg-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;