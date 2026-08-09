import type { Contact, Email, EmailTemplate, Workflow, Campaign, Activity, Integration, AnalyticsData } from '../types';

// ============================================================
// CONTACTS
// ============================================================
export const contacts: Contact[] = [
  {
    id: 'c1', firstName: 'Sarah', lastName: 'Chen', email: 'sarah@techventure.com', phone: '+1 555-0101',
    company: 'TechVenture Capital', industry: 'Finance', role: 'CEO', status: 'won', score: 95,
    tags: ['enterprise', 'high-value', 'referral-source'], source: 'Website', createdAt: '2025-01-15',
    lastActivity: '2025-06-10', location: 'San Francisco, CA', servicesInterested: ['AI Chatbots', 'Sales Automation'],
    notes: ['Very responsive. Prefers email communication.'], totalEmails: 24, openRate: 92, replyRate: 45,
  },
  {
    id: 'c2', firstName: 'Rajesh', lastName: 'Patel', email: 'rajesh@medcare.com', phone: '+1 555-0102',
    company: 'MedCare Hospitals', industry: 'Healthcare', role: 'Director', status: 'won', score: 88,
    tags: ['healthcare', 'voice-agent', 'enterprise'], source: 'LinkedIn', createdAt: '2025-02-10',
    lastActivity: '2025-06-08', location: 'New York, NY', servicesInterested: ['AI Voice Agents'],
    notes: ['Interested in expanding to more locations.'], totalEmails: 18, openRate: 88, replyRate: 38,
  },
  {
    id: 'c3', firstName: 'Michael', lastName: 'Torres', email: 'michael@globallogistics.com', phone: '+1 555-0103',
    company: 'Global Logistics Inc.', industry: 'Logistics', role: 'COO', status: 'won', score: 91,
    tags: ['logistics', 'workflow', 'enterprise'], source: 'Referral', createdAt: '2025-01-28',
    lastActivity: '2025-06-12', location: 'Chicago, IL', servicesInterested: ['AI Workflow Automation'],
    notes: ['Looking at additional automation for Q3.'], totalEmails: 21, openRate: 85, replyRate: 42,
  },
  {
    id: 'c4', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily@scaleuphq.com', phone: '+1 555-0104',
    company: 'ScaleUp HQ', industry: 'SaaS', role: 'VP Marketing', status: 'proposal_sent', score: 72,
    tags: ['saas', 'chatbot', 'warm-lead'], source: 'Website', createdAt: '2025-05-20',
    lastActivity: '2025-06-11', location: 'Austin, TX', servicesInterested: ['AI Chatbots', 'AI Consulting'],
    notes: ['Proposal sent on June 5. Following up.'], totalEmails: 8, openRate: 75, replyRate: 25,
  },
  {
    id: 'c5', firstName: 'David', lastName: 'Kim', email: 'david@innovateco.io', phone: '+1 555-0105',
    company: 'InnovateCo', industry: 'Technology', role: 'CTO', status: 'qualified', score: 68,
    tags: ['tech', 'custom-ai', 'startup'], source: 'Conference', createdAt: '2025-05-28',
    lastActivity: '2025-06-09', location: 'Seattle, WA', servicesInterested: ['Custom AI Solutions'],
    notes: ['Needs custom NLP pipeline.'], totalEmails: 5, openRate: 80, replyRate: 40,
  },
  {
    id: 'c6', firstName: 'Jessica', lastName: 'Wang', email: 'jessica@datafirst.ai', phone: '+1 555-0106',
    company: 'DataFirst Analytics', industry: 'Data Science', role: 'Founder', status: 'contacted', score: 55,
    tags: ['analytics', 'consulting'], source: 'Website', createdAt: '2025-06-01',
    lastActivity: '2025-06-07', location: 'Boston, MA', servicesInterested: ['AI Consulting'],
    notes: [], totalEmails: 3, openRate: 67, replyRate: 0,
  },
  {
    id: 'c7', firstName: 'Alex', lastName: 'Martinez', email: 'alex@brightpath.com', phone: '+1 555-0107',
    company: 'BrightPath Education', industry: 'Education', role: 'Head of Digital', status: 'new', score: 42,
    tags: ['education', 'chatbot'], source: 'Google Ads', createdAt: '2025-06-10',
    lastActivity: '2025-06-10', location: 'Miami, FL', servicesInterested: ['AI Chatbots'],
    notes: [], totalEmails: 1, openRate: 100, replyRate: 0,
  },
  {
    id: 'c8', firstName: 'Priya', lastName: 'Sharma', email: 'priya@luxestay.com', phone: '+91 98765-43210',
    company: 'LuxeStay Hotels', industry: 'Hospitality', role: 'GM', status: 'proposal_viewed', score: 78,
    tags: ['hospitality', 'voice-agent', 'international'], source: 'LinkedIn', createdAt: '2025-04-15',
    lastActivity: '2025-06-11', location: 'Mumbai, India', servicesInterested: ['AI Voice Agents', 'AI Chatbots'],
    notes: ['Viewed proposal 3 times. High intent.'], totalEmails: 12, openRate: 91, replyRate: 33,
  },
  {
    id: 'c9', firstName: 'James', lastName: 'O\'Brien', email: 'james@realtypro.com', phone: '+1 555-0109',
    company: 'Realty Pro Group', industry: 'Real Estate', role: 'Managing Director', status: 'lost', score: 30,
    tags: ['real-estate', 'lost-lead'], source: 'Website', createdAt: '2025-03-01',
    lastActivity: '2025-04-20', location: 'Denver, CO', servicesInterested: ['AI Sales Automation'],
    notes: ['Budget constraints. Re-engage in Q4.'], totalEmails: 14, openRate: 57, replyRate: 14,
  },
  {
    id: 'c10', firstName: 'Lisa', lastName: 'Johnson', email: 'lisa@greenfield.co', phone: '+1 555-0110',
    company: 'Greenfield Manufacturing', industry: 'Manufacturing', role: 'Operations Lead', status: 'inactive', score: 20,
    tags: ['manufacturing', 'inactive'], source: 'Cold Email', createdAt: '2025-02-15',
    lastActivity: '2025-03-10', location: 'Detroit, MI', servicesInterested: ['AI Workflow Automation'],
    notes: ['No response in 3 months.'], totalEmails: 6, openRate: 33, replyRate: 0,
  },
];

