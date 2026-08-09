import { useState } from 'react';
import {
  GitBranch, Mail, Clock, GitFork, Zap, Bell, Play, Pause, ChevronDown,
  ChevronRight, Users, TrendingUp, Plus
} from 'lucide-react';
import { workflows } from '../data/mockData';
import type { Workflow, WorkflowStatus } from '../types';

const statusColors: Record<WorkflowStatus, string> = {
  active: 'text-emerald-400 bg-emerald-400/10',
  paused: 'text-amber-400 bg-amber-400/10',
  draft: 'text-gray-400 bg-gray-400/10',
  completed: 'text-blue-400 bg-blue-400/10',
};

const stepIcons: Record<string, typeof Mail> = {
  email: Mail,
  delay: Clock,
  condition: GitFork,
  action: Zap,
  notification: Bell,
};

function WorkflowCard({ workflow, expanded, onToggle }: { workflow: Workflow; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl overflow-hidden hover:border-violet-500/20 transition-colors">
      {/* Header */}
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 text-left">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center shrink-0">
          <GitBranch className="w-5 h-5 text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold text-white truncate">{workflow.name}</h3>
            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusColors[workflow.status]}`}>
              {workflow.status}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 truncate">{workflow.description}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-4 text-center">
            <div>
              <p className="text-sm font-bold text-white">{workflow.contactsEnrolled}</p>
              <p className="text-[9px] text-gray-500">Enrolled</p>
            </div>
            <div>
              <p className="text-sm font-bold text-white">{workflow.conversionRate}%</p>
              <p className="text-[9px] text-gray-500">Conv. Rate</p>
            </div>
          </div>
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      {/* Expanded Steps */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-[#1E1735]">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {workflow.contactsEnrolled} enrolled</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {workflow.conversionRate}% conversion</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {workflow.steps.filter(s => s.type === 'email').length} emails</span>
            </div>
            <div className="flex items-center gap-2">
              {workflow.status === 'active' ? (
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 transition-colors">
                  <Pause className="w-3 h-3" /> Pause
                </button>
              ) : (
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 transition-colors">
                  <Play className="w-3 h-3" /> Activate
                </button>
              )}
            </div>
          </div>

          {/* Trigger */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-600/5 border border-violet-500/10 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-violet-400 uppercase">Trigger</p>
              <p className="text-xs text-white">{workflow.trigger}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative ml-4 border-l border-dashed border-[#2A2345] pl-6 space-y-1">
            {workflow.steps.map((step, i) => {
              const StepIcon = stepIcons[step.type] || Zap;
              const colors: Record<string, string> = {
                email: 'text-violet-400 bg-violet-400/10',
                delay: 'text-amber-400 bg-amber-400/10',
                condition: 'text-cyan-400 bg-cyan-400/10',
                action: 'text-emerald-400 bg-emerald-400/10',
                notification: 'text-blue-400 bg-blue-400/10',
              };
              return (
                <div key={step.id} className="relative flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <div className="absolute -left-[30px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2A2345] border-2 border-[#1E1735]" />
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${colors[step.type] || 'text-gray-400 bg-gray-400/10'}`}>
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white">{step.name}</p>
                    <p className="text-[9px] text-gray-500 capitalize">{step.type}</p>
                  </div>
                  <span className="text-[9px] text-gray-600">#{i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkflowsPage() {
  const [expandedId, setExpandedId] = useState<string | null>('w1');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(workflows.map(w => w.category))];
  const filtered = filterCategory === 'all' ? workflows : workflows.filter(w => w.category === filterCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          {workflows.length} workflows · {workflows.filter(w => w.status === 'active').length} active
        </p>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
              filterCategory === cat
                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workflow list */}
      <div className="space-y-3">
        {filtered.map(wf => (
          <WorkflowCard
            key={wf.id}
            workflow={wf}
            expanded={expandedId === wf.id}
            onToggle={() => setExpandedId(expandedId === wf.id ? null : wf.id)}
          />
        ))}
      </div>
    </div>
  );
}
