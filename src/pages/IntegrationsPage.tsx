import { useEffect, useState } from 'react';
import { Check, X, ExternalLink, Search } from 'lucide-react';
import { integrations } from '../data/mockData';

const categories = ['All', ...new Set(integrations.map(i => i.category))];

export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [resendConfigured, setResendConfigured] = useState<boolean | null>(null);

  // Live check of server-side integration config (no secrets exposed).
  useEffect(() => {
    fetch('/api/status')
      .then(r => r.json())
      .then(data => setResendConfigured(Boolean(data?.resend?.configured)))
      .catch(() => setResendConfigured(null));
  }, []);

  // Reflect the real Resend connection state on its card.
  const displayIntegrations = integrations.map(i =>
    i.name === 'Resend' && resendConfigured === false
      ? {
          ...i,
          status: 'disconnected' as const,
          description: 'Not configured — add RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel environment variables.',
        }
      : i
  );

  const filtered = displayIntegrations.filter(i => {
    const matchSearch = `${i.name} ${i.description}`.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || i.category === activeCategory;
    return matchSearch && matchCat;
  });

  const connected = displayIntegrations.filter(i => i.status === 'connected').length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-500">{integrations.length} integrations · {connected} connected</p>
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
          type="text" placeholder="Search integrations..."
          className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((integration) => (
          <div
            key={integration.id}
            className={`bg-[#110D1F] border rounded-2xl p-5 hover:border-violet-500/20 transition-colors ${
              integration.status === 'connected' ? 'border-emerald-500/20' : 'border-[#1E1735]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                {integration.icon}
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                integration.status === 'connected'
                  ? 'text-emerald-400 bg-emerald-400/10'
                  : integration.status === 'error'
                    ? 'text-red-400 bg-red-400/10'
                    : 'text-gray-400 bg-gray-400/10'
              }`}>
                {integration.status === 'connected' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                {integration.status}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-white mb-1">{integration.name}</h3>
            <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{integration.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">{integration.category}</span>
              {integration.status === 'connected' ? (
                <button className="text-[10px] text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  Configure <ExternalLink className="w-3 h-3" />
                </button>
              ) : (
                <button className="text-[10px] font-medium text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full hover:bg-violet-400/20 transition-colors">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
