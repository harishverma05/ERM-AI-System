import React, { useState, useEffect } from 'react';
import { Incident, TelemetrySummary, Screen } from '../../types';

interface LiveDashboardProps {
  telemetry: TelemetrySummary;
  incidents: Incident[];
  onNavigate: (screen: Screen) => void;
  onSelectIncidentForDispatch: (incidentId: string) => void;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({
  telemetry,
  incidents,
  onNavigate,
  onSelectIncidentForDispatch,
}) => {
  const [activeMapMode, setActiveMapMode] = useState<'units' | 'heat' | 'layers'>('units');
  const [mapZoomLevel, setMapZoomLevel] = useState<number>(1);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'incidents' | 'dispatch'>('all');
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'dispatching' | 'dispatched'>('idle');
  const [lastSyncSec, setLastSyncSec] = useState<number>(2);

  // Sync ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLastSyncSec((prev) => (prev >= 15 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const handleAcceptHeroDispatch = () => {
    setDispatchStatus('dispatching');
    setTimeout(() => {
      setDispatchStatus('dispatched');
      setTimeout(() => {
        if (incidents.length > 0) onSelectIncidentForDispatch(incidents[0].id);
        onNavigate('dispatch-center');
      }, 1000);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none pb-4">
      {/* Top Stat Cards (5 Across) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3 md:p-4 bg-[#080d1d]">
        {/* Stat 1: Active Incidents */}
        <div
          onClick={() => onNavigate('dispatch-center')}
          className="flex flex-col justify-between bg-[#161b2b] p-3 rounded-lg border border-[#25293a] hover:bg-[#1a1f30] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
              Active Incidents
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#ff5451]/20 text-[#ffb3ad] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#ff5451]">arrow_drop_up</span>
              3 since last hr
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#dee1f9] font-stat-metric">
              {telemetry.activeIncidents}
            </span>
            <span className="text-xs text-[#ff5451] font-semibold font-code-telemetry animate-pulse">
              ● LIVE
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] truncate">
            {telemetry.criticalCount} Critical • {telemetry.highCount} High • {telemetry.medCount} Med
          </p>
        </div>

        {/* Stat 2: Units Dispatched */}
        <div
          onClick={() => onNavigate('dispatch-center')}
          className="flex flex-col justify-between bg-[#161b2b] p-3 rounded-lg border border-[#25293a] hover:bg-[#1a1f30] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
              Units Dispatched
            </span>
            <span className="font-code-telemetry text-[11px] px-1.5 py-0.5 rounded bg-[#25293a] text-[#4cd7f6] font-semibold">
              {telemetry.unitsBreakdown}
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#dee1f9] font-stat-metric">
              {telemetry.unitsDeployed}
            </span>
            <span className="font-code-telemetry text-xs text-[#64748b]">/ {telemetry.totalUnits} fleet</span>
          </div>
          <p className="text-xs text-[#4cd7f6] truncate font-medium">
            {telemetry.standbyUnits} units on standby
          </p>
        </div>

        {/* Stat 3: Avg Response Time */}
        <div
          onClick={() => onNavigate('analytics-reports')}
          className="flex flex-col justify-between bg-[#161b2b] p-3 rounded-lg border border-[#25293a] hover:bg-[#1a1f30] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
              Avg Response Time
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#4cd7f6]/20 text-[#4cd7f6] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">arrow_drop_down</span>
              1.4m vs ystd
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#4cd7f6] font-stat-metric">
              {telemetry.avgResponseTime}
            </span>
            <span className="font-code-telemetry text-xs text-[#4cd7f6] font-medium">min</span>
          </div>
          <p className="text-xs text-[#94a3b8] truncate">
            Target: &lt;{telemetry.slaTarget.toFixed(1)} min SLA
          </p>
        </div>

        {/* Stat 4: AI Model Accuracy */}
        <div
          onClick={() => onNavigate('analytics-reports')}
          className="flex flex-col justify-between bg-[#161b2b] p-3 rounded-lg border border-[#25293a] hover:bg-[#1a1f30] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
              AI Model Accuracy
            </span>
            <span className="font-code-telemetry text-[11px] px-1.5 py-0.5 rounded bg-[#25293a] text-[#4cd7f6] font-semibold">
              F1: {telemetry.f1Score}
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#dee1f9] font-stat-metric">
              {telemetry.aiModelAccuracy}%
            </span>
            <span className="text-[11px] text-[#4cd7f6] font-semibold">Triage v2.4</span>
          </div>
          <p className="text-xs text-[#94a3b8] truncate">
            {telemetry.evaluatedPredictions} predictions evaluated
          </p>
        </div>

        {/* Stat 5: Resources Available */}
        <div
          onClick={() => onNavigate('resource-tracker')}
          className="flex flex-col justify-between bg-[#161b2b] p-3 rounded-lg border border-[#25293a] hover:bg-[#1a1f30] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
              Resources Available
            </span>
            <span className="font-code-telemetry text-[11px] px-1.5 py-0.5 rounded bg-[#25293a] text-[#ffb95f] font-semibold">
              {telemetry.capacityPercent}% cap
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#dee1f9] font-stat-metric">
              {telemetry.resourcesAvailable}
            </span>
            <span className="font-code-telemetry text-xs text-[#64748b]">/ {telemetry.totalUnits} online</span>
          </div>
          <p className="text-xs text-[#94a3b8] truncate">
            {telemetry.stationsReporting} stations reporting
          </p>
        </div>
      </section>

      {/* Main Split Layout (65% Tactical Map / 35% AI Insights) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 px-3 md:px-4">
        {/* Tactical Map Column (8 Cols ~ 66%) */}
        <div className="xl:col-span-8 flex flex-col bg-[#161b2b] rounded-lg border border-[#25293a] overflow-hidden shadow-md">
          {/* Map Header & View Controls */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#1a1f30] border-b border-[#25293a] gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">explore</span>
                <span className="text-sm font-bold text-[#dee1f9]">Live Incident Map</span>
              </div>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff5451]/20 text-[#ffb3ad] text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] animate-ping" />
                LIVE
              </span>
              <span className="font-code-telemetry text-xs text-[#64748b] hidden md:inline font-semibold">
                GEO-SECTOR METRO-EAST
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Layer Toggles */}
              <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveMapMode('heat')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeMapMode === 'heat'
                      ? 'bg-[#25293a] text-[#ffb95f] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  Heatmap
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapMode('units')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeMapMode === 'units'
                      ? 'bg-[#25293a] text-[#4cd7f6] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  All Units (Active)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapMode('layers')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeMapMode === 'layers'
                      ? 'bg-[#25293a] text-[#dee1f9] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  Layers
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-0.5 bg-[#080d1d] p-0.5 rounded border border-[#25293a]">
                <button
                  type="button"
                  onClick={() => setMapZoomLevel((z) => Math.min(1.5, z + 0.15))}
                  className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#25293a] rounded transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoomLevel((z) => Math.max(0.85, z - 0.15))}
                  className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#25293a] rounded transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoomLevel(1)}
                  className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#25293a] rounded transition-colors cursor-pointer"
                  title="Recenter Tactical View"
                >
                  <span className="material-symbols-outlined text-[16px]">my_location</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tactical Map Viewport */}
          <div className="relative w-full h-[580px] bg-[#060a14] overflow-hidden cursor-crosshair">
            {/* Background Vector Tactical Grid */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-300 origin-center"
              style={{ transform: `scale(${mapZoomLevel})` }}
            >
              <svg className="w-full h-full pointer-events-none" viewBox="0 0 960 580" preserveAspectRatio="none">
                <defs>
                  <pattern id="tacticalGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b253b" strokeWidth="0.75" />
                    <circle cx="20" cy="20" r="1" fill="#253553" opacity="0.6" />
                  </pattern>

                  {/* Sector Gradients */}
                  <radialGradient id="zone4Glow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ff5451" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ff5451" stopOpacity="0.02" />
                  </radialGradient>
                  <radialGradient id="zone7Glow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ffb95f" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffb95f" stopOpacity="0.02" />
                  </radialGradient>
                  <radialGradient id="zone2Glow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.01" />
                  </radialGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#tacticalGridPattern)" />

                {/* Tactical Road Networks */}
                <g fill="none" stroke="#1b2a47" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                  {/* Highway 7 Spine */}
                  <path d="M -20 280 Q 240 260 480 320 T 960 270 T 1300 290" />
                  {/* Oak St Arterial */}
                  <path d="M 380 -20 L 410 260 L 460 420 L 480 640" />
                  {/* Lincoln Ave (Blocked Corridor) */}
                  <path d="M 220 40 L 260 210 L 320 340 L 340 600" stroke="#ff5451" strokeOpacity="0.6" strokeDasharray="6,4" />
                  {/* River Road Loop */}
                  <path d="M 520 620 C 640 480 720 360 760 120 L 780 -20" />
                  {/* Cross Streets */}
                  <path d="M 80 140 L 520 180 L 920 160" stroke="#141f35" strokeWidth="1.5" />
                  <path d="M 120 460 L 580 440 L 1020 480" stroke="#141f35" strokeWidth="1.5" />
                  <path d="M 680 200 L 980 380" stroke="#141f35" strokeWidth="1.5" />
                </g>

                {/* Active Dispatch Navigation Route: AMB-03 to Zone 4 Incident */}
                <path
                  d="M 230 460 L 310 390 L 420 380 L 455 320"
                  fill="none"
                  stroke="#4cd7f6"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  className="animate-pulse"
                />

                {/* Zone 4 Translucent Crimson Sector Polygon */}
                <polygon
                  points="360,200 560,190 590,380 390,400"
                  fill="url(#zone4Glow)"
                  stroke="#ff5451"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                  strokeOpacity="0.8"
                />
                <text x="375" y="225" fill="#ffb3ad" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" letterSpacing="1">
                  SECTOR ZONE-04 [CRITICAL HAZARD]
                </text>

                {/* Zone 7 Translucent Amber Sector Polygon */}
                <polygon
                  points="620,180 840,160 880,340 660,370"
                  fill="url(#zone7Glow)"
                  stroke="#ffb95f"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                  strokeOpacity="0.7"
                />
                <text x="635" y="205" fill="#ffddb8" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" letterSpacing="1">
                  SECTOR ZONE-07 [TRAFFIC / RESCUE]
                </text>

                {/* Zone 2 Translucent Cyan Sector Polygon */}
                <polygon
                  points="120,80 340,70 330,230 110,220"
                  fill="url(#zone2Glow)"
                  stroke="#4cd7f6"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                  strokeOpacity="0.6"
                />
                <text x="135" y="105" fill="#acedff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" letterSpacing="1">
                  SECTOR ZONE-02 [CONTAINMENT]
                </text>
              </svg>

              {/* Dynamic Tactical Markers Overlay — rendered from incidents */}
              {incidents.map((inc) => {
                const sevColor = inc.severity === 'CRITICAL' ? '#ff5451' : inc.severity === 'HIGH' ? '#ffb95f' : '#4cd7f6';
                return (
                  <div
                    key={inc.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    style={{ left: `${inc.mapCoords.x}px`, top: `${inc.mapCoords.y}px` }}
                    onClick={() => setSelectedIncidentId(inc.id)}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-10 h-10 rounded-full animate-ping" style={{ backgroundColor: `${sevColor}20` }} />
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#080d1d]" style={{ backgroundColor: sevColor }}>
                        <span className="material-symbols-outlined text-[12px] font-bold" style={{ color: '#080d1d' }}>warning</span>
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#080d1d]/90 backdrop-blur-md border px-2 py-0.5 rounded shadow-xl flex items-center gap-1.5" style={{ borderColor: `${sevColor}60` }}>
                        <span className="font-code-telemetry text-xs font-bold" style={{ color: sevColor }}>{inc.severity}</span>
                        <span className="text-[#64748b]">|</span>
                        <span className="text-xs font-semibold text-[#dee1f9]">{inc.id}: {inc.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Map Details Floating Card (Triggered on Click or Default Open) */}
            {currentIncident && (
            <div className="absolute bottom-4 right-4 max-w-xs bg-[#080d1d]/95 backdrop-blur-xl border border-[#25293a] p-3 rounded-lg shadow-2xl z-40">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-code-telemetry text-xs px-1.5 py-0.5 rounded bg-[#ff5451] text-[#5c0008] font-bold">
                  {currentIncident.severity} PRIORITY
                </span>
                <span className="font-code-telemetry text-[11px] text-[#64748b]">
                  {currentIncident.timestamp} EST
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#dee1f9] leading-snug">
                {currentIncident.id}: {currentIncident.title}
              </h4>
              <p className="text-xs text-[#94a3b8]">{currentIncident.location}</p>

              <div className="grid grid-cols-2 gap-2 my-2 font-code-telemetry text-xs bg-[#161b2b] p-2 rounded border border-[#25293a]">
                <div>
                  <span className="text-[#64748b] block text-[10px] uppercase">Casualties</span>
                  <span className="text-[#ff5451] font-bold">{currentIncident.casualties}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px] uppercase">Units Assigned</span>
                  <span className="text-[#4cd7f6] font-bold truncate block">
                    {currentIncident.assignedUnits.join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#4cd7f6] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] inline-block animate-pulse" />
                  Telemetry Live
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectIncidentForDispatch(currentIncident.id);
                    onNavigate('dispatch-center');
                  }}
                  className="px-2.5 py-1 rounded bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Focus Incident
                </button>
              </div>
            </div>
            )}

            {/* Tactical Map Legend at Bottom-Left */}
            <div className="absolute bottom-4 left-4 bg-[#080d1d]/90 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-3 border border-[#25293a] shadow-lg text-xs font-medium z-30">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5451]" />
                <span className="text-[#dee1f9]">Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" />
                <span className="text-[#dee1f9]">High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]" />
                <span className="text-[#dee1f9]">Med</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">navigation</span>
                <span className="text-[#dee1f9]">Active Unit</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights & Live Telemetry Feed Column (4 Cols ~ 34%) */}
        <div className="xl:col-span-4 flex flex-col gap-3">
          <div className="flex flex-col bg-[#161b2b] rounded-lg p-3 md:p-4 border border-[#25293a] shadow-md gap-3">
            {/* Panel Header & Filter Tabs */}
            <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">neurology</span>
                <h3 className="text-base font-bold text-[#dee1f9]">AI Insights</h3>
              </div>
              <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'all'
                      ? 'bg-[#25293a] text-[#4cd7f6] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  All Insights
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('incidents')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'incidents'
                      ? 'bg-[#25293a] text-[#4cd7f6] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  Incidents
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dispatch')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'dispatch'
                      ? 'bg-[#25293a] text-[#4cd7f6] font-semibold'
                      : 'text-[#94a3b8] hover:text-[#dee1f9]'
                  }`}
                >
                  Dispatch
                </button>
              </div>
            </div>

            {/* Card 1: Hero AI Recommendation */}
            <div className="p-3.5 rounded-lg bg-[#081e2e] border border-[#4cd7f6]/40 shadow-sm relative overflow-hidden flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-code-telemetry text-xs px-2 py-0.5 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] font-bold flex items-center gap-1 border border-[#4cd7f6]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
                  AI Recommendation
                </span>
                <span className="font-code-telemetry text-[11px] text-[#4cd7f6] font-medium">
                  RL Agent v2.1 • 94.8% Conf
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#dee1f9]">
                  Deploy AMB-03 to Zone 4 via Oak St route
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Estimated arrival <span className="text-[#4cd7f6] font-semibold">4.2 min</span> —{' '}
                  <span className="text-[#4cd7f6] font-semibold">2.1 min faster</span> than alternate routes (Lincoln Ave blocked by structural debris).
                </p>
              </div>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAcceptHeroDispatch}
                  disabled={dispatchStatus !== 'idle'}
                  className={`w-full flex items-center justify-center gap-1.5 font-bold py-2 px-3 rounded transition-all shadow-md cursor-pointer text-xs ${
                    dispatchStatus === 'dispatched'
                      ? 'bg-[#03b5d3] text-[#003640]'
                      : 'bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white'
                  }`}
                >
                  {dispatchStatus === 'dispatching' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      <span>Dispatching AMB-03 to Zone 4...</span>
                    </>
                  ) : dispatchStatus === 'dispatched' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>AMB-03 Dispatched to Zone 4</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Accept &amp; Dispatch AMB-03</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: AI Severity Alert (LSTM Predictor) */}
            <div className="p-3 rounded-lg bg-[#1a1f30] border-l-4 border-[#ffb95f] flex flex-col gap-1 shadow-sm border-y border-r border-[#25293a]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">warning</span>
                  <span className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider">
                    Severity Escalation Alert
                  </span>
                </div>
                <span className="font-code-telemetry text-[11px] text-[#64748b]">LSTM Model</span>
              </div>
              <p className="text-xs text-[#dee1f9] leading-relaxed">
                LSTM predictive model indicates high probability of escalation at{' '}
                <span className="font-semibold text-[#ffb95f]">Grid 7-C within 12 min</span> based on micro-weather gusts and 911 dispatch surge.
              </p>
              <div className="flex items-center justify-between mt-1 text-xs font-code-telemetry">
                <span className="text-[#4cd7f6]">Confidence: 91.5%</span>
                <span className="text-[#64748b]">Impact Area: Sector 07</span>
              </div>
            </div>

            {/* Card 3: Recent Incidents Quick Feed */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold">
                  Recent Incidents Quick Feed
                </span>
                <span className="font-code-telemetry text-xs text-[#4cd7f6] font-semibold">4 Active</span>
              </div>
              <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                {incidents.slice(0, 4).map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncidentId(inc.id)}
                    className={`p-2.5 rounded transition-colors cursor-pointer border-l-2 flex items-center justify-between ${
                      selectedIncidentId === inc.id
                        ? 'bg-[#25293a] border-[#4cd7f6]'
                        : 'bg-[#1a1f30] hover:bg-[#25293a] border-[#ff5451]'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#dee1f9] truncate">
                          {inc.title} — {inc.location.split(',')[0]}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-code-telemetry text-[10px] font-bold ${
                            inc.severity === 'CRITICAL'
                              ? 'bg-[#ff5451] text-[#5c0008]'
                              : inc.severity === 'HIGH'
                              ? 'bg-[#ffb95f]/30 text-[#ffb95f]'
                              : 'bg-[#4cd7f6]/20 text-[#4cd7f6]'
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8] truncate">
                        {inc.zone} • {inc.assignedUnits.join(', ')}
                      </span>
                    </div>
                    <span className="font-code-telemetry text-xs text-[#64748b] shrink-0">
                      {inc.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Active Dispatch Telemetry Tracker Strip */}
            <div className="p-2.5 rounded bg-[#080d1d] border border-[#25293a] flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
                  sync_saved_locally
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
                    Active Dispatch
                  </span>
                  <span className="font-code-telemetry text-xs text-[#dee1f9] truncate font-medium">
                    INC-2024-0847 | AMB-05 En Route
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#4cd7f6]/10 px-2 py-1 rounded text-[#4cd7f6] font-code-telemetry text-xs font-bold shrink-0 border border-[#4cd7f6]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse" />
                ETA 3m
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Command Status Telemetry Bar */}
      <footer className="mt-3 mx-3 md:mx-4 px-4 py-2 rounded bg-[#161b2b] border border-[#25293a] flex flex-wrap items-center justify-between text-xs font-code-telemetry text-[#64748b] gap-2">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-[#4cd7f6] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            AI Models Active:
          </span>
          <span>Incident Classifier <strong className="text-[#dee1f9]">94.7%</strong></span>
          <span className="text-[#25293a]">|</span>
          <span>LSTM Predictor <strong className="text-[#dee1f9]">91.2%</strong></span>
          <span className="text-[#25293a]">|</span>
          <span>RL Dispatch Agent <strong className="text-[#dee1f9]">89.8%</strong></span>
          <span className="text-[#25293a]">|</span>
          <span className="text-[#4cd7f6] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">wifi_tethering</span>
            IoT Sensors: 24/24 Online
          </span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-[#64748b]">
            Sync Engine: <span className="text-[#dee1f9]">WebSocket TLS-v1.3</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1a1f30] text-[#4cd7f6] text-[11px] border border-[#25293a]">
            Last sync: {lastSyncSec}s ago
          </span>
        </div>
      </footer>
    </div>
  );
};