// ============================================================
// EMAILS
// ============================================================
export const emails: Email[] = [
  { id: 'e1', contactId: 'c7', contactName: 'Alex Martinez', contactEmail: 'alex@brightpath.com', subject: 'Welcome to Vyravo AI — Let\'s Transform Your Business', preview: 'Hi Alex, thank you for reaching out! We\'re excited to explore how AI automation can...', body: '', status: 'delivered', template: 'Welcome', sentAt: '2025-06-10T10:30:00', category: 'Welcome' },
  { id: 'e2', contactId: 'c4', contactName: 'Emily Rodriguez', contactEmail: 'emily@scaleuphq.com', subject: 'Your Custom AI Proposal — ScaleUp HQ', preview: 'Hi Emily, attached is your custom AI automation proposal with detailed...', body: '', status: 'opened', template: 'Proposal', sentAt: '2025-06-05T14:00:00', openedAt: '2025-06-05T14:32:00', category: 'Proposal' },
  { id: 'e3', contactId: 'c8', contactName: 'Priya Sharma', contactEmail: 'priya@luxestay.com', subject: 'Re: AI Voice Agent Proposal — LuxeStay Hotels', preview: 'Hi Priya, I noticed you\'ve had a chance to review the proposal. Would love to...', body: '', status: 'opened', template: 'Follow-up', sentAt: '2025-06-09T08:00:00', openedAt: '2025-06-09T09:15:00', category: 'Follow-up' },
  { id: 'e4', contactId: 'c5', contactName: 'David Kim', contactEmail: 'david@innovateco.io', subject: 'Discovery Call Confirmation — Tomorrow at 2 PM PST', preview: 'Hi David, this is a confirmation for our discovery call tomorrow...', body: '', status: 'opened', template: 'Discovery Call', sentAt: '2025-06-08T16:00:00', openedAt: '2025-06-08T16:45:00', category: 'Discovery Call' },
  { id: 'e5', contactId: 'c6', contactName: 'Jessica Wang', contactEmail: 'jessica@datafirst.ai', subject: 'How AI Consulting Can 3x Your Data Pipeline Efficiency', preview: 'Hi Jessica, I wanted to share a quick case study on how we helped...', body: '', status: 'sent', template: 'Lead Nurture', sentAt: '2025-06-07T10:00:00', category: 'Nurture' },
  { id: 'e6', contactId: 'c1', contactName: 'Sarah Chen', contactEmail: 'sarah@techventure.com', subject: 'Monthly Performance Report — May 2025', preview: 'Hi Sarah, here\'s your monthly AI chatbot performance summary...', body: '', status: 'clicked', template: 'Project Update', sentAt: '2025-06-02T09:00:00', openedAt: '2025-06-02T09:30:00', clickedAt: '2025-06-02T09:32:00', category: 'Project Update' },
  { id: 'e7', contactId: 'c2', contactName: 'Dr. Rajesh Patel', contactEmail: 'rajesh@medcare.com', subject: 'Voice Agent Optimization Results — Q2 Update', preview: 'Hi Rajesh, great news! Your voice agent\'s performance has improved by...', body: '', status: 'replied', template: 'Project Update', sentAt: '2025-06-01T11:00:00', openedAt: '2025-06-01T11:20:00', repliedAt: '2025-06-01T14:00:00', category: 'Project Update' },
  { id: 'e8', contactId: 'c3', contactName: 'Michael Torres', contactEmail: 'michael@globallogistics.com', subject: 'Referral Program — Earn $500 for Every Introduction', preview: 'Hi Michael, as a valued client, we\'d love to offer you our referral...', body: '', status: 'opened', template: 'Referral', sentAt: '2025-06-10T08:00:00', openedAt: '2025-06-10T10:00:00', category: 'Referral' },
  { id: 'e9', contactId: 'c9', contactName: 'James O\'Brien', contactEmail: 'james@realtypro.com', subject: 'We\'d Love to Reconnect — New Pricing for Q3', preview: 'Hi James, it\'s been a while since we last spoke. We\'ve launched new...', body: '', status: 'sent', template: 'Re-engagement', sentAt: '2025-06-11T07:00:00', category: 'Re-engagement' },
  { id: 'e10', contactId: 'c10', contactName: 'Lisa Johnson', contactEmail: 'lisa@greenfield.co', subject: 'AI Automation for Manufacturing — Free Assessment', preview: 'Hi Lisa, we\'ve recently completed a project for a manufacturing...', body: '', status: 'bounced', template: 'Lost Lead', sentAt: '2025-06-08T06:00:00', category: 'Re-engagement' },
  { id: 'e11', contactId: 'c4', contactName: 'Emily Rodriguez', contactEmail: 'emily@scaleuphq.com', subject: 'Quick Question About Your AI Chatbot Requirements', preview: 'Hi Emily, I wanted to follow up on a few questions from our last...', body: '', status: 'scheduled', scheduledAt: '2025-06-13T09:00:00', category: 'Follow-up' },
  { id: 'e12', contactId: 'c5', contactName: 'David Kim', contactEmail: 'david@innovateco.io', subject: 'Post-Call Summary — Custom NLP Pipeline for InnovateCo', preview: 'Hi David, great speaking with you today! Here\'s a summary of...', body: '', status: 'draft', category: 'Discovery Call' },
];

