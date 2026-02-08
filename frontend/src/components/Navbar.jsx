// import React from 'react';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// const Navbar = () => {
//   return (
//     <nav className="absolute top-0 left-0 w-full z-10 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-white">
//           HireWise
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-4">
//           <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
//             Login
//           </Link>
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Link 
//               to="/register" 
//               className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
//             >
//               Sign Up
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          HireWise
        </Link>

        {/* Right Buttons */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 font-semibold hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
