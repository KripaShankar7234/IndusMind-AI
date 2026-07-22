import React, { useState } from 'react';
import { Bot, User, Copy, Check, ShieldCheck, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import SourceCard from './SourceCard';

const ChatMessage = ({ message, onViewDoc }) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Markdown Parser for headers, bold, bullet lists, blockquotes, and code blocks
  const renderMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-slate-100 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Header 4
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm font-semibold text-blue-400 mt-3 mb-1.5">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="my-3 pl-4 py-2 border-l-4 border-blue-500 bg-blue-950/30 text-slate-300 text-xs italic rounded-r-lg"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      // Bullet list item
      if (line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ')) {
        return (
          <div key={idx} className="flex gap-2 my-1 text-sm text-slate-200 pl-2">
            <span className="font-semibold text-blue-400">{line.trim().split(' ')[0]}</span>
            <span>{line.trim().replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-sm text-slate-200 pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
            <span>{line.trim().substring(2)}</span>
          </div>
        );
      }
      // Empty line spacing
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      // Handle inline bold text **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-sm leading-relaxed text-slate-200 my-1">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-100">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-4 p-4 lg:p-6 ${isAssistant ? 'bg-slate-900/40 border-y border-slate-800/40' : ''}`}>
      {/* Avatar */}
      <div className="shrink-0">
        {isAssistant ? (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 border border-blue-400/30 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-200">
              {isAssistant ? 'IndusMind AI Engine' : 'Dr. Sarah Jenkins'}
            </span>
            <span className="text-xs text-slate-500">{message.timestamp}</span>
          </div>

          {/* Confidence Badge */}
          {isAssistant && message.confidenceScore && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                {message.confidenceScore}% Confidence
              </span>
            </div>
          )}
        </div>

        {/* Message Text */}
        <div className="prose prose-invert max-w-none">{renderMarkdown(message.text)}</div>

        {/* Sources Section */}
        {isAssistant && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Grounded Source Citations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {message.sources.map((src, sIdx) => (
                <SourceCard key={sIdx} source={src} onViewDoc={onViewDoc} />
              ))}
            </div>
          </div>
        )}

        {/* Action bar for Assistant */}
        {isAssistant && (
          <div className="flex items-center gap-2 mt-4 pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-700/60 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