// ============================================================
// EMAIL TEMPLATES
// ============================================================
export const templates: EmailTemplate[] = [
  { id: 't1', name: 'Welcome Email', category: 'Welcome', subject: 'Welcome to Vyravo AI — Let\'s Transform {{company}}', body: 'Hi {{firstName}},\n\nThank you for reaching out to Vyravo AI! We\'re excited to explore how AI automation can help {{company}} achieve its goals.\n\nHere\'s what to expect next:\n1. We\'ll review your inquiry within 24 hours\n2. A team member will reach out to schedule a discovery call\n3. We\'ll prepare a customized assessment for {{industry}}\n\nIn the meantime, feel free to book a call directly: [Book Discovery Call]\n\nBest regards,\nAkshay Navale\nFounder, Vyravo AI', variables: ['firstName', 'company', 'industry'], openRate: 78, clickRate: 32, replyRate: 18, usageCount: 156, lastUsed: '2025-06-10', status: 'active' },
  { id: 't2', name: 'Discovery Call Booking', category: 'Discovery Call', subject: 'Your Discovery Call is Confirmed — {{meetingDate}}', body: 'Hi {{firstName}},\n\nYour discovery call has been confirmed!\n\nDetails:\n📅 Date: {{meetingDate}}\n⏰ Time: {{meetingTime}}\n🔗 Link: {{meetingLink}}\n\nTo make the most of our 30 minutes, please consider:\n• Your biggest operational challenges\n• Current tools and workflows\n• Goals for the next 6-12 months\n\nLooking forward to speaking with you!\n\nBest,\nAkshay Navale', variables: ['firstName', 'meetingDate', 'meetingTime', 'meetingLink'], openRate: 92, clickRate: 45, replyRate: 28, usageCount: 89, lastUsed: '2025-06-08', status: 'active' },
  { id: 't3', name: 'Meeting Reminder (24h)', category: 'Reminder', subject: 'Reminder: Discovery Call Tomorrow — {{company}}', body: 'Hi {{firstName}},\n\nJust a friendly reminder about our discovery call tomorrow.\n\n📅 {{meetingDate}} at {{meetingTime}}\n🔗 {{meetingLink}}\n\nIf you need to reschedule, no worries — just reply to this email.\n\nSee you tomorrow!\n\nBest,\nAkshay', variables: ['firstName', 'company', 'meetingDate', 'meetingTime', 'meetingLink'], openRate: 88, clickRate: 52, replyRate: 12, usageCount: 82, lastUsed: '2025-06-07', status: 'active' },
  { id: 't4', name: 'Proposal Email', category: 'Proposal', subject: 'Your Custom AI Proposal — {{company}}', body: 'Hi {{firstName}},\n\nThank you for the insightful conversation during our discovery call.\n\nI\'ve prepared a custom proposal for {{company}} that outlines:\n\n✅ Recommended AI Solutions for {{industry}}\n✅ Implementation Timeline\n✅ Investment Breakdown\n✅ Expected ROI\n\n📄 [View Proposal]\n\nI\'d love to schedule a 15-minute call to walk you through the details.\n\nBest regards,\nAkshay Navale\nFounder, Vyravo AI', variables: ['firstName', 'company', 'industry'], openRate: 85, clickRate: 62, replyRate: 35, usageCount: 64, lastUsed: '2025-06-05', status: 'active' },
  { id: 't5', name: 'Proposal Follow-up (2 days)', category: 'Follow-up', subject: 'Quick follow-up on your proposal — {{company}}', body: 'Hi {{firstName}},\n\nI wanted to check in and see if you had a chance to review the proposal I sent over.\n\nI\'m happy to answer any questions or adjust the scope based on your priorities.\n\nWould a quick 15-minute call work this week?\n\nBest,\nAkshay', variables: ['firstName', 'company'], openRate: 72, clickRate: 28, replyRate: 22, usageCount: 58, lastUsed: '2025-06-07', status: 'active' },
  { id: 't6', name: 'Client Onboarding', category: 'Onboarding', subject: 'Welcome Aboard, {{company}}! 🎉 — Let\'s Get Started', body: 'Hi {{firstName}},\n\nWelcome to the Vyravo AI family! We\'re thrilled to begin working with {{company}}.\n\nHere\'s your onboarding checklist:\n\n1. ✅ Proposal Accepted\n2. 📋 Complete the onboarding form\n3. 🔑 Access your client portal\n4. 📅 Kickoff meeting scheduled\n5. 📄 Review project timeline\n\nYour dedicated project manager will be in touch within 24 hours.\n\nLet\'s build something amazing together!\n\nBest,\nAkshay Navale', variables: ['firstName', 'company'], openRate: 95, clickRate: 68, replyRate: 45, usageCount: 32, lastUsed: '2025-06-01', status: 'active' },
  { id: 't7', name: 'Project Milestone Update', category: 'Project Update', subject: 'Milestone Completed — {{projectName}} Update', body: 'Hi {{firstName}},\n\nGreat news! We\'ve completed a key milestone on {{projectName}}.\n\n✅ Completed: {{milestoneName}}\n📊 Progress: {{progress}}%\n📅 Next milestone: {{nextMilestone}}\n\nYou can review the latest updates in your client portal.\n\nBest,\nVyravo AI Team', variables: ['firstName', 'projectName', 'milestoneName', 'progress', 'nextMilestone'], openRate: 82, clickRate: 55, replyRate: 20, usageCount: 48, lastUsed: '2025-06-10', status: 'active' },
  { id: 't8', name: 'Review Request', category: 'Review', subject: 'How was your experience with Vyravo AI?', body: 'Hi {{firstName}},\n\nNow that {{projectName}} is complete, we\'d love to hear your feedback!\n\nYour review helps us improve and helps other businesses discover AI automation.\n\n⭐ [Leave a Google Review]\n💼 [Write a LinkedIn Recommendation]\n\nThank you for trusting Vyravo AI with {{company}}\'s automation journey.\n\nWarm regards,\nAkshay Navale', variables: ['firstName', 'projectName', 'company'], openRate: 65, clickRate: 35, replyRate: 28, usageCount: 24, lastUsed: '2025-05-28', status: 'active' },
  { id: 't9', name: 'Referral Request', category: 'Referral', subject: 'Know Someone Who Needs AI Automation?', body: 'Hi {{firstName}},\n\nThank you for being an amazing client! We\'d love your help spreading the word.\n\nFor every successful referral, we offer:\n💰 $500 credit on your next project\n🎁 1 month free maintenance\n\nSimply reply with their name and email, and we\'ll take it from there.\n\nBest,\nAkshay', variables: ['firstName'], openRate: 58, clickRate: 22, replyRate: 15, usageCount: 28, lastUsed: '2025-06-10', status: 'active' },
  { id: 't10', name: 'Re-engagement Email', category: 'Re-engagement', subject: 'We\'d Love to Reconnect — New Solutions for {{industry}}', body: 'Hi {{firstName}},\n\nIt\'s been a while since we last connected, and a lot has changed at Vyravo AI!\n\nWe\'ve launched new solutions specifically for {{industry}}:\n\n🚀 Enhanced AI capabilities\n💰 Flexible pricing options\n📊 Proven ROI in {{industry}}\n\nWould you be open to a quick 15-minute call to explore what\'s new?\n\n[Book a Call]\n\nBest,\nAkshay', variables: ['firstName', 'industry'], openRate: 42, clickRate: 18, replyRate: 8, usageCount: 35, lastUsed: '2025-06-11', status: 'active' },
  { id: 't11', name: 'Newsletter', category: 'Newsletter', subject: 'AI Automation Insights — {{month}} Edition', body: 'Hi {{firstName}},\n\nHere\'s your monthly dose of AI automation insights from Vyravo AI.\n\n📰 This Month\'s Highlights:\n1. [Article Title 1]\n2. [Article Title 2]\n3. [Article Title 3]\n\n💡 Quick Tip: {{tip}}\n\n📊 Industry Update: {{industryUpdate}}\n\nStay automated,\nVyravo AI Team', variables: ['firstName', 'month', 'tip', 'industryUpdate'], openRate: 35, clickRate: 12, replyRate: 3, usageCount: 6, lastUsed: '2025-06-01', status: 'active' },
  { id: 't12', name: 'Invoice Email', category: 'Invoice', subject: 'Invoice #{{invoiceNumber}} — {{company}}', body: 'Hi {{firstName}},\n\nPlease find your invoice attached.\n\nInvoice Details:\n📄 Invoice #: {{invoiceNumber}}\n💰 Amount: {{amount}}\n📅 Due Date: {{dueDate}}\n\nPayment Methods:\n• Bank Transfer\n• Credit Card via Stripe\n• UPI (India)\n\n[Pay Now]\n\nQuestions? Reply to this email.\n\nBest,\nVyravo AI Billing', variables: ['firstName', 'company', 'invoiceNumber', 'amount', 'dueDate'], openRate: 90, clickRate: 72, replyRate: 8, usageCount: 42, lastUsed: '2025-06-08', status: 'active' },
];

