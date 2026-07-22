import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { complianceApi } from '../services/apiService';
import {
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  Lightbulb,
  CheckCircle2,
  Download,
  Plus
} from 'lucide-react';

const CompliancePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const res = await complianceApi.getComplianceData();
    setData(res);
    setLoading(false);
  };

  if (loading || !data) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
            EHS, OSHA & ISO Compliance Checker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time compliance gap analysis against ISO 45001, ISO 9001, and OSHA Title 29.
          </p>
        </div>
        <Button variant="accent" size="sm" icon={ShieldCheck}>
          Run Full Regulatory Audit
        </Button>
      </div>

      {/* Compliance Score Dial & Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Compliance Percentage Progress Card */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 glow-green flex flex-col items-center justify-center text-center">
          <div className="relative w-36 h-36 flex items-center justify-center mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${data.overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-100">{data.overallScore}%</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Compliant</span>
            </div>
          </div>
          <h3 className="font-bold text-slate-100 text-sm">Overall Audit Rating</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{data.auditsPassed} / {data.totalAudits} Mandates Verified</p>
        </div>

        {/* Breakdown Summary */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card hoverEffect={true} className="!p-5">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-100">{data.safetyGaps.length}</h3>
            <p className="text-xs font-semibold text-slate-300 mt-1">Identified Safety Gaps</p>
            <p className="text-[10px] text-rose-400 mt-1">2 High risk items requires action</p>
          </Card>

          <Card hoverEffect={true} className="!p-5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
              <FileWarning className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-100">{data.missingDocs.length}</h3>
            <p className="text-xs font-semibold text-slate-300 mt-1">Missing Documents</p>
            <p className="text-[10px] text-amber-400 mt-1">Certifications overdue</p>
          </Card>

          <Card hoverEffect={true} className="!p-5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-100">{data.recommendations.length}</h3>
            <p className="text-xs font-semibold text-slate-300 mt-1">AI Recommendations</p>
            <p className="text-[10px] text-blue-400 mt-1">Auto-generated corrective steps</p>
          </Card>
        </div>
      </div>

      {/* Safety Gaps & Missing Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Gaps Section */}
        <Card
          title="Active Safety & Regulatory Gaps"
          subtitle="OSHA & ISO framework violations"
          badge="High Priority"
          badgeColor="red"
        >
          <div className="space-y-3 mt-2">
            {data.safetyGaps.map((gap, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {gap.code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{gap.area}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 leading-snug">{gap.title}</h4>
              </div>
            ))}
          </div>
        </Card>

        {/* Missing Documents Section */}
        <Card
          title="Missing Regulatory Documentation"
          subtitle="Certificates required for upcoming ISO audit"
          badge="Required Docs"
          badgeColor="amber"
        >
          <div className="space-y-3 mt-2">
            {data.missingDocs.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <FileWarning className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{doc}</h4>
                    <p className="text-[10px] text-slate-400">Status: Missing Certification</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" icon={Plus}>
                  Upload
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Compliance Recommendations */}
      <Card
        title="AI-Generated Corrective Action Recommendations"
        subtitle="Automated guidance derived from OEM specifications and safety standards"
        icon={Lightbulb}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {data.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" /> Recommendation #{idx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompliancePage;
