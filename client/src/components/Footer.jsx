import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Shield, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1120] border-t border-slate-800 text-slate-400 text-xs py-12 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-slate-100">IndusMind AI</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Enterprise Industrial Knowledge Intelligence – Unified Asset & Operations Brain for heavy manufacturing, power utilities, & oil & gas.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-4 text-xs">Platform Solutions</h4>
          <ul className="space-y-2.5">
            <li><Link to="/app/assistant" className="hover:text-blue-400 transition-colors">OEM Manual Copilot</Link></li>
            <li><Link to="/app/maintenance" className="hover:text-blue-400 transition-colors">Root Cause Analysis (RCA)</Link></li>
            <li><Link to="/app/compliance" className="hover:text-blue-400 transition-colors">OSHA & ISO 45001 Checker</Link></li>
            <li><Link to="/app/documents" className="hover:text-blue-400 transition-colors">Industrial RAG Vector Store</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-4 text-xs">Enterprise & Security</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-blue-400 transition-colors">SOC2 Type II Compliance</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">On-Premises & Air-Gapped Deployments</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">SCADA & SAP PM Connectors</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Data Privacy & Zero Training Commitment</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-4 text-xs">Global Contact</h4>
          <p className="text-slate-400 mb-3">Enterprise Sales & Support Hubs in Houston, Frankfurt, & Singapore.</p>
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Mail className="w-4 h-4 text-blue-400" /> enterprise@indusmind.ai
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Encrypted 256-bit AES ISO 27001 Certified</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <p>© 2026 IndusMind AI Systems Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Enterprise Service</a>
          <a href="#" className="hover:text-slate-400">Security Architecture</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
