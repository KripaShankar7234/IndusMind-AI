import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BrainCircuit,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Shield,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left section: Logo & Sidebar toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors lg:hidden"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/app/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-100 tracking-tight">IndusMind</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
              Industrial Knowledge Brain
            </p>
          </div>
        </Link>
      </div>

      {/* Middle Section: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search equipment tag, failure mode, ISO clause, document..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-700/70 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: Notifications, Org Badge, Profile */}
      <div className="flex items-center gap-3">
        {/* Org Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 font-medium">{user?.org || 'Titan Heavy Industries'}</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2.5 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700/60"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-lg object-cover border border-blue-500/40"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{user?.name || 'Dr. Sarah Jenkins'}</p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{user?.role || 'Plant Reliability Lead'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1E293B] border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-slate-700/60 mb-1">
                <p className="text-xs font-bold text-slate-200">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <Link
                to="/app/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <User className="w-4 h-4 text-blue-400" />
                Profile Details
              </Link>
              <Link
                to="/app/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Account Settings
              </Link>

              <div className="border-t border-slate-700/60 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
