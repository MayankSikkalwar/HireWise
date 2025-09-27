import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import CreateJobModal from '../components/CreateJobModal';
import api from '../api/apiService';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs when the component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]); // Automatically select the first job
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Fetch candidates when a job is selected
  useEffect(() => {
    if (selectedJob) {
      const fetchCandidates = async () => {
        setCandidates([]); // Clear previous candidates
        try {
          const { data } = await api.get(`/jobs/${selectedJob._id}/candidates`);
          setCandidates(data);
        } catch (error) {
          console.error("Failed to fetch candidates", error);
        }
      };
      fetchCandidates();
    }
  }, [selectedJob]);

  const handleJobCreated = (newJob) => {
    setJobs([newJob, ...jobs]);
    setSelectedJob(newJob); // Select the newly created job
  };

  // --- NEW: Function to handle resume file upload ---
  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedJob) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Show an uploading indicator if you want
      const { data: newCandidate } = await api.post(`/jobs/${selectedJob._id}/upload`, formData);
      setCandidates([newCandidate, ...candidates]); // Add new candidate to the top
    } catch (error) {
      console.error("Failed to upload resume", error);
      alert("Failed to upload and analyze resume. Please try again.");
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

      {/* Job Listings Column */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">My Job Postings</h1>
        {isLoading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {jobs.map(job => (
              <motion.div key={job._id} onClick={() => setSelectedJob(job)}
                   whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                   className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${selectedJob?._id === job._id ? 'bg-purple-600 border-purple-400' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
                <h2 className="font-bold text-lg">{job.title}</h2>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Candidate Details Column */}
      <AnimatePresence>
        {selectedJob && (
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-gray-800 p-8 border-l border-gray-700 overflow-y-auto"
          >
            {/* --- NEW: Header with Upload Button --- */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <label htmlFor="resume-upload" className="bg-purple-600 text-white px-3 py-2 text-sm font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-colors">
                Upload Resume
              </label>
              <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
            </div>

            <p className="text-gray-400 mb-6 text-sm">{selectedJob.description}</p>
            <h3 className="font-bold mb-4">Ranked Candidates</h3>
            <div className="space-y-4">
              {candidates.length > 0 ? candidates.map(c => (
                <div key={c._id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-300">Candidate #{c._id.slice(-6)}</span>
                    <span className="text-lg font-bold text-purple-400">{c.geminiScore}/10</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1"><strong className="text-green-400">Strengths:</strong> {c.geminiSummary}</p>
                  <p className="text-sm text-gray-300"><strong className="text-yellow-400">Gaps:</strong> {c.geminiGaps}</p>
                </div>
              )) : <p className="text-gray-500 text-center py-4">No candidates for this job yet. Upload a resume to get started!</p>}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />
    </div>
  );
};

export default DashboardPage;