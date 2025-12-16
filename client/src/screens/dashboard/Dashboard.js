import React, { useEffect } from 'react';
import DashCard from '../../components/Dashboard/Dashboard/DashCard';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsCount } from '../../features/dashboardSlice';
import { FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const dispatch = useDispatch();
  const { itemCounts, isLoading } = useSelector((state) => state.dashboard);
  console.log(itemCounts);
  
  useEffect(() => {
    dispatch(getItemsCount());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <FaSpinner className="animate-spin text-blue-600 dark:text-blue-500" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itemCounts &&
            itemCounts.map((e, index) => (
              <DashCard
                name={e[0]}
                key={index}
                value={e[1]}
                link={`./${e[0].toLowerCase()}s`}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
