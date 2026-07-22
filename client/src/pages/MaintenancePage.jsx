import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { maintenanceApi } from '../services/apiService';
import {
  Wrench,
  AlertTriangle,
  History,
  BookOpen,
  CheckSquare,
  ShieldAlert,
  Activity,
  ArrowRight,
  ChevronDown,
  Filter
} from 'lucide-react';

const MaintenancePage = () => {
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await maintenanceApi.getMaintenanceOverview();
    setOverview(data);
    if (data.length > 0) setSelectedItem(data[0]);
    setLoading(false);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Medium':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
            Maintenance Intelligence & Anomaly RCA
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated root-cause diagnostics grounded in historical failure logs & OEM manual specifications.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Wrench}>
          Trigger Borescope Diagnostic
        </Button>
      </div>

      {/* Grid selector for Equipment Units */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {overview.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedItem?.id === item.id
                ? 'bg-slate-800/90 border-blue-500 glow-blue scale-[1.01]'
                : 'glass-card hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${getSeverityBadge(item.severity)}`}>
                {item.severity} Severity
              </span>
              <span className="text-xs text-slate-400 font-mono">{item.tagId}</span>
            </div>

            <h3 className="font-bold text-slate-100 text-sm mb-1">{item.equipment}</h3>
            <p className="text-[11px] text-slate-400 mb-3">{item.location}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
              <span className="text-slate-400">Health Index:</span>
              <span className={`font-extrabold ${item.healthScore < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {item.healthScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Equipment Intelligence Breakdown */}
      {selectedItem && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-blue-400 font-mono">TAG: {selectedItem.tagId}</span>
                <h2 className="text-xl font-extrabold text-slate-100">{selectedItem.equipment}</h2>
                <p className="text-xs text-slate-400">{selectedItem.location}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityBadge(selectedItem.severity)}`}>
                  {selectedItem.status}
                </span>
              </div>
            </div>

            {/* 5 Required Intelligence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Possible Cause */}
              <Card
                title="AI Inferred Possible Cause"
                icon={AlertTriangle}
                badge="Root Cause Inferred"
                badgeColor="red"
              >
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-rose-950/20 p-4 rounded-xl border border-rose-500/20">
                  {selectedItem.possibleCause}
                </p>
              </Card>

              {/* Card 2: OEM Recommendation */}
              <Card
                title="OEM Manual Recommendation"
                icon={BookOpen}
                badge="GE 9HA Spec v4.2"
                badgeColor="blue"
              >
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-blue-950/20 p-4 rounded-xl border border-blue-500/20">
                  {selectedItem.oemRecommendation}
                </p>
              </Card>

              {/* Card 3: Previous Failures History Timeline */}
              <Card
                title="Previous Failures & Resolution Log"
                icon={History}
                badge="Historical Matches"
                badgeColor="purple"
              >
                <div className="space-y-3">
                  {selectedItem.previousFailures.map((fail, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-semibold text-rose-400">{fail.date}</span>
                        <span>Resolved</span>
                      </div>
                      <p className="font-medium text-slate-200">{fail.issue}</p>
                      <p className="text-[11px] text-emerald-400">Fix: {fail.resolution}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Card 4: Preventive Maintenance Checklist */}
              <Card
                title="Preventive Maintenance Plan"
                icon={CheckSquare}
                badge="PM Schedule"
                badgeColor="green"
              >
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 font-mono bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
                    {selectedItem.preventiveAction}
                  </p>
                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-emerald-500" />
                      <span>Calibrate lube oil temperature manifold sensors (Target: 42°C)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-emerald-500" />
                      <span>Extract 250ml sample for ISO 4406 varnish oxidation count</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
