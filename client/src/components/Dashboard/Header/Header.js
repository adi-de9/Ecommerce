import React from 'react';
import { Link } from 'react-router';
import logo from '../../../../images/favicon.png';
import HeaderProfileBtn from './HeaderProfileBtn';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header() {
  const { isUserLogin, userInfo } = useSelector((state) => state.auth);
  const { isDarkMode, toggleTheme } = useTheme();

  const navtext = [
    { text: 'Home', link: '/' },
    { text: 'Update', link: './update' },
    { text: 'Help', link: './help' },
  ];

  return (
    <>
      <div className="flex h-14 items-center justify-between gap-x-7 border-b border-gray-200 bg-white px-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-colors duration-200 lg:px-10">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12" />
          <span className="ml-2 hidden text-lg font-semibold text-gray-800 dark:text-white sm:inline">
            Dashboard
          </span>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <nav className="hidden items-center gap-1 md:flex">
            {navtext.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <HeaderProfileBtn username={userInfo.username} />
        </div>
      </div>
    </>
  );
}

export default Header;
