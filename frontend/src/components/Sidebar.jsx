import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiPlusSquare, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ onAddNewJob }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-20 bg-gray-800 p-4 flex flex-col items-center justify-between">
      <div>
        <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold mb-10">
          HW
        </div>
        <ul className="space-y-6">
          <li className="p-3 bg-gray-700 rounded-lg cursor-pointer">
            <FiGrid size={24} className="text-white" />
          </li>
          <li onClick={onAddNewJob} className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
            <FiPlusSquare size={24} className="text-gray-400" />
          </li>
        </ul>
      </div>
      <div onClick={handleLogout} className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
        <FiLogOut size={24} className="text-gray-400" />
      </div>
    </div>
  );
};

export default Sidebar;