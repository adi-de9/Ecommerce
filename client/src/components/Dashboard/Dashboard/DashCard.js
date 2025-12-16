import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

function DashCard({ name, value, link }) {
  const gradients = {
    orders: 'from-blue-500 to-blue-600',
    products: 'from-green-500 to-green-600',
    category: 'from-purple-500 to-purple-600',
    color: 'from-pink-500 to-pink-600',
    user: 'from-orange-500 to-orange-600',
    payment: 'from-teal-500 to-teal-600',
    notification: 'from-indigo-500 to-indigo-600',
  };

  const gradient = gradients[name] || 'from-gray-500 to-gray-600';

  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:shadow-gray-900/30"
      style={{
        backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 transition-opacity group-hover:opacity-100`} />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="mb-4">
          <h1 className="mb-2 text-5xl font-bold text-white drop-shadow-lg">
            {value}
          </h1>
          <p className="text-lg font-semibold capitalize text-white text-opacity-90">
            {name}
          </p>
        </div>
        
        <div className="flex items-center justify-end text-white opacity-0 transition-opacity group-hover:opacity-100">
          <span className="mr-2 text-sm font-medium">View Details</span>
          <FaArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white opacity-10" />
    </Link>
  );
}

export default DashCard;
