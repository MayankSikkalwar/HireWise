import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiX } from 'react-icons/fi';

const CandidateDetailModal = ({ candidate, onClose }) => {
  // If no candidate is selected, render nothing.
  if (!candidate) return null;

  const normalizedScore = Math.max(0, Math.min(Number(candidate.totalScore) || 0, 100));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 16, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.55)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-7 border-b border-white/10 flex justify-between items-start gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Candidate Profile</p>
              <h2 className="mt-2 text-3xl font-semibold text-white truncate">{candidate.name}</h2>
              <div className="flex items-center mt-2 text-sm text-slate-300">
                <FiMail className="mr-2 text-violet-300" />
                <span className="truncate">{candidate.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-shrink-0">
              <div className="text-right w-48">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Overall Score</p>
                <p className="text-4xl font-bold text-violet-300 mt-1">{candidate.totalScore}</p>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-800/90 overflow-hidden border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                    style={{ width: `${normalizedScore}%` }}
                  />
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="p-7 overflow-y-auto flex-1 [scrollbar-width:thin] [scrollbar-color:#64748b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/50 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Candidate Summary</h3>
              <p className="text-sm leading-relaxed text-slate-300">{candidate.summary || 'No summary available.'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Score Breakdown</h3>
              <div className="space-y-3">
                {(candidate.scoreBreakdown || []).map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                    <div className="flex justify-between items-center gap-4">
                      <p className="font-semibold text-slate-100">{item.criteria}</p>
                      <p className="text-sm text-slate-300">
                        Criteria Score: <span className="text-white font-bold">{item.score}/10</span>
                      </p>
                    </div>
                    <div className="my-3 h-px bg-white/10" />
                    <p className="text-sm text-slate-300">
                      <span className="font-medium text-slate-200">Justification:</span> {item.justification}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-violet-300 text-right">Weighted Score: {item.weightedScore}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-white/10 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:opacity-95 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CandidateDetailModal;
