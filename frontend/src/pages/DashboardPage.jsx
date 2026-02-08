import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiUploadCloud, FiUsers, FiCheckCircle } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import CreateJobModal from '../components/CreateJobModal';
import CandidateDetailModal from '../components/CandidateDetailModal';
import api from '../api/apiService';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCandidatesLoading, setIsCandidatesLoading] = useState(false);
  const [viewingCandidate, setViewingCandidate] = useState(null);

  // --- 1. Fetch Jobs on Initial Load ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
        // Automatically select the first job if it exists
        if (data.length > 0) {
          setSelectedJob(data[0]);
        }
      } catch (error) { console.error('Failed to fetch jobs', error); }
      finally { setIsLoading(false); }
    };
    fetchJobs();
  }, []);

  // --- 2. Fetch Candidates When a Job is Selected ---
  useEffect(() => {
    if (selectedJob) {
      const fetchCandidates = async () => {
        setIsCandidatesLoading(true);
        try {
          // Fetch candidates for the currently selected job
          const { data } = await api.get(`/jobs/${selectedJob._id}/candidates`);
          setCandidates(data);
        } catch (error) { console.error('Failed to fetch candidates', error); }
        finally { setIsCandidatesLoading(false); }
      };
      fetchCandidates();
    } else {
      // If no job is selected, clear the candidates list
      setCandidates([]);
    }
  }, [selectedJob]);

  // --- Handler Functions ---
  const handleJobCreated = (newJob) => {
    setJobs([newJob, ...jobs]);
    setSelectedJob(newJob); // Automatically select the new job
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedJob) return;
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const { data: newCandidate } = await api.post(`/jobs/${selectedJob._id}/upload`, formData);
      // Add the new candidate to the list. The backend already sorts,
      // but we can re-sort on the client-side for instant feedback.
      setCandidates((prev) => [...prev, newCandidate].sort((a, b) => b.totalScore - a.totalScore));
    } catch (error) {
      console.error('Failed to upload resume', error);
      alert('Failed to upload and analyze resume.');
    }
  };

  // --- THIS IS THE FIX for the Shortlist Button ---
  const handleShortlistToggle = async (candidateId) => {
    try {
      // Call the new backend endpoint to toggle the shortlist status
      const { data: updatedCandidate } = await api.patch(`/candidates/${candidateId}/shortlist`);
      // Update the candidate's status in our local state without needing to refetch
      setCandidates((prev) => prev.map((c) => (c._id === candidateId ? updatedCandidate : c)));
    } catch (error) {
      console.error('Failed to update shortlist status', error);
    }
  };

  // Memoized calculation for shortlisted count to improve performance
  const shortlistedCount = useMemo(() => {
    return candidates.filter((c) => c.shortlisted).length;
  }, [candidates]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-300';
    if (score >= 60) return 'text-amber-300';
    return 'text-rose-300';
  };

  const getScoreBarColor = (score) => {
    if (score >= 80) return 'from-emerald-400 to-emerald-500';
    if (score >= 60) return 'from-amber-400 to-amber-500';
    return 'from-rose-400 to-rose-500';
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans">
      <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

      <aside className="w-96 bg-slate-900/80 backdrop-blur-xl p-7 flex flex-col border-r border-white/10">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace</p>
          <h2 className="text-2xl font-semibold mt-2 text-white">Job Postings</h2>
          <p className="text-sm text-slate-400 mt-1">Select a role to inspect ranked candidates.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-20 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#64748b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/50 [&::-webkit-scrollbar-track]:bg-transparent">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                  selectedJob?._id === job._id
                    ? 'bg-violet-500/10 border-violet-300/30 shadow-[inset_4px_0_0_0_rgba(167,139,250,0.95),0_12px_30px_rgba(139,92,246,0.2)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]'
                }`}
              >
                <h3 className="font-semibold text-white truncate">{job.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Click to view ranking and details</p>
              </motion.div>
            ))}
          </div>
        )}
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-[radial-gradient(1200px_500px_at_20%_-20%,rgba(139,92,246,0.18),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(236,72,153,0.12),transparent)] [scrollbar-width:thin] [scrollbar-color:#64748b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/50 [&::-webkit-scrollbar-track]:bg-transparent">
        {selectedJob ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-7 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              <div className="flex justify-between items-start gap-6">
                <div className="min-w-0">
                  <div className="inline-flex items-center rounded-full border border-violet-300/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 mb-3">
                    Active Role
                  </div>
                  <h1 className="text-3xl font-semibold text-white leading-tight">{selectedJob.title}</h1>
                  <p className="text-slate-300 mt-3 max-w-3xl text-sm leading-relaxed">{selectedJob.description}</p>
                </div>

                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white cursor-pointer shadow-[0_10px_30px_rgba(139,92,246,0.45)] hover:opacity-95 transition-all flex-shrink-0"
                >
                  <FiUploadCloud size={16} />
                  Upload Resume
                </label>
                <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-7 pt-7 border-t border-white/10">
                <div className="h-full rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_14px_35px_rgba(0,0,0,0.3)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total Applicants</p>
                      <p className="text-4xl font-bold text-white mt-2">{candidates.length}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-300/20 text-violet-200 flex items-center justify-center">
                      <FiUsers size={18} />
                    </div>
                  </div>
                </div>

                <div className="h-full rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-5 shadow-[0_0_30px_rgba(16,185,129,0.18)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">Shortlisted</p>
                      <p className="text-4xl font-bold text-emerald-200 mt-2">{shortlistedCount}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-200/20 text-emerald-200 flex items-center justify-center">
                      <FiCheckCircle size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.3)]">
              <table className="w-full text-left">
                <thead className="border-b border-white/10 bg-slate-900/50">
                  <tr>
                    <th className="p-4 w-16 text-xs uppercase tracking-[0.16em] text-slate-400">Rank</th>
                    <th className="p-4 text-xs uppercase tracking-[0.16em] text-slate-400">Name</th>
                    <th className="p-4 text-xs uppercase tracking-[0.16em] text-slate-400">Score</th>
                    <th className="p-4 text-center text-xs uppercase tracking-[0.16em] text-slate-400">Shortlist</th>
                  </tr>
                </thead>
                <tbody>
                  {isCandidatesLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <tr key={idx} className="border-b border-white/10 last:border-b-0">
                        <td className="p-4"><div className="h-4 w-8 rounded bg-white/10 animate-pulse" /></td>
                        <td className="p-4"><div className="h-4 w-48 rounded bg-white/10 animate-pulse" /></td>
                        <td className="p-4"><div className="h-4 w-36 rounded bg-white/10 animate-pulse" /></td>
                        <td className="p-4"><div className="h-6 w-12 rounded-full bg-white/10 animate-pulse mx-auto" /></td>
                      </tr>
                    ))
                  ) : (
                    candidates.map((c, index) => {
                      const score = Number(c.totalScore) || 0;
                      const safeScore = Math.max(0, Math.min(score, 100));

                      return (
                        <motion.tr
                          key={c._id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.015 }}
                          onClick={() => setViewingCandidate(c)}
                          className="cursor-pointer border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 font-semibold text-slate-400">{index + 1}</td>
                          <td className="p-4">
                            <p className="font-medium text-slate-100">{c.name}</p>
                          </td>
                          <td className="p-4">
                            <div className="max-w-[220px]">
                              <p className={`font-bold ${getScoreColor(score)}`}>{c.totalScore}</p>
                              <div className="mt-2 h-1.5 rounded-full bg-slate-800/90 border border-white/10 overflow-hidden">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${getScoreBarColor(score)}`}
                                  style={{ width: `${safeScore}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShortlistToggle(c._id);
                                }}
                                className={`w-12 h-6 rounded-full p-0.5 flex items-center cursor-pointer transition-all duration-300 ${
                                  c.shortlisted
                                    ? 'bg-emerald-500/90 shadow-[0_0_16px_rgba(16,185,129,0.45)]'
                                    : 'bg-slate-700/90 hover:bg-slate-600'
                                }`}
                              >
                                <span
                                  className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    c.shortlisted ? 'translate-x-6' : 'translate-x-0'
                                  }`}
                                />
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>Select a job or create a new one to get started.</p>
          </div>
        )}
      </main>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />
      <CandidateDetailModal candidate={viewingCandidate} onClose={() => setViewingCandidate(null)} />
    </div>
  );
};

export default DashboardPage;
