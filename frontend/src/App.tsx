import React, { useState } from 'react';
import { Screen, UserRole, Incident, EmergencyUnit, TelemetrySummary } from './types';
import { INITIAL_INCIDENTS, INITIAL_UNITS, INITIAL_TELEMETRY } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/screens/LoginScreen';
import { LiveDashboard } from './components/screens/LiveDashboard';
import { DispatchCenter } from './components/screens/DispatchCenter';
import { ReportIncident } from './components/screens/ReportIncident';
import { AnalyticsReports } from './components/screens/AnalyticsReports';
import { IncidentMapExpanded } from './components/screens/IncidentMapExpanded';
import { SeverityPredictorScreen } from './components/screens/SeverityPredictorScreen';
import { RouteOptimizerScreen } from './components/screens/RouteOptimizerScreen';
import { ResourceTrackerScreen } from './components/screens/ResourceTrackerScreen';
import { ResponseLogsScreen } from './components/screens/ResponseLogsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('live-dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('admin');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core Tactical State
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [units, setUnits] = useState<EmergencyUnit[]>(INITIAL_UNITS);
  const [telemetry, setTelemetry] = useState<TelemetrySummary>(INITIAL_TELEMETRY);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');

  // Callback when an incident is reported via Intake CAD
  const handleIncidentCreated = (newIncident: Incident) => {
    setIncidents([newIncident, ...incidents]);
    setSelectedIncidentId(newIncident.id);
    setTelemetry((prev) => ({
      ...prev,
      activeIncidents: prev.activeIncidents + 1,
      criticalCount: newIncident.severity === 'CRITICAL' ? prev.criticalCount + 1 : prev.criticalCount
    }));
  };

  // Callback when units are dispatched
  const handleUnitsDispatched = (incidentId: string, unitIds: string[]) => {
    setUnits((prev) =>
      prev.map((u) => (unitIds.includes(u.id) ? { ...u, status: 'EN ROUTE' } : u))
    );
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'Dispatched',
              assignedUnits: Array.from(new Set([...inc.assignedUnits, ...unitIds]))
            }
          : inc
      )
    );
    setTelemetry((prev) => ({
      ...prev,
      unitsDeployed: Math.min(prev.totalUnits, prev.unitsDeployed + unitIds.length),
      resourcesAvailable: Math.max(0, prev.resourcesAvailable - unitIds.length)
    }));
  };

  // Login handler
  const handleLoginSuccess = (role: UserRole) => {
    setCurrentUserRole(role);
    setCurrentScreen('live-dashboard');
  };

  // If on login screen, render full-viewport login view
  if (currentScreen === 'login') {
    return (
      <div className="w-full min-h-screen bg-[#080d1d]">
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  const activeIncidentsCount = incidents.filter((i) => i.status === 'Active' || i.status === 'Pending').length;
  const pendingDispatchCount = incidents.filter((i) => i.status === 'Active').length;

  return (
    <div className="min-h-screen bg-[#080d1d] text-[#dee1f9] flex flex-col font-sans selection:bg-[#4cd7f6]/30 selection:text-[#dee1f9]">
      {/* Tactical Fixed Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onLogout={() => setCurrentScreen('login')}
        activeIncidentsCount={activeIncidentsCount}
        pendingDispatchCount={pendingDispatchCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-60 flex flex-col min-h-screen">
        {/* Fixed Top Telemetry & Status Header */}
        <Header
          onNavigate={setCurrentScreen}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Screen Viewport with Top Padding for Header */}
        <main className="flex-1 mt-14 overflow-x-hidden">
          {currentScreen === 'live-dashboard' && (
            <LiveDashboard
              telemetry={telemetry}
              incidents={incidents}
              onNavigate={setCurrentScreen}
              onSelectIncidentForDispatch={(id) => {
                setSelectedIncidentId(id);
                setCurrentScreen('dispatch-center');
              }}
            />
          )}

          {currentScreen === 'dispatch-center' && (
            <DispatchCenter
              incidents={incidents}
              units={units}
              selectedIncidentId={selectedIncidentId}
              onSelectIncident={setSelectedIncidentId}
              onUnitsDispatched={handleUnitsDispatched}
            />
          )}

          {currentScreen === 'incident-map' && (
            <IncidentMapExpanded
              incidents={incidents}
              units={units}
              onSelectIncident={setSelectedIncidentId}
              onNavigateToDispatch={() => setCurrentScreen('dispatch-center')}
            />
          )}

          {currentScreen === 'report-incident' && (
            <ReportIncident onIncidentCreated={handleIncidentCreated} />
          )}

          {currentScreen === 'analytics-reports' && <AnalyticsReports />}

          {currentScreen === 'severity-predictor' && <SeverityPredictorScreen />}

          {currentScreen === 'route-optimizer' && <RouteOptimizerScreen />}

          {currentScreen === 'resource-tracker' && <ResourceTrackerScreen units={units} />}

          {currentScreen === 'response-logs' && <ResponseLogsScreen />}

          {currentScreen === 'settings' && <SettingsScreen />}
        </main>
      </div>
    </div>
  );
}
