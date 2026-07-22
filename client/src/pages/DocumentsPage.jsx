import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';
import UploadBox from '../components/UploadBox';
import Table from '../components/Table';
import Button from '../components/Button';
import Card from '../components/Card';
import {
  FileText,
  Trash2,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const DocumentsPage = () => {
  const { documents, uploadFile, deleteDoc, setPreviewDoc } = useDocument();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'OEM Manual', 'Compliance', 'Technical Spec', 'Inspection', 'Incident RCA'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const columns = [
    {
      header: 'Filename & Category',
      accessor: 'filename',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-100 text-xs hover:text-blue-400 transition-colors">
              {row.filename}
            </p>
            <p className="text-[10px] text-slate-400">{row.category} • {row.indexedPages || 80} Pages Vectorized</p>
          </div>
        </div>
      )
    },
    {
      header: 'File Size',
      accessor: 'size',
      render: (row) => <span className="text-xs font-mono text-slate-300">{row.size}</span>
    },
    {
      header: 'Upload Date',
      accessor: 'uploadDate',
      render: (row) => <span className="text-xs text-slate-400">{row.uploadDate}</span>
    },
    {
      header: 'Indexing Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            row.status === 'Processed'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
          }`}
        >
          {row.status === 'Processed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setPreviewDoc(row)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 transition-colors"
            title="Preview Vector Index"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteDoc(row.id)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-400 transition-colors"
            title="Delete Document"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
          Industrial Vector Document Store
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload and index OEM specs, compliance certificates, and maintenance history docs.
        </p>
      </div>

      {/* Drag and Drop Upload Component */}
      <UploadBox onUpload={uploadFile} />

      {/* Filter and Search Bar */}
      <Card hoverEffect={false} className="!p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search document name..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Document Data Table */}
      <Table
        columns={columns}
        data={filteredDocs}
        emptyMessage="No documents match your query filter"
        onRowClick={(row) => setPreviewDoc(row)}
      />
    </div>
  );
};

export default DocumentsPage;
