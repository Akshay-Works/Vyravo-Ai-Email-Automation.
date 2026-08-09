import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import EmailsPage from './pages/EmailsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import TemplatesPage from './pages/TemplatesPage';
import CampaignsPage from './pages/CampaignsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'dashboard': return <DashboardPage />;
    case 'contacts': return <ContactsPage />;
    case 'emails': return <EmailsPage />;
    case 'workflows': return <WorkflowsPage />;
    case 'templates': return <TemplatesPage />;
    case 'campaigns': return <CampaignsPage />;
    case 'analytics': return <AnalyticsPage />;
    case 'ai-assistant': return <AIAssistantPage />;
    case 'integrations': return <IntegrationsPage />;
    case 'settings': return <SettingsPage />;
    default: return <DashboardPage />;
  }
}

function AppLayout() {
  return (
    <div className="flex h-screen bg-[#0A0612] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <PageRouter />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
