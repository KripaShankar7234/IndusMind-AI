import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useDocument } from '../context/DocumentContext';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import {
  Bot,
  Plus,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Search
} from 'lucide-react';
import Button from '../components/Button';

const suggestedQuestions = [
  'What is the OEM bearing vibration limit for GE 9HA Gas Turbine?',
  'Generate ISO 45001 LOTO checklist for Boiler Feed Pump BFP-01B.',
  'Analyze Stage 2 Compressor failure RCA and recommended actions.',
  'What is the recommended lube oil viscosity for 400°C turbine operating temp?'
];

const AIAssistantPage = () => {
  const { conversations, activeConvId, setActiveConvId, messages, isTyping, sendMessage, startNewChat } = useChat();
  const { setPreviewDoc, documents } = useDocument();
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleViewSourceDoc = (source) => {
    const matched = documents.find((d) => d.filename.toLowerCase().includes(source.docName.toLowerCase().split('.')[0]));
    if (matched) {
      setPreviewDoc(matched);
    } else {
      setPreviewDoc({
        filename: source.docName,
        size: '18.4 MB',
        uploadDate: '2026-07-20',
        category: 'OEM Technical Manual',
        status: 'Processed'
      });
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-4 overflow-hidden -m-4 sm:-m-6 lg:-m-8">
      {/* Left Chat History Panel (Desktop & Tablet) */}
      <div className="hidden lg:flex w-72 glass-panel border-r border-slate-700/60 flex-col p-4 shrink-0 bg-slate-900/60">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={startNewChat}
          className="w-full mb-4 shadow-lg"
        >
          New Reliability Chat
        </Button>

        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
          Conversation Log
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs ${
                activeConvId === conv.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <MessageSquare className="w-4 h-4 shrink-0 text-blue-400" />
                <span className="truncate">{conv.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Index telemetry summary */}
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 px-1">
          <div className="flex items-center justify-between">
            <span>Vector Grounding:</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Latency SLA:</span>
            <span className="text-slate-200 font-mono">&lt; 350ms</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950/40 relative overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 glass-nav border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100">IndusMind Copilot Enterprise</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Connected to 412 Plant OEM Manuals & ISO Audits</p>
            </div>
          </div>

          <Button variant="ghost" size="sm" icon={RefreshCw} onClick={startNewChat}>
            Reset Session
          </Button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-2 p-4 sm:p-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onViewDoc={handleViewSourceDoc} />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 p-4 lg:p-6 bg-slate-900/40 border-y border-slate-800/40 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Cpu className="w-5 h-5 animate-spin" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Vectorizing embedding spaces & synthesizing OEM citations</span>
                <span className="typing-cursor" />
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0">
          <ChatInput
            onSend={sendMessage}
            disabled={isTyping}
            suggestedQuestions={messages.length <= 1 ? suggestedQuestions : []}
          />
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
