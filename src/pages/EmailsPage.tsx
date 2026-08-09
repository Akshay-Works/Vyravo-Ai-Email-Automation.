import { useState } from 'react';
import { Search, Send, Eye, MousePointer, MessageSquare, AlertTriangle, Clock, CheckCircle2, Plus, Inbox } from 'lucide-react';
import { emails } from '../data/mockData';
import type { EmailStatus } from '../types';

const statusConfig: Record<EmailStatus, { icon: typeof Send; label: string; color: string }> = {
  draft: { icon: Clock, label: 'Draft', color: 'text-gray-400 bg-gray-400/10' },
  scheduled: { icon: Clock, label: 'Scheduled', color: 'text-amber-400 bg-amber-400/10' },
  sent: { icon: Send, label: 'Sent', color: 'text-violet-400 bg-violet-400/10' },
  delivered: { icon: CheckCircle2, label: 'Delivered', color: 'text-blue-400 bg-blue-400/10' },
  opened: { icon: Eye, label: 'Opened', color: 'text-cyan-400 bg-cyan-400/10' },
  clicked: { icon: MousePointer, label: 'Clicked', color: 'text-indigo-400 bg-indigo-400/10' },
  replied: { icon: MessageSquare, label: 'Replied', color: 'text-emerald-400 bg-emerald-400/10' },
  bounced: { icon: AlertTriangle, label: 'Bounced', color: 'text-red-400 bg-red-400/10' },
  spam: { icon: AlertTriangle, label: 'Spam', color: 'text-red-400 bg-red-400/10' },
};

const tabs = ['All', 'Sent', 'Opened', 'Replied', 'Scheduled', 'Draft', 'Bounced'];

function formatDate(dateStr?: string) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function EmailsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const filtered = emails.filter(e => {
    const matchSearch = `${e.subject} ${e.contactName} ${e.contactEmail}`.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'All' || e.status.toLowerCase() === activeTab.toLowerCase();
    return matchSearch && matchTab;
  });

  const selected = selectedEmail ? emails.find(e => e.id === selectedEmail) : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-500">{emails.length} total emails · {emails.filter(e => e.status === 'replied').length} replies</p>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Compose Email
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#110D1F] border border-[#1E1735] rounded-xl px-3 py-2.5">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text" placeholder="Search emails..."
          className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-6">
        {/* Email List */}
        <div className={`flex-1 space-y-2 ${selected ? 'hidden lg:block' : ''}`}>
          {filtered.map((email) => {
            const cfg = statusConfig[email.status];
            const StatusIcon = cfg.icon;
            return (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className={`w-full text-left bg-[#110D1F] border rounded-xl p-4 hover:border-violet-500/20 transition-colors ${
                  selectedEmail === email.id ? 'border-violet-500/30 bg-violet-600/5' : 'border-[#1E1735]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-[10px] font-bold text-violet-400 shrink-0">
                      {email.contactName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{email.contactName}</p>
                      <p className="text-[10px] text-gray-500 truncate">{email.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-1 truncate">{email.subject}</p>
                <p className="text-[11px] text-gray-500 truncate">{email.preview}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-gray-600">{formatDate(email.sentAt || email.scheduledAt)}</span>
                  <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">{email.category}</span>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Inbox className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No emails found</p>
            </div>
          )}
        </div>

        {/* Email Detail */}
        {selected && (
          <div className="w-full lg:w-[450px] bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 shrink-0">
            <button className="lg:hidden text-xs text-violet-400 mb-4" onClick={() => setSelectedEmail(null)}>← Back</button>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                  {selected.contactName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{selected.contactName}</p>
                  <p className="text-[11px] text-gray-500">{selected.contactEmail}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${statusConfig[selected.status].color}`}>
                {statusConfig[selected.status].label}
              </span>
            </div>

            <h3 className="text-base font-semibold text-white mb-4">{selected.subject}</h3>

            <div className="bg-white/[0.03] rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-300 leading-relaxed">{selected.preview}</p>
              <p className="text-sm text-gray-400 leading-relaxed mt-3">
                We'd love to discuss how our AI automation solutions can help streamline your operations and deliver measurable results.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mt-3">
                Best regards,<br/>
                <span className="text-violet-400">Akshay Navale</span><br/>
                <span className="text-gray-500">Founder, Vyravo AI</span>
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-500 uppercase">Email Timeline</p>
              {selected.sentAt && (
                <div className="flex items-center gap-2 text-xs">
                  <Send className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-gray-400">Sent: {formatDate(selected.sentAt)}</span>
                </div>
              )}
              {selected.openedAt && (
                <div className="flex items-center gap-2 text-xs">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-gray-400">Opened: {formatDate(selected.openedAt)}</span>
                </div>
              )}
              {selected.clickedAt && (
                <div className="flex items-center gap-2 text-xs">
                  <MousePointer className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-gray-400">Clicked: {formatDate(selected.clickedAt)}</span>
                </div>
              )}
              {selected.repliedAt && (
                <div className="flex items-center gap-2 text-xs">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-gray-400">Replied: {formatDate(selected.repliedAt)}</span>
                </div>
              )}
              {selected.scheduledAt && (
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-gray-400">Scheduled: {formatDate(selected.scheduledAt)}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-5">
              <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-medium">
                Reply
              </button>
              <button className="flex-1 py-2.5 rounded-xl border border-[#1E1735] text-white text-xs font-medium hover:border-violet-500/30 transition-colors">
                Forward
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