// ============================================================
// WORKFLOWS
// ============================================================
export const workflows: Workflow[] = [
  {
    id: 'w1', name: 'Website Inquiry → Welcome Sequence', description: 'Automatically welcomes new leads from the website contact form and nurtures them toward a discovery call.',
    status: 'active', trigger: 'Form Submission', contactsEnrolled: 234, contactsCompleted: 156, conversionRate: 34,
    createdAt: '2025-01-10', updatedAt: '2025-06-10', category: 'Lead Generation',
    steps: [
      { id: 's1', type: 'action', name: 'Create CRM Contact', config: {}, position: 0 },
      { id: 's2', type: 'action', name: 'Assign Lead Score', config: {}, position: 1 },
      { id: 's3', type: 'email', name: 'Send Welcome Email', config: { template: 't1' }, position: 2 },
      { id: 's4', type: 'notification', name: 'Notify Team via Slack', config: {}, position: 3 },
      { id: 's5', type: 'delay', name: 'Wait 3 Days', config: { days: 3 }, position: 4 },
      { id: 's6', type: 'condition', name: 'Check: Call Booked?', config: {}, position: 5 },
      { id: 's7', type: 'email', name: 'Send Benefits of AI Email', config: {}, position: 6 },
      { id: 's8', type: 'delay', name: 'Wait 4 Days', config: { days: 4 }, position: 7 },
      { id: 's9', type: 'email', name: 'Send Industry Case Study', config: {}, position: 8 },
    ],
  },
  {
    id: 'w2', name: 'Discovery Call → Meeting Flow', description: 'Manages the entire discovery call lifecycle from booking to post-call follow-up.',
    status: 'active', trigger: 'Call Booked', contactsEnrolled: 89, contactsCompleted: 72, conversionRate: 58,
    createdAt: '2025-01-15', updatedAt: '2025-06-09', category: 'Sales',
    steps: [
      { id: 's1', type: 'email', name: 'Booking Confirmation', config: { template: 't2' }, position: 0 },
      { id: 's2', type: 'action', name: 'Create Calendar Event', config: {}, position: 1 },
      { id: 's3', type: 'delay', name: 'Wait Until 24h Before', config: {}, position: 2 },
      { id: 's4', type: 'email', name: 'Send 24h Reminder', config: { template: 't3' }, position: 3 },
      { id: 's5', type: 'delay', name: 'Wait Until 2h Before', config: {}, position: 4 },
      { id: 's6', type: 'email', name: 'Send 2h Reminder', config: {}, position: 5 },
      { id: 's7', type: 'delay', name: 'Wait Until After Call', config: {}, position: 6 },
      { id: 's8', type: 'email', name: 'Send Thank You + Summary', config: {}, position: 7 },
    ],
  },
  {
    id: 'w3', name: 'Proposal Sent → Acceptance Flow', description: 'Tracks proposal engagement and sends intelligent follow-ups based on viewing behavior.',
    status: 'active', trigger: 'Proposal Sent', contactsEnrolled: 64, contactsCompleted: 38, conversionRate: 45,
    createdAt: '2025-02-01', updatedAt: '2025-06-11', category: 'Sales',
    steps: [
      { id: 's1', type: 'email', name: 'Send Proposal Email', config: { template: 't4' }, position: 0 },
      { id: 's2', type: 'action', name: 'Track Proposal Views', config: {}, position: 1 },
      { id: 's3', type: 'delay', name: 'Wait 2 Days', config: { days: 2 }, position: 2 },
      { id: 's4', type: 'condition', name: 'Check: Proposal Viewed?', config: {}, position: 3 },
      { id: 's5', type: 'email', name: 'Send Follow-up (2 days)', config: { template: 't5' }, position: 4 },
      { id: 's6', type: 'delay', name: 'Wait 3 More Days', config: { days: 3 }, position: 5 },
      { id: 's7', type: 'email', name: 'Send Follow-up (5 days)', config: {}, position: 6 },
      { id: 's8', type: 'delay', name: 'Wait 5 More Days', config: { days: 5 }, position: 7 },
      { id: 's9', type: 'email', name: 'Final Follow-up (10 days)', config: {}, position: 8 },
    ],
  },
  {
    id: 'w4', name: 'Client Onboarding Sequence', description: 'Automates the entire client onboarding process from proposal acceptance to project kickoff.',
    status: 'active', trigger: 'Proposal Accepted', contactsEnrolled: 32, contactsCompleted: 28, conversionRate: 100,
    createdAt: '2025-02-15', updatedAt: '2025-06-01', category: 'Onboarding',
    steps: [
      { id: 's1', type: 'email', name: 'Welcome Aboard Email', config: { template: 't6' }, position: 0 },
      { id: 's2', type: 'action', name: 'Generate Invoice', config: {}, position: 1 },
      { id: 's3', type: 'email', name: 'Send Invoice', config: { template: 't12' }, position: 2 },
      { id: 's4', type: 'action', name: 'Create Client Portal', config: {}, position: 3 },
      { id: 's5', type: 'notification', name: 'Notify Team', config: {}, position: 4 },
      { id: 's6', type: 'delay', name: 'Wait 1 Day', config: { days: 1 }, position: 5 },
      { id: 's7', type: 'email', name: 'Send Project Timeline', config: {}, position: 6 },
    ],
  },
  {
    id: 'w5', name: 'Post-Project → Review & Referral', description: 'Automatically requests reviews, referrals, and offers upsell opportunities after project completion.',
    status: 'active', trigger: 'Project Completed', contactsEnrolled: 24, contactsCompleted: 18, conversionRate: 42,
    createdAt: '2025-03-01', updatedAt: '2025-05-28', category: 'Retention',
    steps: [
      { id: 's1', type: 'email', name: 'Project Completion Email', config: {}, position: 0 },
      { id: 's2', type: 'delay', name: 'Wait 3 Days', config: { days: 3 }, position: 1 },
      { id: 's3', type: 'email', name: 'Feedback Request', config: { template: 't8' }, position: 2 },
      { id: 's4', type: 'delay', name: 'Wait 7 Days', config: { days: 7 }, position: 3 },
      { id: 's5', type: 'email', name: 'Referral Request', config: { template: 't9' }, position: 4 },
      { id: 's6', type: 'delay', name: 'Wait 14 Days', config: { days: 14 }, position: 5 },
      { id: 's7', type: 'email', name: 'Upsell Opportunity', config: {}, position: 6 },
    ],
  },
  {
    id: 'w6', name: 'Lost Lead Recovery', description: 'Re-engages leads that went cold or rejected proposals with new offers and content.',
    status: 'active', trigger: 'Status: Lost/Inactive (30 days)', contactsEnrolled: 45, contactsCompleted: 12, conversionRate: 15,
    createdAt: '2025-03-15', updatedAt: '2025-06-11', category: 'Re-engagement',
    steps: [
      { id: 's1', type: 'email', name: 'Re-engagement Email', config: { template: 't10' }, position: 0 },
      { id: 's2', type: 'delay', name: 'Wait 7 Days', config: { days: 7 }, position: 1 },
      { id: 's3', type: 'condition', name: 'Check: Email Opened?', config: {}, position: 2 },
      { id: 's4', type: 'email', name: 'Send Case Study', config: {}, position: 3 },
      { id: 's5', type: 'delay', name: 'Wait 14 Days', config: { days: 14 }, position: 4 },
      { id: 's6', type: 'email', name: 'Special Offer Email', config: {}, position: 5 },
    ],
  },
  {
    id: 'w7', name: 'Monthly Newsletter', description: 'Sends monthly educational content and industry insights to all subscribers.',
    status: 'active', trigger: '1st of Every Month', contactsEnrolled: 520, contactsCompleted: 520, conversionRate: 8,
    createdAt: '2025-01-01', updatedAt: '2025-06-01', category: 'Newsletter',
    steps: [
      { id: 's1', type: 'email', name: 'Send Newsletter', config: { template: 't11' }, position: 0 },
      { id: 's2', type: 'action', name: 'Track Engagement', config: {}, position: 1 },
      { id: 's3', type: 'condition', name: 'Check: High Engagement?', config: {}, position: 2 },
      { id: 's4', type: 'action', name: 'Update Lead Score', config: {}, position: 3 },
    ],
  },
  {
    id: 'w8', name: 'Abandoned Contact Form', description: 'Recovers leads who started but didn\'t complete the contact form.',
    status: 'paused', trigger: 'Form Abandoned', contactsEnrolled: 78, contactsCompleted: 15, conversionRate: 12,
    createdAt: '2025-04-01', updatedAt: '2025-05-15', category: 'Lead Generation',
    steps: [
      { id: 's1', type: 'delay', name: 'Wait 1 Hour', config: { hours: 1 }, position: 0 },
      { id: 's2', type: 'email', name: 'Complete Your Inquiry', config: {}, position: 1 },
      { id: 's3', type: 'delay', name: 'Wait 24 Hours', config: { hours: 24 }, position: 2 },
      { id: 's4', type: 'email', name: 'We\'re Here to Help', config: {}, position: 3 },
    ],
  },
];

