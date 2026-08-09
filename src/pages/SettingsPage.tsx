import { useState } from 'react';
import {
  User, Mail, Shield, Bell, Globe, Key, Save, 
  Check, Phone, Link2
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'email', label: 'Email Setup', icon: Mail },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'deliverability', label: 'Deliverability', icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20'
                  : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile */}
      {activeTab === 'profile' && (
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">Company Profile</h3>
            <p className="text-xs text-gray-500">Manage your Vyravo AI company information</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
              V
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Vyravo AI</p>
              <p className="text-xs text-gray-500">Intelligent Automation for Modern Businesses</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Company Name</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="Vyravo AI" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Founder</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="Akshay Navale" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="akshay.navale.work@gmail.com" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="+91 9075707650" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">LinkedIn</label>
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gray-500" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="https://www.linkedin.com/in/akshay-n-2692851b7" />
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Email Setup */}
      {activeTab === 'email' && (
        <div className="space-y-4">
          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">Sending Configuration</h3>
            <p className="text-xs text-gray-500 mb-5">Configure your email sending settings</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">From Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="Akshay from Vyravo AI" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">From Email</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="akshay@vyravo.ai" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Reply-To</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="akshay.navale.work@gmail.com" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Email Provider</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none cursor-pointer">
                  <option>Resend</option>
                  <option>SendGrid</option>
                  <option>Mailgun</option>
                  <option>Amazon SES</option>
                  <option>Postmark</option>
                </select>
              </div>
            </div>

            <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity mt-5">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>

          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">Rate Limiting</h3>
            <p className="text-xs text-gray-500 mb-5">Control email sending speed to protect deliverability</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Max per Hour</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="50" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Max per Day</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="500" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5 block">Delay Between (ms)</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" defaultValue="2000" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">Security Settings</h3>
            <p className="text-xs text-gray-500 mb-5">Manage API keys, OAuth, and access control</p>

            <div className="space-y-4">
              {[
                { label: 'API Key', value: 'vyr_sk_••••••••••••••••••3a7f', status: 'Active' },
                { label: 'OAuth Token', value: 'oauth_••••••••••••8b2c', status: 'Active' },
                { label: 'Webhook Secret', value: 'whsec_••••••••••••d4e1', status: 'Active' },
              ].map((key) => (
                <div key={key.label} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-violet-400" />
                    <div>
                      <p className="text-xs font-medium text-white">{key.label}</p>
                      <p className="text-[10px] text-gray-500 font-mono">{key.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{key.status}</span>
                    <button className="text-[10px] text-gray-400 hover:text-white transition-colors">Rotate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">GDPR Compliance</h3>
            <p className="text-xs text-gray-500 mb-5">Data protection and privacy settings</p>
            <div className="space-y-3">
              {[
                { label: 'Automatic unsubscribe link in all emails', enabled: true },
                { label: 'Double opt-in for new subscribers', enabled: true },
                { label: 'Data retention policy (auto-delete after 24 months)', enabled: false },
                { label: 'Audit log for all data access', enabled: true },
                { label: 'Encrypted storage for personal data', enabled: true },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                  <span className="text-xs text-gray-300">{setting.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                    setting.enabled ? 'bg-violet-600' : 'bg-white/10'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      setting.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Notification Preferences</h3>
          <p className="text-xs text-gray-500 mb-5">Choose what notifications you receive</p>
          <div className="space-y-3">
            {[
              { label: 'New lead submitted contact form', enabled: true },
              { label: 'Discovery call booked', enabled: true },
              { label: 'Proposal viewed by client', enabled: true },
              { label: 'Proposal accepted', enabled: true },
              { label: 'Payment received', enabled: true },
              { label: 'Email bounced', enabled: true },
              { label: 'Workflow completed', enabled: false },
              { label: 'Weekly performance digest', enabled: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <span className="text-xs text-gray-300">{n.label}</span>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                  n.enabled ? 'bg-violet-600' : 'bg-white/10'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                    n.enabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deliverability */}
      {activeTab === 'deliverability' && (
        <div className="space-y-4">
          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">Domain Authentication</h3>
            <p className="text-xs text-gray-500 mb-5">DNS records for email deliverability</p>

            <div className="space-y-3">
              {[
                { label: 'SPF Record', value: 'v=spf1 include:_spf.resend.com ~all', status: 'Verified' },
                { label: 'DKIM Record', value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQ...', status: 'Verified' },
                { label: 'DMARC Record', value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@vyravo.ai', status: 'Verified' },
                { label: 'Custom Domain', value: 'mail.vyravo.ai', status: 'Active' },
              ].map((record) => (
                <div key={record.label} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">{record.label}</p>
                      <p className="text-[10px] text-gray-500 font-mono truncate max-w-xs">{record.value}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{record.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-1">Suppression Lists</h3>
            <p className="text-xs text-gray-500 mb-5">Manage bounced, unsubscribed, and suppressed contacts</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">56</p>
                <p className="text-[10px] text-gray-500">Bounced</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">18</p>
                <p className="text-[10px] text-gray-500">Unsubscribed</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-[10px] text-gray-500">Spam Complaints</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
