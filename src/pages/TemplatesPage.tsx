import { useState } from 'react';
import { FileText, Eye, MousePointer, MessageSquare, Plus, Copy, Edit3, Search, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { templates } from '../data/mockData';
import type { EmailTemplate } from '../types';

const categories = ['All', ...new Set(templates.map(t => t.category))];

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSendTest = async () => {
    if (!selectedTemplate || sending) return;
    const to = testEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      setSendStatus({ ok: false, message: 'Enter a valid recipient email address.' });
      return;
    }
    setSending(true);
    setSendStatus(null);
    try {
      // Real send via the server-side Resend integration (/api/send-email).
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom',
          to,
          subject: selectedTemplate.subject,
          body: selectedTemplate.body,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setSendStatus({ ok: true, message: `Email sent to ${to} via Resend.` });
      } else {
        setSendStatus({ ok: false, message: json?.error || `Send failed (HTTP ${res.status}).` });
      }
    } catch {
      setSendStatus({ ok: false, message: 'Network error — could not reach the email service.' });
    } finally {
      setSending(false);
    }
  };

  const filtered = templates.filter(t => {
    const matchSearch = `${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-500">{templates.length} templates · {templates.filter(t => t.status === 'active').length} active</p>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Create Template
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#110D1F] border border-[#1E1735] rounded-xl px-3 py-2.5">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text" placeholder="Search templates..."
          className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className={`flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 ${selectedTemplate ? 'hidden lg:grid' : ''}`}>
          {filtered.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`text-left bg-[#110D1F] border rounded-2xl p-5 hover:border-violet-500/20 transition-colors ${
                selectedTemplate?.id === tmpl.id ? 'border-violet-500/30' : 'border-[#1E1735]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-[9px] font-medium text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">{tmpl.category}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{tmpl.name}</h3>
              <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{tmpl.subject}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <p className="text-sm font-bold text-white">{tmpl.openRate}%</p>
                  <p className="text-[8px] text-gray-500">Open</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <p className="text-sm font-bold text-white">{tmpl.clickRate}%</p>
                  <p className="text-[8px] text-gray-500">Click</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <p className="text-sm font-bold text-white">{tmpl.replyRate}%</p>
                  <p className="text-[8px] text-gray-500">Reply</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 mt-3">Used {tmpl.usageCount} times</p>
            </button>
          ))}
        </div>

        {/* Template Preview */}
        {selectedTemplate && (
          <div className="w-full lg:w-[420px] bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 shrink-0">
            <button className="lg:hidden text-xs text-violet-400 mb-4" onClick={() => setSelectedTemplate(null)}>← Back</button>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">{selectedTemplate.name}</h3>
              <span className="text-[9px] font-medium text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">{selectedTemplate.category}</span>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-4 mb-4">
              <p className="text-[10px] text-gray-500 mb-1">Subject</p>
              <p className="text-sm text-white font-medium mb-4">{selectedTemplate.subject}</p>
              <p className="text-[10px] text-gray-500 mb-1">Body</p>
              <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{selectedTemplate.body}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <Eye className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{selectedTemplate.openRate}%</p>
                <p className="text-[9px] text-gray-500">Open Rate</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <MousePointer className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{selectedTemplate.clickRate}%</p>
                <p className="text-[9px] text-gray-500">Click Rate</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <MessageSquare className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{selectedTemplate.replyRate}%</p>
                <p className="text-[9px] text-gray-500">Reply Rate</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Variables</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedTemplate.variables.map(v => (
                  <span key={v} className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full font-mono">{`{{${v}}}`}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-medium">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#1E1735] text-white text-xs font-medium hover:border-violet-500/30 transition-colors">
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </button>
            </div>

            {/* Send a real test email via Resend */}
            <div className="mt-4 rounded-xl border border-[#1E1735] bg-white/[0.03] p-3">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Send Test Email (Resend)</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#0D0818] border border-[#1E1735] text-xs text-white placeholder:text-gray-600 outline-none focus:border-violet-500/50"
                />
                <button
                  onClick={handleSendTest}
                  disabled={sending || !testEmail}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" /> {sending ? 'Sending…' : 'Send'}
                </button>
              </div>
              {sendStatus && (
                <p className={`flex items-start gap-1.5 mt-2 text-[11px] ${sendStatus.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                  {sendStatus.ok
                    ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-[1px]" />
                    : <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-[1px]" />}
                  {sendStatus.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