// ============================================================
// CAMPAIGNS
// ============================================================
export const campaigns: Campaign[] = [
  { id: 'camp1', name: 'Q2 Lead Generation', type: 'automated', status: 'active', sent: 1250, delivered: 1220, opened: 854, clicked: 366, replied: 125, bounced: 30, unsubscribed: 8, revenue: 45000, startDate: '2025-04-01' },
  { id: 'camp2', name: 'Healthcare AI Showcase', type: 'manual', status: 'completed', sent: 320, delivered: 315, opened: 252, clicked: 128, replied: 45, bounced: 5, unsubscribed: 2, revenue: 28000, startDate: '2025-03-15', endDate: '2025-04-30' },
  { id: 'camp3', name: 'Client Retention — June', type: 'automated', status: 'active', sent: 85, delivered: 84, opened: 72, clicked: 45, replied: 18, bounced: 1, unsubscribed: 0, revenue: 12000, startDate: '2025-06-01' },
  { id: 'camp4', name: 'Re-engagement — Q2', type: 'automated', status: 'active', sent: 180, delivered: 168, opened: 71, clicked: 32, replied: 8, bounced: 12, unsubscribed: 5, revenue: 5500, startDate: '2025-05-01' },
  { id: 'camp5', name: 'Newsletter — June 2025', type: 'manual', status: 'completed', sent: 520, delivered: 512, opened: 179, clicked: 62, replied: 15, bounced: 8, unsubscribed: 3, revenue: 0, startDate: '2025-06-01', endDate: '2025-06-01' },
];

