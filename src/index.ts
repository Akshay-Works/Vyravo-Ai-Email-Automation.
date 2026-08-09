// ============================================================
// Vyravo AI — Email Automation System Types
// ============================================================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'proposal_viewed' | 'won' | 'lost' | 'inactive';
export type EmailStatus = 'draft' | 'scheduled' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced' | 'spam';
export type WorkflowStatus = 'active' | 'paused' | 'draft' | 'completed';
export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  role: string;
  status: LeadStatus;
  score: number;
  tags: string[];
  source: string;
  createdAt: string;
  lastActivity: string;
  avatar?: string;
  location?: string;
  servicesInterested: string[];
  notes: string[];
  totalEmails: number;
  openRate: number;
  replyRate: number;
}

export interface Email {
  id: string;
  contactId: string;
  contactName: string;
  contactEmail: string;
  subject: string;
  preview: string;
  body: string;
  status: EmailStatus;
  template?: string;
  workflowId?: string;
  sentAt?: string;
  openedAt?: string;
  clickedAt?: string;
  repliedAt?: string;
  scheduledAt?: string;
  category: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  variables: string[];
  openRate: number;
  clickRate: number;
  replyRate: number;
  usageCount: number;
  lastUsed: string;
  status: 'active' | 'draft' | 'archived';
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: string;
  steps: WorkflowStep[];
  contactsEnrolled: number;
  contactsCompleted: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface WorkflowStep {
  id: string;
  type: 'email' | 'delay' | 'condition' | 'action' | 'notification';
  name: string;
  config: Record<string, unknown>;
  position: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'automated' | 'manual' | 'trigger';
  status: 'active' | 'paused' | 'completed' | 'draft';
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  revenue: number;
  startDate: string;
  endDate?: string;
}

export interface AnalyticsData {
  totalEmails: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  spamComplaints: number;
  unsubscribes: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  bounceRate: number;
  meetingsBooked: number;
  proposalsSent: number;
  proposalsAccepted: number;
  revenue: number;
}

export interface Activity {
  id: string;
  type: 'email_sent' | 'email_opened' | 'email_clicked' | 'email_replied' | 'call_booked' | 'proposal_sent' | 'proposal_viewed' | 'proposal_accepted' | 'payment_received' | 'project_started' | 'form_submitted' | 'workflow_triggered' | 'contact_created' | 'note_added';
  description: string;
  contactName?: string;
  contactId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
}

export type Page = 'dashboard' | 'contacts' | 'emails' | 'workflows' | 'templates' | 'campaigns' | 'analytics' | 'ai-assistant' | 'integrations' | 'settings';
