
// import React, { useState, useEffect, useMemo } from 'react';
// // eslint-disable-next-line no-unused-vars
// import { AnimatePresence, motion } from 'framer-motion';
// import Sidebar from '../components/Sidebar';
// import CreateJobModal from '../components/CreateJobModal';
// import CandidateDetailModal from '../components/CandidateDetailModal';
// import api from '../api/apiService';

// const DashboardPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [candidates, setCandidates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [viewingCandidate, setViewingCandidate] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await api.get('/jobs');
//         setJobs(data);
//         if (data.length > 0) {
//           setSelectedJob(data[0]);
//         }
//       } catch (error) { console.error("Failed to fetch jobs", error); } 
//       finally { setIsLoading(false); }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     if (selectedJob) {
//       const fetchCandidates = async () => {
//         try {
//           const { data } = await api.get(`/jobs/${selectedJob._id}/candidates`);
//           setCandidates(data);
//         } catch (error) { console.error("Failed to fetch candidates", error); }
//       };
//       fetchCandidates();
//     }
//   }, [selectedJob]);

//   const handleJobCreated = (newJob) => {
//     setJobs([newJob, ...jobs]);
//     setSelectedJob(newJob);
//   };

//   const handleResumeUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file || !selectedJob) return;
//     const formData = new FormData();
//     formData.append('resume', file);
//     try {
//       const { data: newCandidate } = await api.post(`/jobs/${selectedJob._id}/upload`, formData);
//       setCandidates(prevCandidates => 
//         [...prevCandidates, newCandidate].sort((a, b) => b.totalScore - a.totalScore)
//       );
//     } catch (error) {
//       console.error("Failed to upload resume", error);
//       alert("Failed to upload and analyze resume.");
//     }
//   };
  
//   const handleShortlistToggle = async (candidateId) => {
//     try {
//       const { data: updatedCandidate } = await api.patch(`/candidates/${candidateId}/shortlist`);
//       setCandidates(prevCandidates =>
//         prevCandidates.map(c => c._id === candidateId ? updatedCandidate : c)
//       );
//     } catch (error) {
//         console.error("Failed to update shortlist status", error);
//     }
//   };
  
//   const shortlistedCount = useMemo(() => {
//     return candidates.filter(c => c.shortlisted).length;
//   }, [candidates]);

//   return (
//     <div className="flex h-screen bg-gray-900 text-white font-sans">
//       <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* --- THIS IS THE CORRECTED SECTION --- */}
//         {isLoading ? (
//             <div className="flex-1 flex items-center justify-center">
//                 <p className="text-gray-500">Loading your dashboard...</p>
//             </div>
//         ) : selectedJob ? (
//           <main className="flex-1 p-8 overflow-y-auto">
//             <div className="bg-gray-800 rounded-lg p-6 mb-8">
//               <div className="flex justify-between items-start">
//                   <div>
//                       <h1 className="text-3xl font-bold">{selectedJob.title}</h1>
//                       <p className="text-gray-400 mt-2 max-w-2xl">{selectedJob.description}</p>
//                   </div>
//                   <label htmlFor="resume-upload" className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-colors flex-shrink-0">
//                       Upload Resume
//                   </label>
//                   <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
//               </div>
              
//               <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-700">
//                   <div className="bg-gray-700 p-4 rounded-lg text-center flex-1">
//                       <p className="text-3xl font-bold">{candidates.length}</p>
//                       <p className="text-sm text-gray-400">Total Applicants</p>
//                   </div>
//                   <div className="bg-gray-700 p-4 rounded-lg text-center flex-1">
//                       <p className="text-3xl font-bold text-green-400">{shortlistedCount}</p>
//                       <p className="text-sm text-gray-400">Shortlisted</p>
//                   </div>
//               </div>
//             </div>

//             <div className="bg-gray-800 rounded-lg">
//                 <table className="w-full text-left">
//                     <thead className="border-b border-gray-700">
//                         <tr>
//                             <th className="p-4 w-16">Rank</th>
//                             <th className="p-4">Name</th>
//                             <th className="p-4">Score</th>
//                             <th className="p-4 text-center">Shortlist</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {candidates.map((c, index) => (
//                             <tr key={c._id} onClick={() => setViewingCandidate(c)} className="hover:bg-gray-700/50 cursor-pointer border-b border-gray-700/50 last:border-b-0">
//                                 <td className="p-4 font-bold text-gray-400">{index + 1}</td>
//                                 <td className="p-4 font-semibold">{c.name}</td>
//                                 <td className="p-4 font-bold text-purple-400">{c.totalScore}</td>
//                                 <td className="p-4 flex justify-center">
//                                     <div onClick={(e) => {e.stopPropagation(); handleShortlistToggle(c._id);}}
//                                         className={`w-12 h-6 rounded-full flex items-center transition-colors ${c.shortlisted ? 'bg-green-500' : 'bg-gray-600'}`}>
//                                         <span className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${c.shortlisted ? 'translate-x-6' : 'translate-x-1'}`}></span>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//           </main>
//         ) : (
//             <div className="flex-1 p-8 flex items-center justify-center text-gray-500">
//                 <p>You haven't created any jobs yet. Click the '+' icon to get started.</p>
//             </div>
//         )}
//       </div>

