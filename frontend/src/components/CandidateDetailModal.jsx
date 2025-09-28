import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';

const CandidateDetailModal = ({ candidate, onClose }) => {
  // If no candidate is selected, render nothing.
  if (!candidate) return null;

  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white">{candidate.name}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center"><FiMail className="mr-2 text-purple-400"/> {candidate.email}</span>
                    {/* You can add more contact details here if extracted by the AI */}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                  <p className="text-sm text-gray-400">Overall Score</p>
                  <p className="text-4xl font-bold text-purple-400">{candidate.totalScore}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 overflow-y-auto flex-1">
                {/* Candidate Summary Section */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Candidate's Summary</h3>
                    <p className="text-gray-300 text-sm leading-relaxed bg-gray-700/50 p-4 rounded-lg">
                        {candidate.scoreBreakdown[0]?.justification || "No summary available."}
                    </p>
                </div>

                {/* Score Breakdown Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-200">Score Breakdown</h3>
                    <div className="space-y-4">
                        {candidate.scoreBreakdown.map((item, index) => (
                            <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-200">{item.criteria}</p>
                                    <p className="text-sm font-semibold text-gray-400">Criteria Score: <span className="text-white font-bold text-base">{item.score}/10</span></p>
                                </div>
                                <p className="text-xs text-gray-400 mb-2">
                                    <strong className="font-semibold text-gray-300">Justification:</strong> {item.justification}
                                </p>
                                <p className="text-sm font-bold text-purple-400 text-right">
                                    Weighted Score: {item.weightedScore}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-right">
                <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                  Close
                </button>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default CandidateDetailModal;
