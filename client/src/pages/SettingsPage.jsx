import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  User,
  Key,
  Moon,
  Bell,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  Save
} from 'lucide-react';

const SettingsPage = () => {
  const { user, updateApiKey } = useAuth();
  const { showSuccess } = useNotification();

  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: user?.name || 'Dr. Sarah Jenkins',
    email: user?.email || 's.jenkins@titanheavy.com',
    role: user?.role || 'Chief Reliability Engineer',
    org: user?.org || 'Titan Heavy Industries'
  });

  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    slackWebhook: true,
    rcaTrigger: true,
    complianceGaps: false
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user?.apiKey || 'indus_live_9f82a10b42c98402a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = 'indus_live_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    updateApiKey(newKey);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showSuccess('Profile settings updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'apikey', label: 'API Key Management', icon: Key },
    { id: 'theme', label: 'Theme & Appearance', icon: Moon },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100">
          Enterprise Account & Workspace Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage user profile, API credentials, alert integrations, and display themes.
        </p>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile Settings */}
      {activeTab === 'profile' && (
        <Card title="User Profile Details" subtitle="Update your identity & plant assignment">
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Position</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                <input
                  type="text"
                  value={profile.org}
                  onChange={(e) => setProfile({ ...profile, org: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 2: API Key Management */}
      {activeTab === 'apikey' && (
        <Card title="Industrial API Key Management" subtitle="Access vector search API endpoints programmatically">
          <div className="space-y-4 max-w-2xl mt-4">
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Secret Enterprise Key
              </div>
              <p className="text-slate-400">Keep this API key secret. Do not expose it in client-side code.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type={showKey ? 'text' : 'password'}
                  readOnly
                  value={user?.apiKey || 'indus_live_9f82a10b42c98402a'}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy API key"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button variant="outline" size="sm" icon={RefreshCw} onClick={handleRegenerateKey}>
              Regenerate API Key
            </Button>
          </div>
        </Card>
      )}

      {/* Tab 3: Theme */}
      {activeTab === 'theme' && (
        <Card title="Interface Theme Customization" subtitle="Select your workspace theme preference">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-3xl">
            <div className="p-4 rounded-2xl border border-blue-500 bg-blue-600/10 text-center space-y-2 cursor-pointer shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 mx-auto">
                <Moon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-xs">Professional Dark (Default)</h4>
              <p className="text-[10px] text-slate-400">#0F172A Slate & Electric Blue #2563EB</p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-700/80 bg-slate-900/40 text-center space-y-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
                <Moon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-xs">High Contrast Industrial</h4>
              <p className="text-[10px] text-slate-400">Pure AMOLED Black & Neon Green</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <Card title="Notification & Alert Integrations" subtitle="Configure automated diagnostic alerts">
          <div className="space-y-4 max-w-2xl mt-4">
            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <div>
                <p className="font-bold text-xs text-slate-200">Email Reliability Digest</p>
                <p className="text-[11px] text-slate-400">Receive daily equipment health scores and RCA summaries.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <div>
                <p className="font-bold text-xs text-slate-200">Slack & Microsoft Teams Webhooks</p>
                <p className="text-[11px] text-slate-400">Broadcast critical vibration anomaly alerts to engineering channels.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.slackWebhook}
                onChange={(e) => setNotifications({ ...notifications, slackWebhook: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <div>
                <p className="font-bold text-xs text-slate-200">Instant Root Cause Analysis (RCA) Trigger</p>
                <p className="text-[11px] text-slate-400">Auto-generate diagnostic reports when health score drops below 70%.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.rcaTrigger}
                onChange={(e) => setNotifications({ ...notifications, rcaTrigger: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
              />
            </label>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
