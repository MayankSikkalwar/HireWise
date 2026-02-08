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
    <div className="w-24 bg-slate-950/80 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.35)]">
          <div className="w-14 h-14 rounded-2xl bg-slate-950/90 flex items-center justify-center text-white text-lg font-bold tracking-tight">
            HW
          </div>
        </div>

        <ul className="w-full space-y-3">
          <li className="p-3.5 rounded-xl cursor-pointer bg-violet-500/20 border border-violet-300/30 shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-all duration-200">
            <FiGrid size={22} className="text-violet-200 mx-auto" />
          </li>
          <li
            onClick={onAddNewJob}
            className="p-3.5 rounded-xl cursor-pointer border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200"
          >
            <FiPlusSquare size={22} className="text-slate-300 mx-auto" />
          </li>
        </ul>
      </div>

      <div className="w-full mt-auto pt-6 border-t border-white/10">
        <div
          onClick={handleLogout}
          className="p-3.5 rounded-xl cursor-pointer border border-transparent hover:border-rose-300/20 hover:bg-rose-500/10 transition-all duration-200"
        >
          <FiLogOut size={22} className="text-slate-300 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
