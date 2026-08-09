import { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MapPin, MoreVertical, ArrowUpDown } from 'lucide-react';
import { contacts } from '../data/mockData';
import type { Contact, LeadStatus } from '../types';

const statusColors: Record<LeadStatus, string> = {
  new: 'text-blue-400 bg-blue-400/10',
  contacted: 'text-cyan-400 bg-cyan-400/10',
  qualified: 'text-violet-400 bg-violet-400/10',
  proposal_sent: 'text-amber-400 bg-amber-400/10',
  proposal_viewed: 'text-orange-400 bg-orange-400/10',
  won: 'text-emerald-400 bg-emerald-400/10',
  lost: 'text-red-400 bg-red-400/10',
  inactive: 'text-gray-400 bg-gray-400/10',
};

const statusLabels: Record<LeadStatus, string> = {
  new: 'New', contacted: 'Contacted', qualified: 'Qualified',
  proposal_sent: 'Proposal Sent', proposal_viewed: 'Proposal Viewed',
  won: 'Won', lost: 'Lost', inactive: 'Inactive',
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[10px] text-gray-400">{score}</span>
    </div>
  );
}

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filtered = contacts.filter(c => {
    const matchSearch = `${c.firstName} ${c.lastName} ${c.company} ${c.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{contacts.length} total contacts · {contacts.filter(c => c.status === 'won').length} clients</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#110D1F] border border-[#1E1735] rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text" placeholder="Search contacts..."
            className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            className="bg-[#110D1F] border border-[#1E1735] rounded-xl px-3 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer"
            value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {Object.entries(statusLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Contacts Table */}
        <div className={`flex-1 bg-[#110D1F] border border-[#1E1735] rounded-2xl overflow-hidden ${selectedContact ? 'hidden lg:block' : ''}`}>
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_100px_80px_80px_60px] gap-2 px-5 py-3 border-b border-[#1E1735] text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-1">Contact <ArrowUpDown className="w-3 h-3" /></div>
            <div>Status</div>
            <div>Score</div>
            <div>Open Rate</div>
            <div></div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#1E1735]/50">
            {filtered.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full grid grid-cols-[1fr_100px_80px_80px_60px] gap-2 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors text-left ${
                  selectedContact?.id === contact.id ? 'bg-violet-600/5 border-l-2 border-l-violet-500' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0">
                    {contact.firstName[0]}{contact.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{contact.firstName} {contact.lastName}</p>
                    <p className="text-[10px] text-gray-500 truncate">{contact.company}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full w-fit ${statusColors[contact.status]}`}>
                  {statusLabels[contact.status]}
                </span>
                <ScoreBar score={contact.score} />
                <span className="text-xs text-gray-400">{contact.openRate}%</span>
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Detail Panel */}
        {selectedContact && (
          <div className="w-full lg:w-96 bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 shrink-0">
            <div className="flex items-center justify-between mb-5">
              <button className="lg:hidden text-xs text-violet-400" onClick={() => setSelectedContact(null)}>← Back</button>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[selectedContact.status]}`}>
                  {statusLabels[selectedContact.status]}
                </span>
              </div>
            </div>

            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white mx-auto mb-3">
                {selectedContact.firstName[0]}{selectedContact.lastName[0]}
              </div>
              <h3 className="text-lg font-bold text-white">{selectedContact.firstName} {selectedContact.lastName}</h3>
              <p className="text-sm text-gray-400">{selectedContact.role}</p>
              <p className="text-xs text-gray-500">{selectedContact.company}</p>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Mail className="w-3.5 h-3.5 text-violet-400" /> {selectedContact.email}
              </div>
              {selectedContact.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone className="w-3.5 h-3.5 text-violet-400" /> {selectedContact.phone}
                </div>
              )}
              {selectedContact.location && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" /> {selectedContact.location}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-white">{selectedContact.totalEmails}</p>
                <p className="text-[9px] text-gray-500">Emails</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-white">{selectedContact.openRate}%</p>
                <p className="text-[9px] text-gray-500">Open Rate</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-white">{selectedContact.replyRate}%</p>
                <p className="text-[9px] text-gray-500">Reply Rate</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Lead Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${selectedContact.score >= 80 ? 'bg-emerald-500' : selectedContact.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${selectedContact.score}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-white">{selectedContact.score}/100</span>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Services Interested</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedContact.servicesInterested.map(s => (
                  <span key={s} className="text-[10px] text-violet-400 bg-violet-400/10 px-2 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedContact.tags.map(t => (
                  <span key={t} className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {selectedContact.notes.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Notes</p>
                {selectedContact.notes.map((n, i) => (
                  <p key={i} className="text-xs text-gray-400 bg-white/[0.03] rounded-lg p-2.5">{n}</p>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-5">
              <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-medium">
                Send Email
              </button>
              <button className="flex-1 py-2.5 rounded-xl border border-[#1E1735] text-white text-xs font-medium hover:border-violet-500/30 transition-colors">
                Edit Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
