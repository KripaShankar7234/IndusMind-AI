import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNotification } from '../context/NotificationContext';
import {
  FileSpreadsheet,
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  Printer,
  Share2,
  Layers,
  Building
} from 'lucide-react';

const ReportsPage = () => {
  const [selectedReportType, setSelectedReportType] = useState('Root Cause Analysis');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const { showSuccess, showInfo } = useNotification();

  const reportTypes = [
    {
      id: 'rca',
      name: 'Root Cause Analysis',
      desc: 'Deep diagnostic report correlating vibration spectra, lube oil thermal drift, and historical failure modes.'
    },
    {
      id: 'maint',
      name: 'Maintenance Report',
      desc: 'Plant-wide equipment health scores, preventive maintenance checklists, and OEM component replacement intervals.'
    },
    {
      id: 'audit',
      name: 'Audit Summary',
      desc: 'ISO 45001 & EHS safety gap breakdown, compliance percentage dials, and missing document certifications.'
    }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    showInfo(`Compiling grounded ${selectedReportType}...`);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        title: `${selectedReportType} - Plant Unit Alpha`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        reportId: 'RPT-2026-INDUS-' + Math.floor(Math.random() * 9000 + 1000),
        author: 'Dr. Sarah Jenkins (Chief Reliability Lead)',
        type: selectedReportType,
        summary: `This report summarizes operational intelligence for Gas Turbine GE 9HA and High-Pressure Boiler Feed Pump B FP-01B. Ingestion covers 412 OEM manual pages and 28 historical incident logs.`,
        sections: [
          {
            heading: '1. Executive Summary & Asset Status',
            content: 'Gas Turbine Unit #2 is operating at 68% health index due to elevated Stage 1 rotor axial vibration (7.2 mm/s). Mechanical alignment checks recommended within 24 operating hours.'
          },
          {
            heading: '2. Grounded OEM Manual Specifications',
            content: 'Per OEM Manual GE-9HA-Man-v4.2 (Page 184): Lube oil inlet manifold temperature must be maintained at 42°C ± 2°C to prevent oil whirl instability.'
          },
          {
            heading: '3. Corrective Action Matrix',
            content: 'Replace lube oil anti-whirl sleeve insert during upcoming outage window. Perform laser optical alignment check.'
          }
        ]
      });
      showSuccess(`Generated ${selectedReportType} successfully!`);
    }, 1500);
  };

  const handleDownloadPdf = () => {
    showSuccess('Downloading Official Enterprise Report PDF...');
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
            Industrial Executive Report Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesize grounded technical reports, root-cause analyses, and audit summaries ready for PDF export.
          </p>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedReportType(type.name)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedReportType === type.name
                ? 'bg-blue-600/20 border-blue-500 glow-blue shadow-xl'
                : 'glass-card hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              {selectedReportType === type.name && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Selected
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-100 text-sm mb-1">{type.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{type.desc}</p>
          </div>
        ))}
      </div>

      {/* Action Trigger Card */}
      <Card hoverEffect={false} className="!p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-100 text-base">Generate Report: {selectedReportType}</h3>
          <p className="text-xs text-slate-400">Target Asset: Plant Unit Alpha (Titan Heavy Industries)</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          loading={isGenerating}
          icon={Sparkles}
          onClick={handleGenerateReport}
        >
          {isGenerating ? 'Compiling Report...' : 'Generate Enterprise Report'}
        </Button>
      </Card>

      {/* Generated Report PDF Preview Card */}
      {generatedReport && (
        <Card
          title="Generated Executive Report Preview"
          subtitle={`Report ID: ${generatedReport.reportId}`}
          action={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" icon={Printer} onClick={handleDownloadPdf}>
                Print Report
              </Button>
              <Button variant="accent" size="sm" icon={Download} onClick={handleDownloadPdf}>
                Download PDF
              </Button>
            </div>
          }
        >
          {/* Printable Report Document Card */}
          <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-200 space-y-6 mt-2 print:bg-white print:text-black">
            {/* Report Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-extrabold text-lg mb-1">
                  <Building className="w-5 h-5" /> IndusMind AI Operations Brain
                </div>
                <h2 className="text-xl font-bold text-slate-100">{generatedReport.title}</h2>
                <p className="text-xs text-slate-400">Author: {generatedReport.author}</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p className="font-mono text-blue-400 font-bold">{generatedReport.reportId}</p>
                <p>{generatedReport.date}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Verified Grounded
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
              <strong>Executive Overview: </strong>{generatedReport.summary}
            </div>

            {/* Report Sections */}
            <div className="space-y-4">
              {generatedReport.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-bold text-slate-100 text-sm text-blue-400">{sec.heading}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-slate-700">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Sign-off footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <p>Generated via IndusMind AI Grounded Vector Engine • Enterprise License #9941</p>
              <p>Confidential Industrial Telemetry Data</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportsPage;