//       <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />
//       <CandidateDetailModal candidate={viewingCandidate} onClose={() => setViewingCandidate(null)} />
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
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
      } catch (error) { console.error("Failed to fetch jobs", error); } 
      finally { setIsLoading(false); }
    };
    fetchJobs();
  }, []);

  // --- 2. Fetch Candidates When a Job is Selected ---
  useEffect(() => {
    if (selectedJob) {
      const fetchCandidates = async () => {
        try {
          // Fetch candidates for the currently selected job
          const { data } = await api.get(`/jobs/${selectedJob._id}/candidates`);
          setCandidates(data);
        } catch (error) { console.error("Failed to fetch candidates", error); }
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
      setCandidates(prev => [...prev, newCandidate].sort((a, b) => b.totalScore - a.totalScore));
    } catch (error) {
      console.error("Failed to upload resume", error);
      alert("Failed to upload and analyze resume.");
    }
  };
  
  // --- THIS IS THE FIX for the Shortlist Button ---
  const handleShortlistToggle = async (candidateId) => {
    try {
      // Call the new backend endpoint to toggle the shortlist status
      const { data: updatedCandidate } = await api.patch(`/candidates/${candidateId}/shortlist`);
      // Update the candidate's status in our local state without needing to refetch
      setCandidates(prev =>
        prev.map(c => (c._id === candidateId ? updatedCandidate : c))
      );
    } catch (error) {
        console.error("Failed to update shortlist status", error);
    }
  };
  
  // Memoized calculation for shortlisted count to improve performance
  const shortlistedCount = useMemo(() => {
    return candidates.filter(c => c.shortlisted).length;
  }, [candidates]);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar onAddNewJob={() => setIsModalOpen(true)} />

      {/* --- NEW UI FIX: Job List Sidebar --- */}
      <aside className="w-80 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6">My Job Postings</h2>
        {isLoading ? (
            <p className="text-gray-500">Loading...</p>
        ) : (
            <div className="space-y-3 overflow-y-auto">
                {jobs.map(job => (
                    <motion.div
                        key={job._id}
                        onClick={() => setSelectedJob(job)}
                        className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${selectedJob?._id === job._id ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-700/50 border-transparent hover:bg-gray-700'}`}
                    >
                        <h3 className="font-semibold text-white">{job.title}</h3>
                    </motion.div>
                ))}
            </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {selectedJob ? (
          <div>
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start">
                  <div>
                      <h1 className="text-3xl font-bold">{selectedJob.title}</h1>
                      <p className="text-gray-400 mt-2 max-w-2xl">{selectedJob.description}</p>
                  </div>
                  <label htmlFor="resume-upload" className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold rounded-md cursor-pointer hover:bg-purple-700 transition-colors flex-shrink-0">
                      Upload Resume
                  </label>
                  <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx" />
              </div>
              <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-700">
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1">
                      <p className="text-3xl font-bold">{candidates.length}</p>
                      <p className="text-sm text-gray-400">Total Applicants</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1">
                      <p className="text-3xl font-bold text-green-400">{shortlistedCount}</p>
                      <p className="text-sm text-gray-400">Shortlisted</p>
                  </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-4 w-16">Rank</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Score</th>
                            <th className="p-4 text-center">Shortlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c, index) => (
                            <tr key={c._id} onClick={() => setViewingCandidate(c)} className="hover:bg-gray-700/50 cursor-pointer border-b border-gray-700/50 last:border-b-0">
                                <td className="p-4 font-bold text-gray-400">{index + 1}</td>
                                <td className="p-4 font-semibold">{c.name}</td>
                                <td className="p-4 font-bold text-purple-400">{c.totalScore}</td>
                                <td className="p-4 flex justify-center">
                                    <div onClick={(e) => {e.stopPropagation(); handleShortlistToggle(c._id);}}
                                        className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${c.shortlisted ? 'bg-green-500' : 'bg-gray-600'}`}>
                                        <span className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${c.shortlisted ? 'translate-x-6' : 'translate-x-1'}`}></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
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