// ============================================================
// ACTIVITIES
// ============================================================
export const activities: Activity[] = [
  { id: 'a1', type: 'form_submitted', description: 'Alex Martinez submitted the contact form', contactName: 'Alex Martinez', contactId: 'c7', timestamp: '2025-06-10T10:28:00' },
  { id: 'a2', type: 'workflow_triggered', description: 'Welcome Sequence triggered for Alex Martinez', contactName: 'Alex Martinez', contactId: 'c7', timestamp: '2025-06-10T10:28:01' },
  { id: 'a3', type: 'contact_created', description: 'Contact created: Alex Martinez (BrightPath Education)', contactName: 'Alex Martinez', contactId: 'c7', timestamp: '2025-06-10T10:28:02' },
  { id: 'a4', type: 'email_sent', description: 'Welcome email sent to Alex Martinez', contactName: 'Alex Martinez', contactId: 'c7', timestamp: '2025-06-10T10:30:00' },
  { id: 'a5', type: 'email_opened', description: 'Emily Rodriguez opened "Your Custom AI Proposal"', contactName: 'Emily Rodriguez', contactId: 'c4', timestamp: '2025-06-10T09:15:00' },
  { id: 'a6', type: 'proposal_viewed', description: 'Priya Sharma viewed proposal (3rd time)', contactName: 'Priya Sharma', contactId: 'c8', timestamp: '2025-06-10T08:45:00' },
  { id: 'a7', type: 'email_replied', description: 'Dr. Rajesh Patel replied to Q2 performance update', contactName: 'Dr. Rajesh Patel', contactId: 'c2', timestamp: '2025-06-10T07:30:00' },
  { id: 'a8', type: 'call_booked', description: 'David Kim booked a discovery call for June 12', contactName: 'David Kim', contactId: 'c5', timestamp: '2025-06-09T14:00:00' },
  { id: 'a9', type: 'email_clicked', description: 'Sarah Chen clicked link in monthly report', contactName: 'Sarah Chen', contactId: 'c1', timestamp: '2025-06-09T11:30:00' },
  { id: 'a10', type: 'proposal_accepted', description: 'Michael Torres accepted maintenance proposal', contactName: 'Michael Torres', contactId: 'c3', timestamp: '2025-06-08T16:00:00' },
  { id: 'a11', type: 'payment_received', description: 'Payment received from TechVenture Capital — $4,500', contactName: 'Sarah Chen', contactId: 'c1', timestamp: '2025-06-08T10:00:00' },
  { id: 'a12', type: 'project_started', description: 'Project kickoff: Voice Agent v2 for MedCare', contactName: 'Dr. Rajesh Patel', contactId: 'c2', timestamp: '2025-06-07T09:00:00' },
];

