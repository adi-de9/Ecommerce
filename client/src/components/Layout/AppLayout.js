import React from 'react';
import Header from '../Header/Header';
import Footer from '../../screens/Footer/Footer';
import { Outlet } from 'react-router';

const Applayout = () => {
  return (
    <div className="app max-w-[1440px] mx-auto">
      <Header />
      <div className="min-h-[90vh] pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Applayout;
