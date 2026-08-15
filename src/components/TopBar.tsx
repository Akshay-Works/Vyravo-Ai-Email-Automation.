import { Search, Bell, Menu, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  contacts: 'Contacts',
  emails: 'Emails',
  workflows: 'Workflows',
  templates: 'Templates',
  campaigns: 'Campaigns',
  analytics: 'Analytics',
  'ai-assistant': 'AI Writing Assistant',
  integrations: 'Integrations',
  settings: 'Settings',
};

export default function TopBar() {
  const { currentPage, toggleSidebar, searchQuery, setSearchQuery, notifications } = useApp();

  return (
    <header className="h-16 border-b border-[#1E1735] bg-[#0D0818]/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">{pageTitles[currentPage] || 'Dashboard'}</h1>
          <a
            href="https://vyravo-ai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-500 hidden sm:block hover:text-violet-400 transition-colors"
            title="Visit the Vyravo AI main website"
          >
            Vyravo AI Email Automation System — visit main site ↗
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-64 focus-within:border-violet-500/50 transition-colors">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search contacts, emails..."
            className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Add */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors">
          <Bell className="w-4 h-4 text-gray-400" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-[9px] font-bold text-white flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          AN
        </div>
      </div>
    </header>
  );
}