// ============================================================
// INTEGRATIONS
// ============================================================
export const integrations: Integration[] = [
  { id: 'i1', name: 'OpenAI', category: 'AI', icon: '🤖', status: 'connected', description: 'GPT-4 for email generation, subject lines, and content optimization' },
  { id: 'i2', name: 'Google Workspace', category: 'Email', icon: '📧', status: 'connected', description: 'Gmail integration for sending and receiving emails' },
  { id: 'i3', name: 'Calendly', category: 'Scheduling', icon: '📅', status: 'connected', description: 'Automatic discovery call booking and calendar sync' },
  { id: 'i4', name: 'Stripe', category: 'Payments', icon: '💳', status: 'connected', description: 'Invoice generation, payment tracking, and subscription management' },
  { id: 'i5', name: 'Slack', category: 'Communication', icon: '💬', status: 'connected', description: 'Team notifications for new leads, proposals, and payments' },
  { id: 'i6', name: 'Resend', category: 'Email Delivery', icon: '📨', status: 'connected', description: 'Transactional email delivery with high deliverability' },
  { id: 'i7', name: 'n8n', category: 'Automation', icon: '⚙️', status: 'connected', description: 'Workflow automation engine for complex multi-step processes' },
  { id: 'i8', name: 'Supabase', category: 'Database', icon: '🗄️', status: 'connected', description: 'PostgreSQL database for contacts, emails, and analytics' },
  { id: 'i9', name: 'Anthropic', category: 'AI', icon: '🧠', status: 'disconnected', description: 'Claude for advanced email writing and conversation analysis' },
  { id: 'i10', name: 'HubSpot', category: 'CRM', icon: '🏢', status: 'disconnected', description: 'CRM sync for contact management and pipeline tracking' },
  { id: 'i11', name: 'SendGrid', category: 'Email Delivery', icon: '📬', status: 'disconnected', description: 'Alternative email delivery for high-volume campaigns' },
  { id: 'i12', name: 'Twilio', category: 'Communication', icon: '📱', status: 'disconnected', description: 'SMS notifications and WhatsApp integration' },
  { id: 'i13', name: 'Make', category: 'Automation', icon: '🔗', status: 'disconnected', description: 'Visual automation builder for cross-platform workflows' },
  { id: 'i14', name: 'Notion', category: 'Productivity', icon: '📝', status: 'disconnected', description: 'Project documentation and client knowledge base' },
  { id: 'i15', name: 'Google Gemini', category: 'AI', icon: '✨', status: 'disconnected', description: 'Multimodal AI for content generation and analysis' },
  { id: 'i16', name: 'Zapier', category: 'Automation', icon: '⚡', status: 'disconnected', description: '5000+ app integrations for workflow automation' },
  { id: 'i17', name: 'Microsoft 365', category: 'Email', icon: '📮', status: 'disconnected', description: 'Outlook integration for enterprise email management' },
  { id: 'i18', name: 'WhatsApp Cloud API', category: 'Communication', icon: '💚', status: 'disconnected', description: 'WhatsApp Business messaging for client communication' },
];

