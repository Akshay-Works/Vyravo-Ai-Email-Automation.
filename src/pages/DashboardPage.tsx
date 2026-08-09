import {
  Mail, Users, GitBranch, DollarSign, ArrowUpRight, ArrowDownRight,
  Send, Eye, MousePointer, MessageSquare, Calendar, FileText,
  TrendingUp, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { analyticsData, activities, contacts, workflows, emails, monthlyEmailStats } from '../data/mockData';

const kpiCards = [
  { label: 'Total Emails Sent', value: analyticsData.totalEmails.toLocaleString(), change: '+12.5%', up: true, icon: Mail, color: 'from-violet-600 to-violet-500' },
  { label: 'Open Rate', value: `${analyticsData.openRate}%`, change: '+3.2%', up: true, icon: Eye, color: 'from-cyan-600 to-cyan-500' },
  { label: 'Reply Rate', value: `${analyticsData.replyRate}%`, change: '+1.8%', up: true, icon: MessageSquare, color: 'from-emerald-600 to-emerald-500' },
  { label: 'Revenue Generated', value: `$${(analyticsData.revenue / 1000).toFixed(0)}K`, change: '+28%', up: true, icon: DollarSign, color: 'from-amber-600 to-amber-500' },
];

const quickStats = [
  { label: 'Delivery Rate', value: `${analyticsData.deliveryRate}%`, icon: Send },
  { label: 'Click Rate', value: `${analyticsData.clickRate}%`, icon: MousePointer },
  { label: 'Meetings Booked', value: analyticsData.meetingsBooked.toString(), icon: Calendar },
  { label: 'Proposals Accepted', value: analyticsData.proposalsAccepted.toString(), icon: FileText },
  { label: 'Bounce Rate', value: `${analyticsData.bounceRate}%`, icon: AlertCircle },
  { label: 'Active Contacts', value: contacts.filter(c => c.status !== 'inactive').length.toString(), icon: Users },
];

function getActivityIcon(type: string) {
  switch (type) {
    case 'email_sent': return <Send className="w-3.5 h-3.5 text-violet-400" />;
    case 'email_opened': return <Eye className="w-3.5 h-3.5 text-cyan-400" />;
    case 'email_clicked': return <MousePointer className="w-3.5 h-3.5 text-blue-400" />;
    case 'email_replied': return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
    case 'call_booked': return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
    case 'proposal_sent': case 'proposal_viewed': return <FileText className="w-3.5 h-3.5 text-orange-400" />;
    case 'proposal_accepted': return <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />;
    case 'payment_received': return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
    case 'form_submitted': return <Users className="w-3.5 h-3.5 text-violet-400" />;
    case 'workflow_triggered': return <GitBranch className="w-3.5 h-3.5 text-cyan-400" />;
    case 'contact_created': return <Users className="w-3.5 h-3.5 text-blue-400" />;
    case 'project_started': return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
    default: return <Mail className="w-3.5 h-3.5 text-gray-400" />;
  }
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Simple bar chart component
function MiniBarChart({ data }: { data: typeof monthlyEmailStats }) {
  const max = Math.max(...data.map(d => d.sent));
  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '100px' }}>
            <div
              className="w-full rounded-t bg-violet-600/20 border border-violet-500/20 relative group cursor-pointer hover:bg-violet-600/30 transition-colors"
              style={{ height: `${(d.sent / max) * 100}%`, minHeight: '4px' }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t bg-gradient-to-t from-violet-600 to-violet-500"
                style={{ height: `${(d.opened / d.sent) * 100}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1330] text-[10px] text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-violet-500/20">
                {d.sent} sent · {d.opened} opened
              </div>
            </div>
          </div>
          <span className="text-[10px] text-gray-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const activeWorkflows = workflows.filter(w => w.status === 'active');
  const recentEmails = emails.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 hover:border-violet-500/20 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  kpi.up ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
                }`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#110D1F] border border-[#1E1735] rounded-xl p-3.5 text-center hover:border-violet-500/20 transition-colors">
              <Icon className="w-4 h-4 text-gray-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email Performance Chart */}
        <div className="lg:col-span-2 bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-semibold text-white">Email Performance</h3>
              <p className="text-[11px] text-gray-500">Monthly sent vs opened</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-600/30 border border-violet-500/30" /> Sent</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500" /> Opened</span>
            </div>
          </div>
          <MiniBarChart data={monthlyEmailStats} />
        </div>

        {/* Active Workflows */}
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Active Workflows</h3>
            <span className="text-[10px] font-medium text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">
              {activeWorkflows.length} active
            </span>
          </div>
          <div className="space-y-3">
            {activeWorkflows.slice(0, 5).map((wf) => (
              <div key={wf.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                  <GitBranch className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{wf.name.split(' → ')[0]}</p>
                  <p className="text-[10px] text-gray-500">{wf.contactsEnrolled} enrolled · {wf.conversionRate}% conv.</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-1">
            {activities.slice(0, 8).map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(act.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 leading-relaxed">{act.description}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{timeAgo(act.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Emails */}
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Emails</h3>
            <Mail className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-2">
            {recentEmails.map((email) => (
              <div key={email.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-[10px] font-bold text-violet-400 shrink-0">
                  {email.contactName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{email.subject}</p>
                  <p className="text-[10px] text-gray-500 truncate">{email.contactName}</p>
                </div>
                <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                  email.status === 'replied' ? 'text-emerald-400 bg-emerald-400/10' :
                  email.status === 'opened' || email.status === 'clicked' ? 'text-cyan-400 bg-cyan-400/10' :
                  email.status === 'delivered' || email.status === 'sent' ? 'text-violet-400 bg-violet-400/10' :
                  email.status === 'bounced' ? 'text-red-400 bg-red-400/10' :
                  email.status === 'scheduled' ? 'text-amber-400 bg-amber-400/10' :
                  'text-gray-400 bg-gray-400/10'
                }`}>
                  {email.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Lead-to-Revenue Pipeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Total Leads', value: contacts.length, color: 'bg-violet-600' },
            { label: 'Contacted', value: contacts.filter(c => c.status !== 'new').length, color: 'bg-blue-600' },
            { label: 'Qualified', value: contacts.filter(c => ['qualified', 'proposal_sent', 'proposal_viewed', 'won'].includes(c.status)).length, color: 'bg-cyan-600' },
            { label: 'Proposal Sent', value: contacts.filter(c => ['proposal_sent', 'proposal_viewed', 'won'].includes(c.status)).length, color: 'bg-indigo-600' },
            { label: 'Proposal Viewed', value: contacts.filter(c => ['proposal_viewed', 'won'].includes(c.status)).length, color: 'bg-purple-600' },
            { label: 'Won', value: contacts.filter(c => c.status === 'won').length, color: 'bg-emerald-600' },
            { label: 'Revenue', value: `$${(analyticsData.revenue / 1000).toFixed(0)}K`, color: 'bg-amber-600' },
          ].map((stage, i) => (
            <div key={stage.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 relative">
              <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2 shadow-lg`} />
              <p className="text-lg font-bold text-white">{stage.value}</p>
              <p className="text-[10px] text-gray-500">{stage.label}</p>
              {i < 6 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-gray-700 z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
