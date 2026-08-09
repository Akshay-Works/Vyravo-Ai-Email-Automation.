import {
  LayoutDashboard, Users, Mail, GitBranch, FileText, BarChart3,
  Megaphone, Sparkles, Puzzle, Settings, Zap, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Page } from '../types';

const navItems: { page: Page; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'contacts', label: 'Contacts', icon: Users, badge: 3 },
  { page: 'emails', label: 'Emails', icon: Mail, badge: 2 },
  { page: 'workflows', label: 'Workflows', icon: GitBranch },
  { page: 'templates', label: 'Templates', icon: FileText },
  { page: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { page: 'analytics', label: 'Analytics', icon: BarChart3 },
  { page: 'ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { page: 'integrations', label: 'Integrations', icon: Puzzle },
  { page: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64 bg-[#0D0818] border-r border-[#1E1735]
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1E1735] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">Vyravo AI</span>
              <span className="block text-[10px] text-violet-400 font-medium -mt-0.5">Email Automation</span>
            </div>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ page, label, icon: Icon, badge }) => {
            const active = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => { setCurrentPage(page); setSidebarOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-gradient-to-r from-violet-600/20 to-violet-600/5 text-white border border-violet-500/20 shadow-lg shadow-violet-500/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-violet-400' : ''}`} />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-violet-500 text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[#1E1735] shrink-0">
          <div className="bg-gradient-to-br from-violet-600/10 to-cyan-500/10 rounded-xl p-3 border border-violet-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold text-white">AI-Powered</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Smart automation managing 2,355+ emails across 8 active workflows.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
