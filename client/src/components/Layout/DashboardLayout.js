import React from 'react';
import DashboardHeader from '../Dashboard/Header/Header';
import DashboardSidebar from '../Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';
import { ThemeProvider } from '../../context/ThemeContext';

const DashboardLayout = () => {
  return (
    <ThemeProvider>
      <div className="fixed h-full w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <DashboardHeader />
        <div className="flex h-[calc(100vh-3.5rem)]">
          <DashboardSidebar />
          <div className="flex-1 overflow-auto">
            <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
