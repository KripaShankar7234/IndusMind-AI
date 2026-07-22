import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Bot,
  Wrench,
  ShieldCheck,
  FileSpreadsheet,
  Settings,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Documents', path: '/app/documents', icon: FileText, badge: '412' },
    { label: 'AI Assistant', path: '/app/assistant', icon: Bot, highlight: true },
    { label: 'Maintenance Intelligence', path: '/app/maintenance', icon: Wrench },
    { label: 'Compliance Checker', path: '/app/compliance', icon: ShieldCheck, badge: '92%' },
    { label: 'Reports', path: '/app/reports', icon: FileSpreadsheet },
    { label: 'Settings', path: '/app/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-64 glass-panel border-r border-slate-700/60 flex flex-col justify-between p-4 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Section title */}
          <div className="px-3 pt-2 pb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Operations Brain Navigation
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.highlight && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                      </span>
                    )}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Industrial AI Copilot Status Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            IndusMind v4.2 Active
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Real-time vector index connected to 14 Plant Facilities.
          </p>
          <NavLink
            to="/app/assistant"
            onClick={onClose}
            className="flex items-center justify-between text-blue-400 hover:text-blue-300 font-semibold text-[11px] group"
          >
            Launch Knowledge Query
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
