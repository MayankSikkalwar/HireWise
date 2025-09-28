// import React, { useState } from 'react';
// /* eslint-disable no-unused-vars */
// import { motion, AnimatePresence } from 'framer-motion';
// import api from '../api/apiService';

// const CreateJobModal = ({ isOpen, onClose, onJobCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       const { data } = await api.post('/jobs', { title, description });
//       onJobCreated(data); // Pass the new job data back to the dashboard
//       onClose(); // Close the modal
//     } catch (error) {
//       setError('Failed to create job. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-2xl font-bold text-white mb-6">Create New Job Posting</h2>
//             <form onSubmit={handleSubmit}>
//               {error && <div className="text-red-400 mb-4">{error}</div>}
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-300">Job Title</label>
//                   <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
//                 </div>
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-300">Job Description</label>
//                   <textarea id="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-4">
//                 <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Cancel</button>
//                 <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50">
//                   {isLoading ? 'Creating...' : 'Create Job'}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CreateJobModal;
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../api/apiService';

const CreateJobModal = ({ isOpen, onClose, onJobCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // --- NEW: State to manage criteria ---
  const [criteria, setCriteria] = useState([
    { criteria: '', weight: 5 }
  ]);
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Create New Job Posting</h2>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2">
              {error && <div className="text-red-400 mb-4">{error}</div>}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">Job Title</label>
                  <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300">Job Description</label>
                  <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
                </div>
                {/* --- NEW: Scoring Criteria Section --- */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Scoring Criteria</h3>
                    <div className="space-y-3">
                        {criteria.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input type="text" placeholder={`Criterion ${index + 1}`} value={item.criteria}
                                    onChange={(e) => handleCriterionChange(index, 'criteria', e.target.value)}
                                    className="flex-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500" required/>
                                <input type="number" min="1" max="10" placeholder="Weight" value={item.weight}
                                    onChange={(e) => handleCriterionChange(index, 'weight', parseInt(e.target.value))}
                                    className="w-24 bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500" required/>
                                <button type="button" onClick={() => handleRemoveCriterion(index)} className="p-2 text-gray-400 hover:text-red-400">
                                    <FiTrash2/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddCriterion} className="mt-3 flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300">
                        <FiPlus/>
                        <span>Add Criterion</span>
                    </button>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4 pt-4 border-t border-gray-700">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50">
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
