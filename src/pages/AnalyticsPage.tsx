import {
  Send, Eye, MousePointer, MessageSquare, AlertTriangle, ShieldAlert,
  UserMinus, Calendar, FileText, DollarSign, CheckCircle2
} from 'lucide-react';
import { analyticsData, monthlyEmailStats, emailsByCategory } from '../data/mockData';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Sent', value: analyticsData.totalEmails.toLocaleString(), icon: Send, color: 'text-violet-400 bg-violet-400/10' },
    { label: 'Delivered', value: `${analyticsData.deliveryRate}%`, icon: CheckCircle2, color: 'text-blue-400 bg-blue-400/10' },
    { label: 'Open Rate', value: `${analyticsData.openRate}%`, icon: Eye, color: 'text-cyan-400 bg-cyan-400/10' },
    { label: 'Click Rate', value: `${analyticsData.clickRate}%`, icon: MousePointer, color: 'text-indigo-400 bg-indigo-400/10' },
    { label: 'Reply Rate', value: `${analyticsData.replyRate}%`, icon: MessageSquare, color: 'text-emerald-400 bg-emerald-400/10' },
    { label: 'Bounce Rate', value: `${analyticsData.bounceRate}%`, icon: AlertTriangle, color: 'text-red-400 bg-red-400/10' },
    { label: 'Spam', value: analyticsData.spamComplaints.toString(), icon: ShieldAlert, color: 'text-orange-400 bg-orange-400/10' },
    { label: 'Unsubs', value: analyticsData.unsubscribes.toString(), icon: UserMinus, color: 'text-gray-400 bg-gray-400/10' },
  ];

  const businessMetrics = [
    { label: 'Meetings Booked', value: analyticsData.meetingsBooked.toString(), icon: Calendar, color: 'from-violet-600 to-violet-500' },
    { label: 'Proposals Sent', value: analyticsData.proposalsSent.toString(), icon: FileText, color: 'from-cyan-600 to-cyan-500' },
    { label: 'Proposals Accepted', value: analyticsData.proposalsAccepted.toString(), icon: CheckCircle2, color: 'from-emerald-600 to-emerald-500' },
    { label: 'Revenue Generated', value: `$${(analyticsData.revenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'from-amber-600 to-amber-500' },
  ];

  const maxSent = Math.max(...monthlyEmailStats.map(m => m.sent));

  return (
    <div className="space-y-6">
      {/* Email Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#110D1F] border border-[#1E1735] rounded-xl p-3.5 text-center hover:border-violet-500/20 transition-colors">
              <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-white">{m.value}</p>
              <p className="text-[9px] text-gray-500">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {businessMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 hover:border-violet-500/20 transition-colors">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white mb-0.5">{m.value}</p>
              <p className="text-xs text-gray-500">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Monthly Email Trend</h3>
          <p className="text-[11px] text-gray-500 mb-4">Sent, opened, clicked, replied</p>

          <div className="space-y-3">
            {monthlyEmailStats.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-8">{m.month}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 rounded-full bg-violet-600/30" style={{ width: `${(m.sent / maxSent) * 100}%` }}>
                      <div className="h-full rounded-full bg-violet-500" style={{ width: `${(m.opened / m.sent) * 100}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-500 w-8">{m.sent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500" /> Opened</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-600/30" /> Sent</span>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Performance by Category</h3>
          <p className="text-[11px] text-gray-500 mb-4">Email count and open rate by category</p>

          <div className="space-y-2.5">
            {emailsByCategory.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                <span className="text-xs text-gray-300 w-28 truncate">{cat.category}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    style={{ width: `${cat.openRate}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-white w-10 text-right">{cat.openRate}%</span>
                <span className="text-[10px] text-gray-500 w-10 text-right">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverability Health */}
      <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Deliverability Health</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'SPF', status: 'Pass', ok: true },
            { label: 'DKIM', status: 'Pass', ok: true },
            { label: 'DMARC', status: 'Pass', ok: true },
            { label: 'Domain Reputation', status: 'Excellent', ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-4">
              <div className={`w-3 h-3 rounded-full ${item.ok ? 'bg-emerald-400' : 'bg-red-400'} shadow-lg`} />
              <div>
                <p className="text-xs font-medium text-white">{item.label}</p>
                <p className={`text-[10px] ${item.ok ? 'text-emerald-400' : 'text-red-400'}`}>{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
