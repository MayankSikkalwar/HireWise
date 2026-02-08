import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FiCpu, FiAward, FiZap, FiCheckCircle } from 'react-icons/fi';

const AnimatedSection = ({ children }) => (
  <motion.div
    initial_toggle={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
  >
    {children}
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="w-full bg-gray-950 text-white overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <Navbar />

        {/* Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-24 left-1/4 w-80 h-80 bg-purple-600/40 blur-3xl rounded-full"></div>
          <div className="absolute bottom-24 right-1/4 w-80 h-80 bg-blue-600/40 blur-3xl rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            AI Resume Screening <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Built for Modern Hiring
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-300"
          >
            HireWise uses LLaMA 3 via Groq to analyze resumes, rank candidates,
            and help recruiters make faster, smarter hiring decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition"
            >
              Live Demo
            </Link>
          </motion.div>

          <div className="mt-10 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2"><FiCheckCircle /> AI Powered</span>
            <span className="flex items-center gap-2"><FiCheckCircle /> ATS Scoring</span>
            <span className="flex items-center gap-2"><FiCheckCircle /> Auto Ranking</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container mx-auto px-6 py-24">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features, Simplified
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-xl transition">
              <FiCpu className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">AI Resume Intelligence</h3>
              <p className="text-gray-400">
                Deep contextual resume analysis using LLaMA 3 to identify real skills and experience.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-xl transition">
              <FiAward className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Smart Candidate Ranking</h3>
              <p className="text-gray-400">
                Automatically rank candidates with weighted scoring and detailed justification.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-xl transition">
              <FiZap className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">10x Faster Hiring</h3>
              <p className="text-gray-400">
                Reduce manual screening and focus only on top-matched candidates.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* HOW IT WORKS */}
        <AnimatedSection>
          <div className="mt-28">
            <h2 className="text-4xl font-bold text-center mb-16">
              From Job Post to Shortlist in Minutes
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-6xl font-bold text-purple-400 mb-4">1</div>
                <h3 className="text-2xl font-semibold">Create Job</h3>
                <p className="text-gray-400 mt-2">
                  Define role requirements and scoring criteria.
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-purple-400 mb-4">2</div>
                <h3 className="text-2xl font-semibold">Upload Resumes</h3>
                <p className="text-gray-400 mt-2">
                  Bulk upload candidate resumes in seconds.
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-purple-400 mb-4">3</div>
                <h3 className="text-2xl font-semibold">AI Ranking</h3>
                <p className="text-gray-400 mt-2">
                  Get ranked candidates with detailed analysis.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default HomePage;
