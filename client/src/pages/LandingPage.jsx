import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  Wrench,
  BarChart3,
  Lock,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Layers,
  Database
} from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0F172A] text-slate-100 overflow-hidden font-['Poppins',sans-serif]">
      {/* Animated Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/10 via-blue-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-nav px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-slate-100">IndusMind</span>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              AI
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-blue-400 transition-colors">Key Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">Asset Brain Architecture</a>
          <a href="#compliance" className="hover:text-blue-400 transition-colors">Safety & ISO Compliance</a>
          <a href="#roi" className="hover:text-blue-400 transition-colors">ROI Calculator</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/app/dashboard">
            <Button variant="primary" size="sm" icon={ArrowRight}>Launch Platform</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 lg:px-12 max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-8 shadow-lg shadow-blue-500/10"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Unified Asset & Operations Knowledge Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6"
        >
          Turn Scattered Industrial Docs into an <span className="text-gradient">Active Operational Brain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          IndusMind AI unifies OEM manuals, maintenance logs, SCADA telemetry, and ISO compliance standards into a zero-latency conversational intelligence engine for plant engineers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/register">
            <Button variant="primary" size="lg" icon={Zap} className="w-full sm:w-auto shadow-2xl">
              Start Free Enterprise Trial
            </Button>
          </Link>
          <Link to="/app/dashboard">
            <Button variant="glass" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Explore Live Demo Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Interactive Dashboard Showcase Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-slate-900/90 border border-slate-700/80 shadow-2xl glow-blue"
        >
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 font-mono ml-2">indusmind-ai://unit-alpha-turbine-query</span>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected: 42,800 Vector Chunks
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200">
                <p className="text-blue-400 font-bold mb-1">User Query (Plant Reliability Engineer):</p>
                <p>"What is the OEM tolerance for Gas Turbine GE 9HA rotor axial clearance during thermal startup?"</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 text-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> IndusMind Grounded Answer (99.2% Confidence)
                  </span>
                  <span className="text-[10px] text-slate-400">Response time: 320ms</span>
                </div>
                <p className="leading-relaxed">
                  Per GE-9HA-Man-v4.2 (Page 184): Axial clearance must be maintained between **1.85mm and 2.10mm** under warm restart conditions (350°C casing temperature).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-4">
            Engineered Specifically for Complex Heavy Industry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Generic LLMs hallucinate critical industrial specs. IndusMind AI is built with deterministic vector grounding & strict compliance verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="glass-card p-6 rounded-2xl border border-slate-700/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Multi-Format RAG Ingestion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ingest complex PDF technical manuals, DOCX work orders, CAD schematics, and high-resolution thermal imaging logs instantly.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-700/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Predictive Maintenance AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Correlate current equipment vibration signatures with historical failure modes to calculate root causes and preventive action plans.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-700/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Continuous ISO & OSHA Checker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated compliance gap analysis for ISO 9001/45001 and OSHA safety regulations with zero manual audit overhead.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Layers className="w-4 h-4" /> Enterprise Data Security Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              Air-Gapped Privacy & SOC2 Type II Certified
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your industrial proprietary documentation never leaves your perimeter. IndusMind AI supports on-premises deployment, private VPC clusters, and strict RBAC key management.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero model retraining on customer proprietary data.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-bit AES encryption at rest and TLS 1.3 in transit.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Native connectors for SAP PM, Maximo, and Honeywell SCADA.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">Industrial Vector Engine</h4>
                  <p className="text-xs text-slate-400">Milvus / Qdrant Hybrid Cluster</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-2xl font-extrabold text-blue-400">45%</p>
                <p className="text-[11px] text-slate-400 mt-1">MTTR Reduction</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-2xl font-extrabold text-emerald-400">$1.2M</p>
                <p className="text-[11px] text-slate-400 mt-1">Unplanned Outage Savings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="glass-card p-10 lg:p-16 rounded-3xl border border-blue-500/30 glow-blue space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Ready to Unify Your Industrial Knowledge Base?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Join leading heavy manufacturers, power utilities, and plant operations teams who rely on IndusMind AI.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={Zap}>
                Request Enterprise Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
