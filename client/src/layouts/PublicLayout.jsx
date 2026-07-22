import React from 'react';
import { Outlet } from 'react-router-dom';
import Toast from '../components/Toast';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Poppins',sans-serif]">
      <Toast />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
