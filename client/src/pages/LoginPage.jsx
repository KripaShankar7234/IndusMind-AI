import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('s.jenkins@titanheavy.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-7 h-7" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-slate-100">Enterprise Sign In</h2>
          <p className="text-xs text-slate-400">Access IndusMind AI Operations Brain Dashboard</p>
        </div>

        {/* Card Form */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#" className="text-[11px] text-blue-400 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0" />
                <span>Remember session for 30 days</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              icon={ArrowRight}
              className="w-full mt-2"
            >
              Sign In to Operations Hub
            </Button>
          </form>

          {/* Quick SSO options */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <p className="text-[11px] text-center text-slate-400 uppercase tracking-wider">
              Or Sign In with Single Sign-On (SSO)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-400" /> Azure AD SSO
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Okta SAML 2.0
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-slate-400">
          Don't have an enterprise account?{' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register Organization
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
