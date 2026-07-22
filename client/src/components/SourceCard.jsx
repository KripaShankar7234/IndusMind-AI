import React from 'react';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const SourceCard = ({ source, onViewDoc }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-blue-500/50 transition-colors group">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="truncate">
          <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
            {source.docName}
          </p>
          <p className="text-[11px] text-slate-400">{source.page}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          {source.score}
        </span>
        <button
          onClick={() => onViewDoc && onViewDoc(source)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          title="Open Document Chunk"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SourceCard;
