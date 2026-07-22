import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700/80 p-3 rounded-xl shadow-xl text-xs">
        <p className="font-semibold text-slate-200 mb-1">{label}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-slate-300">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}:</span>
            <span className="font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const DocumentsChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="documents" name="Documents Uploaded" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#docGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ComplianceChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="facility" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" name="Compliance %" fill="#22C55E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AIUsageChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="queries" name="AI Queries" stroke="#38BDF8" strokeWidth={3} dot={{ r: 4, fill: '#38BDF8' }} />
          <Line type="monotone" dataKey="rcaGenerated" name="RCA Reports" stroke="#A855F7" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DonutChart = ({ data }) => {
  const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444'];
  return (
    <div className="w-full h-48 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
