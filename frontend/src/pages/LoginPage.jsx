import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Our custom hook to access auth context
import api from '../api/apiService'; // Our centralized API service

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth(); // Get the login function from our context
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Make the API call using our apiService
      const { data } = await api.post('/auth/login', { email, password });
      
      // Update the global state with the user data
      login(data);
      
      // Redirect to the dashboard on successful login
      navigate('/dashboard');

    } catch (err) {
      // Set a user-friendly error message
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-6xl h-[80vh] bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

        {/* Left Panel: Branding & Animation */}
        <motion.div // Changed div to motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-8"
        >
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold tracking-tighter">HireWise</h1>
            <p className="mt-4 text-xl text-gray-200">Hiring, Intelligently.</p>
          </div>
        </motion.div>

        {/* Right Panel: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <h2 className="text-4xl font-bold text-white mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-400 mb-8 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Message Display */}
              {error && (
                <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm" />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;