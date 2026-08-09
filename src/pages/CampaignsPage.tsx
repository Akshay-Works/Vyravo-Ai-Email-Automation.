import { Megaphone, Send, Eye, MousePointer, MessageSquare, DollarSign, Play, Pause, Plus } from 'lucide-react';
import { campaigns } from '../data/mockData';

export default function CampaignsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-500">{campaigns.length} campaigns · {campaigns.filter(c => c.status === 'active').length} active</p>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const openRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100).toFixed(1) : '0';
          const clickRate = campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : '0';
          const replyRate = campaign.delivered > 0 ? ((campaign.replied / campaign.delivered) * 100).toFixed(1) : '0';

          return (
            <div key={campaign.id} className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-5 hover:border-violet-500/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{campaign.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-500 capitalize">{campaign.type}</span>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className="text-[10px] text-gray-500">{campaign.startDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                    campaign.status === 'active' ? 'text-emerald-400 bg-emerald-400/10' :
                    campaign.status === 'completed' ? 'text-blue-400 bg-blue-400/10' :
                    campaign.status === 'paused' ? 'text-amber-400 bg-amber-400/10' :
                    'text-gray-400 bg-gray-400/10'
                  }`}>
                    {campaign.status}
                  </span>
                  {campaign.status === 'active' ? (
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Pause className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  ) : campaign.status === 'paused' ? (
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Play className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <Send className="w-3.5 h-3.5 text-violet-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{campaign.sent.toLocaleString()}</p>
                  <p className="text-[8px] text-gray-500">Sent</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <Eye className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{openRate}%</p>
                  <p className="text-[8px] text-gray-500">Open Rate</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <MousePointer className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{clickRate}%</p>
                  <p className="text-[8px] text-gray-500">Click Rate</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{replyRate}%</p>
                  <p className="text-[8px] text-gray-500">Reply Rate</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-red-400">{campaign.bounced}</p>
                  <p className="text-[8px] text-gray-500">Bounced</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">${campaign.revenue.toLocaleString()}</p>
                  <p className="text-[8px] text-gray-500">Revenue</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                  <span>Delivery Progress</span>
                  <span>{campaign.delivered}/{campaign.sent} delivered</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    style={{ width: `${(campaign.delivered / campaign.sent) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
