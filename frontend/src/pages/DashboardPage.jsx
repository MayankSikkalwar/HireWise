// import React, { useState, useEffect } from 'react';
// // eslint-disable-next-line no-unused-vars
// import { AnimatePresence, motion } from 'framer-motion';
// import Sidebar from '../components/Sidebar';
// import CreateJobModal from '../components/CreateJobModal';
// import api from '../api/apiService';

// const DashboardPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [candidates, setCandidates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch jobs when the component loads
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await api.get('/jobs');
//         setJobs(data);
//         if (data.length > 0) {
//           setSelectedJob(data[0]); // Automatically select the first job
//         }
//       } catch (error) {
//         console.error("Failed to fetch jobs", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Fetch candidates when a job is selected
//   useEffect(() => {
//     if (selectedJob) {
//       const fetchCandidates = async () => {
//         setCandidates([]); // Clear previous candidates
//         try {
//           const { data } = await api.get(`/jobs/${selectedJob._id}/candidates`);
//           setCandidates(data);
//         } catch (error) {
//           console.error("Failed to fetch candidates", error);
//         }
//       };
//       fetchCandidates();
//     }
//   }, [selectedJob]);

//   const handleJobCreated = (newJob) => {
//     setJobs([newJob, ...jobs]);
//     setSelectedJob(newJob); // Select the newly created job
//   };

//   // --- NEW: Function to handle resume file upload ---
//   const handleResumeUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file || !selectedJob) return;

//     const formData = new FormData();
//     formData.append('resume', file);

//     try {
//       // Show an uploading indicator if you want
//       const { data: newCandidate } = await api.post(`/jobs/${selectedJob._id}/upload`, formData);
//       setCandidates([newCandidate, ...candidates]); // Add new candidate to the top
//     } catch (error) {
//       console.error("Failed to upload resume", error);
//       alert("Failed to upload and analyze resume. Please try again.");
//     }
//   };
  
//   return (
//     <div className="flex h-screen bg-gray-900 text-white font-sans">
//       <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

//       {/* Job Listings Column */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6">My Job Postings</h1>
//         {isLoading ? <p>Loading...</p> : (
//           <div className="space-y-4">
//             {jobs.map(job => (
//               <motion.div key={job._id} onClick={() => setSelectedJob(job)}
//                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${selectedJob?._id === job._id ? 'bg-purple-600 border-purple-400' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
//                 <h2 className="font-bold text-lg">{job.title}</h2>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Candidate Details Column */}
//       <AnimatePresence>
//         {selectedJob && (
//           <motion.aside
//             initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             className="w-full max-w-md bg-gray-800 p-8 border-l border-gray-700 overflow-y-auto"
//           >
//             {/* --- NEW: Header with Upload Button --- */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
//               <label htmlFor="resume-upload" className="bg-purple-600 text-white px-3 py-2 text-sm font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-colors">
//                 Upload Resume
//               </label>
//               <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
//             </div>

//             <p className="text-gray-400 mb-6 text-sm">{selectedJob.description}</p>
//             <h3 className="font-bold mb-4">Ranked Candidates</h3>
//             <div className="space-y-4">
//               {candidates.length > 0 ? candidates.map(c => (
//                 <div key={c._id} className="bg-gray-700 p-4 rounded-lg">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold text-gray-300">Candidate #{c._id.slice(-6)}</span>
//                     <span className="text-lg font-bold text-purple-400">{c.geminiScore}/10</span>
//                   </div>
//                   <p className="text-sm text-gray-300 mb-1"><strong className="text-green-400">Strengths:</strong> {c.geminiSummary}</p>
//                   <p className="text-sm text-gray-300"><strong className="text-yellow-400">Gaps:</strong> {c.geminiGaps}</p>
//                 </div>
//               )) : <p className="text-gray-500 text-center py-4">No candidates for this job yet. Upload a resume to get started!</p>}
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import CreateJobModal from '../components/CreateJobModal';
import CandidateDetailModal from '../components/CandidateDetailModal'; // Import the new modal
import api from '../api/apiService';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingCandidate, setViewingCandidate] = useState(null); // State for the candidate detail modal

  // Fetch jobs when the component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]);
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
        setCandidates([]);
        try {
          // The backend now sorts by totalScore, so we don't need to sort on the frontend
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
    setSelectedJob(newJob);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedJob) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data: newCandidate } = await api.post(`/jobs/${selectedJob._id}/upload`, formData);
      // Add new candidate to the list, which will be automatically sorted on the next render
      setCandidates(prevCandidates => [newCandidate, ...prevCandidates]);
    } catch (error) {
      console.error("Failed to upload resume", error);
      alert("Failed to upload and analyze resume. Please try again.");
    }
  };

  // --- NEW: Function to toggle shortlist status ---
  const handleShortlistToggle = async (candidateId, e) => {
    e.stopPropagation(); // Prevents the detail modal from opening
    try {
      const { data: updatedCandidate } = await api.patch(`/candidates/${candidateId}/shortlist`);
      // Update the candidate in the list
      setCandidates(candidates.map(c => c._id === candidateId ? updatedCandidate : c));
    } catch (error) {
      console.error("Failed to update shortlist status", error);
    }
  };

  // Calculate shortlisted count
  const shortlistedCount = candidates.filter(c => c.shortlisted).length;

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {isLoading ? <p>Loading...</p> : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">{selectedJob ? selectedJob.title : 'My Job Postings'}</h1>
                <p className="text-sm text-gray-400">{selectedJob ? selectedJob.description : 'Select a job to view candidates.'}</p>
              </div>
              <div className="flex space-x-6 text-center">
                <div>
                  <p className="text-2xl font-bold">{candidates.length}</p>
                  <p className="text-sm text-gray-400">Total Applicants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">{shortlistedCount}</p>
                  <p className="text-sm text-gray-400">Shortlisted</p>
                </div>
                {selectedJob && (
                    <div>
                        <label htmlFor="resume-upload" className="bg-purple-600 text-white px-4 py-3 text-sm font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-colors">
                            Upload Resume
                        </label>
                        <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
                    </div>
                )}
              </div>
            </div>
            
            {/* Leaderboard Table */}
            <div className="overflow-x-auto bg-gray-800 rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Rank</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Score</th>
                            <th scope="col" className="px-6 py-3 text-center">Shortlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c, index) => (
                            <tr key={c._id} onClick={() => setViewingCandidate(c)} className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer">
                                <td className="px-6 py-4 font-medium">{index + 1}</td>
                                <td className="px-6 py-4 font-bold">{c.name}</td>
                                <td className="px-6 py-4 font-bold text-purple-400">{c.totalScore}</td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={(e) => handleShortlistToggle(c._id, e)} className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${c.shortlisted ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'}`}>
                                        {c.shortlisted && '✔'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </>
        )}
      </main>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />
      <CandidateDetailModal candidate={viewingCandidate} onClose={() => setViewingCandidate(null)} />
    </div>
  );
};

export default DashboardPage;