// ============================================================
// ANALYTICS
// ============================================================
export const analyticsData: AnalyticsData = {
  totalEmails: 2355,
  delivered: 2299,
  opened: 1428,
  clicked: 633,
  replied: 211,
  bounced: 56,
  spamComplaints: 3,
  unsubscribes: 18,
  deliveryRate: 97.6,
  openRate: 62.1,
  clickRate: 27.5,
  replyRate: 9.2,
  bounceRate: 2.4,
  meetingsBooked: 89,
  proposalsSent: 64,
  proposalsAccepted: 32,
  revenue: 285000,
};

export const monthlyEmailStats = [
  { month: 'Jan', sent: 180, opened: 108, clicked: 45, replied: 16 },
  { month: 'Feb', sent: 220, opened: 140, clicked: 58, replied: 22 },
  { month: 'Mar', sent: 310, opened: 198, clicked: 84, replied: 30 },
  { month: 'Apr', sent: 380, opened: 240, clicked: 102, replied: 38 },
  { month: 'May', sent: 425, opened: 272, clicked: 122, replied: 42 },
  { month: 'Jun', sent: 460, opened: 295, clicked: 130, replied: 48 },
];

export const emailsByCategory = [
  { category: 'Welcome', count: 156, openRate: 78 },
  { category: 'Discovery Call', count: 178, openRate: 90 },
  { category: 'Follow-up', count: 245, openRate: 72 },
  { category: 'Proposal', count: 128, openRate: 85 },
  { category: 'Nurture', count: 380, openRate: 55 },
  { category: 'Project Update', count: 196, openRate: 82 },
  { category: 'Re-engagement', count: 215, openRate: 42 },
  { category: 'Newsletter', count: 520, openRate: 35 },
  { category: 'Referral', count: 56, openRate: 58 },
  { category: 'Invoice', count: 84, openRate: 90 },
];
