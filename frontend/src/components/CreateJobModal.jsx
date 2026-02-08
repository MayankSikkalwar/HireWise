/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../api/apiService';

const CreateJobModal = ({ isOpen, onClose, onJobCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // --- NEW: State to manage criteria ---
  const [criteria, setCriteria] = useState([{ criteria: '', weight: 5 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- NEW: Functions to manage criteria ---
  const handleAddCriterion = () => {
    setCriteria([...criteria, { criteria: '', weight: 5 }]);
  };

  const handleRemoveCriterion = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
  };

  const handleCriterionChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // Send the criteria along with the job details
      const { data } = await api.post('/jobs', { title, description, scoringCriteria: criteria });
      onJobCreated(data);
      // Reset form
      setTitle('');
      setDescription('');
      setCriteria([{ criteria: '', weight: 5 }]);
      onClose();
    } catch (err) {
      setError('Failed to create job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-7 border-b border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">New Role</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Create Job Posting</h2>
              <p className="mt-1 text-sm text-slate-300">Define role details and AI scoring criteria.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-7 [scrollbar-width:thin] [scrollbar-color:#64748b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/50 [&::-webkit-scrollbar-track]:bg-transparent">
              {error && (
                <div className="mb-5 rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-200"
                  />
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-100">Scoring Criteria</h3>
                    <button
                      type="button"
                      onClick={handleAddCriterion}
                      className="inline-flex items-center gap-2 rounded-lg border border-violet-300/30 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20 transition-colors"
                    >
                      <FiPlus />
                      <span>Add Criterion</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {criteria.map((item, index) => (
                      <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="text"
                            placeholder={`Criterion ${index + 1}`}
                            value={item.criteria}
                            onChange={(e) => handleCriterionChange(index, 'criteria', e.target.value)}
                            className="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-200"
                            required
                          />
                          <input
                            type="number"
                            min="1"
                            max="10"
                            placeholder="Weight"
                            value={item.weight}
                            onChange={(e) => handleCriterionChange(index, 'weight', parseInt(e.target.value))}
                            className="w-24 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400/70 focus:border-violet-300/60 transition-all duration-200"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCriterion(index)}
                            className="rounded-lg border border-transparent p-2.5 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  {isLoading ? 'Creating...' : 'Create Job'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateJobModal;
