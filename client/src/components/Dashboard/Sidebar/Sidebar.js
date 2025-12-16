import React, { useState } from 'react';
import SideNavbar from './SideNavbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { logout } from '../../../features/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
    toast.success('User logged out');
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-4 top-20 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg dark:bg-gray-800 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-72 transform border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 dark:border-gray-700 dark:bg-gray-800 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col py-4">
          <SideNavbar onLinkClick={() => setIsSidebarOpen(false)} />
          <div className="mt-auto px-4">
            <button
              onClick={handleLogout}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-700 font-semibold text-white shadow-md transition-all hover:from-red-700 hover:to-red-800 hover:shadow-lg dark:from-red-700 dark:to-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
