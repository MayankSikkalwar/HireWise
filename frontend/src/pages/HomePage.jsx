// import React from 'react';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

// const HomePage = () => {
//   return (
//     <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
//       <Navbar />
      
//       {/* Animated background shapes */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-5 flex flex-col items-center justify-center min-h-screen text-center px-4">
//         <motion.h1 
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-7xl font-extrabold tracking-tight"
//         >
//           Find Your Next Great Hire, Faster.
//         </motion.h1>
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300"
//         >
//           HireWise uses the power of Gemini AI to screen resumes, rank candidates, and help you make smarter hiring decisions in a fraction of the time.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="mt-8"
//         >
//           <Link 
//             to="/register" 
//             className="bg-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
//           >
//             Get Started for Free
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FiCpu, FiAward, FiZap } from 'react-icons/fi';

// A reusable component for sections that animate on scroll
const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div className="w-full bg-gray-900 text-white overflow-x-hidden">
      {/* --- Hero Section --- */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <Navbar />
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-5">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Find Your Next Great Hire, Faster.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300">
            HireWise uses the power of Gemini AI to screen resumes, rank candidates, and help you make smarter hiring decisions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8">
            <Link to="/register" className="bg-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg">
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* --- Features Section --- */}
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features, Simplified</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-800 p-8 rounded-lg">
              <FiCpu className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400">Leverage Google's Gemini API for deep, contextual understanding of resumes, going beyond simple keywords.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <FiAward className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Automated Candidate Ranking</h3>
              <p className="text-gray-400">Instantly see the most qualified candidates at the top of your list with a clear, data-driven score from 1-10.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <FiZap className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Accelerated Workflow</h3>
              <p className="text-gray-400">Reduce manual screening time by over 90% and focus your efforts on interviewing the best talent.</p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- How It Works Section --- */}
        <AnimatedSection>
          <div className="mt-28">
            <h2 className="text-4xl font-bold text-center mb-12">Get Started in 3 Simple Steps</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">1.</div>
                <h3 className="text-2xl font-semibold">Create a Job</h3>
                <p className="text-gray-400">Post your job title and description in your private dashboard.</p>
              </div>
              <div className="text-gray-600 text-2xl hidden md:block">→</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">2.</div>
                <h3 className="text-2xl font-semibold">Upload Resumes</h3>
                <p className="text-gray-400">Upload the candidate resumes you've collected in PDF or DOCX format.</p>
              </div>
              <div className="text-gray-600 text-2xl hidden md:block">→</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">3.</div>
                <h3 className="text-2xl font-semibold">Get AI Rankings</h3>
                <p className="text-gray-400">Instantly see candidates ranked by suitability, with summaries of their strengths.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default HomePage;