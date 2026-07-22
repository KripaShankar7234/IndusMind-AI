import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import { useDocument } from '../context/DocumentContext';
import { FileText, Download, CheckCircle, Shield } from 'lucide-react';
import Button from '../components/Button';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { previewDoc, setPreviewDoc } = useDocument();

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Poppins',sans-serif]">
      {/* Toast Notification Container */}
      <Toast />

      {/* Header Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />

      {/* Main Body with Sidebar + Dynamic Route Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={`Document Preview: ${previewDoc?.filename || 'File Details'}`}
      >
        {previewDoc && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-sm">{previewDoc.filename}</h4>
                  <p className="text-xs text-slate-400">
                    Size: {previewDoc.size} | Uploaded: {previewDoc.uploadDate} | Category: {previewDoc.category}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {previewDoc.status}
              </span>
            </div>

            {/* Simulated Vector Excerpt Viewer */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Vector Vectorized Index: <strong>412 Pages</strong></span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" /> Embedded Confidence 99.4%
                </span>
              </div>
              
              <div className="text-xs text-slate-300 font-mono space-y-2 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800/80 max-h-60 overflow-y-auto">
                <p className="text-blue-400 font-semibold">[CHUNK ID #8849-B | Section 4.2 Maintenance Specs]</p>
                <p>
                  "Operating limits for High-Pressure Stage 1 Rotor Assembly require bearing lube oil inlet pressure to remain constant at 2.4 bar ± 0.1 bar. Any pressure drops exceeding 15% warrant immediate inspection of secondary filter banks."
                </p>
                <p className="text-blue-400 font-semibold">[CHUNK ID #8850-A | Torque Tables]</p>
                <p>
                  "Tighten casing flange bolts M36 Grade 8.8 in star pattern to 420 Nm using calibrated hydraulic torque wrench."
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
                Close Viewer
              </Button>
              <Button variant="primary" size="sm" icon={Download}>
                Download Original Asset File
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardLayout;
