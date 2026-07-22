import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  DocumentsChart,
  ComplianceChart,
  AIUsageChart
} from '../components/Chart';
import { useDocument } from '../context/DocumentContext';
import {
  FileText,
  Cpu,
  Bot,
  ShieldCheck,
  Upload,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  ExternalLink
} from 'lucide-react';

const mockUploadHistoryData = [
  { name: 'Mon', documents: 24 },
  { name: 'Tue', documents: 42 },
  { name: 'Wed', documents: 68 },
  { name: 'Thu', documents: 55 },
  { name: 'Fri', documents: 94 },
  { name: 'Sat', documents: 38 },
  { name: 'Sun', documents: 91 }
];

const mockComplianceData = [
  { facility: 'Power Gen Alpha', score: 96 },
  { facility: 'Refinery West', score: 88 },
  { facility: 'Chemical Plant B', score: 94 },
  { facility: 'Offshore Rig 4', score: 82 },
  { facility: 'Utilities Yard', score: 98 }
];

const mockAIUsageData = [
  { day: '07/15', queries: 140, rcaGenerated: 12 },
  { day: '07/16', queries: 210, rcaGenerated: 18 },
  { day: '07/17', queries: 320, rcaGenerated: 26 },
  { day: '07/18', queries: 280, rcaGenerated: 22 },
  { day: '07/19', queries: 410, rcaGenerated: 34 },
  { day: '07/20', queries: 390, rcaGenerated: 29 },
  { day: '07/21', queries: 512, rcaGenerated: 42 }
];

const DashboardPage = () => {
  const { documents, setPreviewDoc } = useDocument();

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-700/60">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
            <Cpu className="w-4 h-4 animate-pulse" />
            Active Operations Brain Cluster #09
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
            Industrial Knowledge Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, document vector index, & predictive AI health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/app/documents">
            <Button variant="primary" size="sm" icon={Upload}>
              Ingest Document
            </Button>
          </Link>
          <Link to="/app/assistant">
            <Button variant="accent" size="sm" icon={Bot}>
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Main Dashboard Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <Card hoverEffect={true} className="!p-5">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-400 gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14%
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-100">412</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Total Documents</p>
            <p className="text-[10px] text-slate-500 mt-1">42,800 pages embedded</p>
          </div>
        </Card>

        {/* Card 2 */}
        <Card hoverEffect={true} className="!p-5">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[11px] font-bold text-slate-400">
              14 Plants
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-100">148</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Equipment Count</p>
            <p className="text-[10px] text-emerald-400 mt-1">98.2% telemetry online</p>
          </div>
        </Card>

        {/* Card 3 */}
        <Card hoverEffect={true} className="!p-5">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-400 gap-0.5">
              <TrendingUp className="w-3 h-3" /> +32%
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-100">1,842</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">AI Queries</p>
            <p className="text-[10px] text-slate-500 mt-1">340ms avg latency</p>
          </div>
        </Card>

        {/* Card 4 */}
        <Card hoverEffect={true} className="!p-5">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Optimal
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-100">92%</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Compliance Status</p>
            <p className="text-[10px] text-slate-500 mt-1">3 safety gaps flagged</p>
          </div>
        </Card>

        {/* Card 5 */}
        <Card hoverEffect={true} className="!p-5">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[11px] font-bold text-blue-400">
              Live Feed
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-100">28 Today</h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Recent Uploads</p>
            <p className="text-[10px] text-slate-500 mt-1">Latest: OEM Spec v4.2</p>
          </div>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Documents Uploaded Area Chart */}
        <Card
          title="Documents Ingested Over Time"
          subtitle="Daily vector embeddings processed into memory"
          badge="Weekly Trend"
          badgeColor="blue"
          className="lg:col-span-2"
        >
          <DocumentsChart data={mockUploadHistoryData} />
        </Card>

        {/* Chart 2: Compliance Progress Bar Chart */}
        <Card
          title="Facility Compliance Progress"
          subtitle="ISO 45001 & OSHA Audit Score"
          badge="Compliance"
          badgeColor="green"
        >
          <ComplianceChart data={mockComplianceData} />
        </Card>
      </div>

      {/* AI Usage & Recent Uploads List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: AI Query Volume & RCA Reports Line Chart */}
        <Card
          title="AI Knowledge Query Volume"
          subtitle="Queries vs RCA Reports generated by engineers"
          badge="AI Analytics"
          badgeColor="purple"
          className="lg:col-span-2"
        >
          <AIUsageChart data={mockAIUsageData} />
        </Card>

        {/* Recent Uploads Feed */}
        <Card
          title="Recent Uploaded Documents"
          subtitle="Parsed vector indexes"
          action={
            <Link to="/app/documents" className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <div className="space-y-3 mt-2">
            {documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => setPreviewDoc(doc)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-blue-500/40 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                      {doc.filename}
                    </p>
                    <p className="text-[10px] text-slate-400">{doc.size} • {doc.uploadDate}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
