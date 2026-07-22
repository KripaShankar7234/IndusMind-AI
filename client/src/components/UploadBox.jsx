import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, File, Image, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';

const UploadBox = ({ onUpload, acceptedFormats = '.pdf,.docx,.jpg,.png' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setUploading(true);
    if (onUpload) {
      await onUpload(file);
    }
    setUploading(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 cursor-pointer ${
        isDragging
          ? 'border-blue-500 bg-blue-600/10 scale-[1.01]'
          : 'border-slate-700/80 hover:border-blue-500/60 bg-slate-900/40 hover:bg-slate-900/70'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <h3 className="text-lg font-semibold text-slate-100 mb-1">
          Drag & Drop Industrial Documents Here
        </h3>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Upload OEM Manuals, Maintenance Reports, Thermal Scans, or Compliance Checklists
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
            <FileText className="w-3.5 h-3.5 text-rose-400" /> PDF
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
            <File className="w-3.5 h-3.5 text-blue-400" /> DOCX
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
            <Image className="w-3.5 h-3.5 text-emerald-400" /> PNG / JPG
          </span>
        </div>

        <Button variant="primary" loading={uploading} icon={UploadCloud}>
          {uploading ? 'Parsing & Indexing...' : 'Browse Computer Files'}
        </Button>
      </div>
    </div>
  );
};

export default UploadBox;
