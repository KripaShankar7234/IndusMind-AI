import React, { useState } from 'react';
import { Send, Sparkles, Paperclip, Mic } from 'lucide-react';
import Button from './Button';

const ChatInput = ({ onSend, disabled, suggestedQuestions = [] }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Suggested Questions Pills */}
      {suggestedQuestions && suggestedQuestions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Prompts:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSend(q)}
              disabled={disabled}
              className="px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/50 border border-slate-700/70 text-xs text-slate-300 hover:text-blue-300 transition-all shrink-0 text-left"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Main Input Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus-within:border-blue-500/70 shadow-2xl backdrop-blur-xl transition-all"
      >
        <button
          type="button"
          className="p-2.5 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-colors shrink-0"
          title="Attach document chunk"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask IndusMind AI about equipment vibration, LOTO guidelines, or OEM repair steps..."
          rows={1}
          disabled={disabled}
          className="w-full py-2.5 px-2 bg-transparent text-slate-100 placeholder-slate-500 text-sm resize-none focus:outline-none max-h-32 min-h-[44px]"
        />

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-colors"
            title="Voice query"
          >
            <Mic className="w-5 h-5" />
          </button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!input.trim() || disabled}
            icon={Send}
            className="!p-2.5 !rounded-xl"
          />
        </div>
      </form>
      <p className="text-[11px] text-center text-slate-500 mt-2">
        IndusMind AI cross-references uploaded OEM manuals & ISO compliance standards in real-time.
      </p>
    </div>
  );
};

export default ChatInput;
