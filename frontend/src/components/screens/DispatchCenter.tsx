import React, { useState } from 'react';
import { Incident, EmergencyUnit } from '../../types';


interface DispatchCenterProps {
  incidents: Incident[];
  units: EmergencyUnit[];
  selectedIncidentId: string;
  onSelectIncident: (id: string) => void;
  onUnitsDispatched: (incidentId: string, unitIds: string[]) => void;
}

export const DispatchCenter: React.FC<DispatchCenterProps> = ({
  incidents,
  units,
  selectedIncidentId,
  onSelectIncident,
  onUnitsDispatched
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high'>('all');
  const [dispatchedUnits, setDispatchedUnits] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [addedExtraUnits, setAddedExtraUnits] = useState(false);

  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0] || null;

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'critical') return inc.severity === 'CRITICAL';
    if (filter === 'high') return inc.severity === 'HIGH';
    return true;
  });

  const handleDispatch = () => {
    if (!selectedIncident) return;
    const toDispatch = addedExtraUnits
      ? ['AMB-03', 'FIRE-01', 'HAZ-01']
      : ['AMB-03', 'FIRE-01'];
    setDispatchedUnits(toDispatch);
    setShowToast(true);
    onUnitsDispatched(selectedIncident.id, toDispatch);
  };

  const handleToggleMoreUnits = () => {
    setAddedExtraUnits(!addedExtraUnits);
  };

  if (!selectedIncident) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[#dee1f9] select-none p-6 gap-4">
        <span className="material-symbols-outlined text-[#25293a] text-[64px]">fmd_good</span>
        <h2 className="text-xl font-bold text-[#64748b]">No Incidents to Dispatch</h2>
        <p className="text-sm text-[#4a5568]">Report an incident first to begin dispatching units.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-3">
      {/* Screen Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">fmd_good</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">Dispatch Center</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            AI-powered unit assignment • Real-time routing • Active fleet coordination
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-2 bg-[#93000a]/30 border border-[#93000a]/50 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ff5451] animate-pulse" />
            <span className="text-[11px] font-bold text-[#ffb3ad] tracking-wide uppercase">
              5 Pending Dispatch
            </span>
          </div>
          <div className="hidden xl:flex items-center gap-1.5 font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1.5 rounded border border-[#25293a]">
            <span className="material-symbols-outlined text-[15px]">model_training</span>
            <span>RL-AGENT: ACTIVE (V4.8)</span>
          </div>
        </div>
      </div>

      {/* Main Dispatch Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        
        {/* LEFT COLUMN: Incident Queue (4-col ~ 33%) */}
        <div className="lg:col-span-4 flex flex-col gap-2 bg-[#161b2b] p-3 rounded-lg border border-[#25293a] shadow-md">
          {/* Queue Header & Filters */}
          <div className="flex flex-col gap-2 pb-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#dee1f9]">Incident Queue</span>
                <span className="font-code-telemetry text-xs bg-[#2f3446] text-[#4cd7f6] px-2 py-0.5 rounded-full font-bold">
                  {incidents.length}
                </span>
              </div>
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
                PRIORITY SORT
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#1a1f30] text-[#4cd7f6] font-semibold border border-[#4cd7f6]/30'
                    : 'bg-[#080d1d] text-[#94a3b8] hover:bg-[#1a1f30]'
                }`}
              >
                All ({incidents.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('critical')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  filter === 'critical'
                    ? 'bg-[#1a1f30] text-[#ffb3ad] font-semibold border border-[#ff5451]/30'
                    : 'bg-[#080d1d] text-[#ffb3ad] hover:bg-[#1a1f30]'
                }`}
              >
                Critical (2)
              </button>
              <button
                type="button"
                onClick={() => setFilter('high')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  filter === 'high'
                    ? 'bg-[#1a1f30] text-[#ffb95f] font-semibold border border-[#ffb95f]/30'
                    : 'bg-[#080d1d] text-[#ffb95f] hover:bg-[#1a1f30]'
                }`}
              >
                High (2)
              </button>
            </div>
          </div>

          {/* Incident Stack */}
          <div className="flex flex-col gap-2">
            {filteredIncidents.map((inc) => {
              const isSelected = selectedIncident.id === inc.id;
              const isCritical = inc.severity === 'CRITICAL';
              const isHigh = inc.severity === 'HIGH';

              return (
                <div
                  key={inc.id}
                  onClick={() => onSelectIncident(inc.id)}
                  className={`cursor-pointer p-3 rounded-lg transition-all relative overflow-hidden group border ${
                    isSelected
                      ? 'bg-[#25293a] border-[#4cd7f6] shadow-sm'
                      : 'bg-[#080d1d] hover:bg-[#1a1f30] border-[#25293a]'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      isCritical ? 'bg-[#ff5451]' : isHigh ? 'bg-[#ca8100]' : 'bg-[#4cd7f6]'
                    }`}
                  />
                  <div className="flex items-center justify-between mb-1 pl-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-code-telemetry text-xs font-bold ${
                          isCritical ? 'text-[#ff5451]' : isHigh ? 'text-[#ffb95f]' : 'text-[#4cd7f6]'
                        }`}
                      >
                        {inc.id}
                      </span>
                      <span
                        className={`font-label-sm text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          isCritical
                            ? 'bg-[#93000a]/40 text-[#ffb3ad]'
                            : isHigh
                            ? 'bg-[#ca8100]/30 text-[#ffb95f]'
                            : 'bg-[#4cd7f6]/20 text-[#4cd7f6]'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </div>
                    <span
                      className={`font-code-telemetry text-xs font-bold px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-[#93000a] text-[#ffdad6]'
                          : 'bg-[#25293a] text-[#94a3b8]'
                      }`}
                    >
                      {inc.priority}
                    </span>
                  </div>

                  <div className="pl-2">
                    <h3 className="text-sm font-bold text-[#dee1f9] group-hover:text-[#4cd7f6] transition-colors">
                      {inc.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8]">{inc.location}</p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 bg-[#161b2b] px-2 py-1 rounded font-code-telemetry text-[11px] text-[#64748b]">
                      <span className="flex items-center gap-1 text-[#94a3b8]">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {inc.timestamp} • {inc.timeAgo}
                      </span>
                      <span className="text-[#4cd7f6] font-semibold">
                        {inc.status === 'Active' ? 'Unassigned • 2 recs' : inc.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Main Dispatch Panel (8-col ~ 67%) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Confirmation Toast */}
          {showToast && (
            <div className="p-3.5 rounded-lg bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#dee1f9] flex items-center justify-between shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#4cd7f6]">check_circle</span>
                <div>
                  <p className="text-sm font-bold text-[#dee1f9]">Units Dispatched Successfully</p>
                  <p className="text-xs text-[#4cd7f6] font-code-telemetry">
                    {dispatchedUnits.join(' & ')} marked EN ROUTE to {selectedIncident.location}. Siren telemetry active.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowToast(false)}
                className="text-[#4cd7f6] hover:text-[#dee1f9] cursor-pointer p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          {/* Selected Incident Banner */}
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ff5451] text-[26px]">
                  local_fire_department
                </span>
                <h2 className="text-lg md:text-xl font-bold text-[#dee1f9] tracking-tight">
                  {selectedIncident.title} — {selectedIncident.location.split(',')[0]}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#93000a] text-[#ffdad6] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-[#ff5451]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] animate-ping" />
                  {selectedIncident.severity} • {selectedIncident.timeAgo}
                </span>
                <span className="font-code-telemetry text-xs bg-[#1a1f30] text-[#64748b] px-2 py-1 rounded border border-[#25293a]">
                  {selectedIncident.zone.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Metadata Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 p-2.5 bg-[#1a1f30] rounded border border-[#25293a] font-code-telemetry text-xs">
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Sector</span>
                <span className="text-[#dee1f9] font-semibold truncate">{selectedIncident.sector}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Coordinates</span>
                <span className="text-[#4cd7f6] truncate">{selectedIncident.coordinates}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Reported By</span>
                <span className="text-[#dee1f9] truncate">{selectedIncident.reportedBy}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Casualties</span>
                <span className="text-[#ff5451] font-bold truncate">{selectedIncident.casualties}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Weather</span>
                <span className="text-[#dee1f9] truncate">{selectedIncident.weather}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748b] text-[10px] uppercase font-semibold">Nearest Hospital</span>
                <span className="text-[#4cd7f6] truncate">{selectedIncident.nearestHospital}</span>
              </div>
            </div>
          </div>

          {/* Section 1: AI Recommended Units */}
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">smart_toy</span>
                <h3 className="text-sm font-bold text-[#dee1f9]">AI Recommended Units</h3>
                <span className="bg-[#4cd7f6]/10 text-[#4cd7f6] text-[11px] px-2 py-0.5 rounded font-bold border border-[#4cd7f6]/20">
                  RL DISPATCH AGENT • 94.2% CONFIDENCE
                </span>
              </div>
              <span className="text-[11px] text-[#64748b] hidden sm:inline font-semibold">
                REAL-TIME TELEMETRY
              </span>
            </div>

            {/* Unit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
              {units.slice(0, 4).map((unit) => {
                const isDispatched = dispatchedUnits.includes(unit.id);
                return (
                  <div
                    key={unit.id}
                    className={`p-3 rounded-lg transition-all flex flex-col justify-between shadow-sm border relative overflow-hidden group ${
                      isDispatched
                        ? 'bg-[#25293a] border-[#4cd7f6] shadow-lg'
                        : 'bg-[#1a1f30] hover:bg-[#25293a] border-[#25293a]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#dee1f9]">{unit.name}</span>
                          <span
                            className={`material-symbols-outlined text-[16px] ${
                              unit.category === 'Fire'
                                ? 'text-[#ff5451]'
                                : unit.category === 'Hazmat'
                                ? 'text-[#ffb95f]'
                                : 'text-[#4cd7f6]'
                            }`}
                          >
                            {unit.category === 'Fire'
                              ? 'fire_truck'
                              : unit.category === 'Hazmat'
                              ? 'science'
                              : 'ambulance'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94a3b8]">{unit.type}</p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isDispatched
                            ? 'bg-[#4cd7f6] text-[#003640] animate-pulse'
                            : 'bg-[#4cd7f6]/10 text-[#4cd7f6]'
                        }`}
                      >
                        {isDispatched ? 'DISPATCHED / EN ROUTE' : 'AVAILABLE'}
                      </span>
                    </div>

                    <div className="my-3">
                      <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold">
                        ESTIMATED ARRIVAL
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl text-[#4cd7f6] font-bold font-stat-metric">
                          {unit.etaMinutes}
                        </span>
                        <span className="text-xs text-[#4cd7f6]">min</span>
                      </div>
                      <p className="font-code-telemetry text-xs text-[#94a3b8] mt-0.5">
                        {unit.distanceKm} km {unit.viaRoute}
                      </p>
                    </div>

                    <div className="pt-2 bg-[#080d1d] px-2 py-1.5 rounded flex items-center justify-between text-xs text-[#4cd7f6] border border-[#25293a]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] inline-block" />
                        {unit.isPrimary ? 'Primary Pick' : unit.badgeType}
                      </span>
                      <span className="font-code-telemetry font-bold">Score: {unit.matchScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Route Visualization & Tactical Guidance */}
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">alt_route</span>
                <h3 className="text-sm font-bold text-[#dee1f9]">
                  Optimal Route — AMB-03 to Incident
                </h3>
              </div>
              <div className="flex items-center gap-3 font-code-telemetry text-xs">
                <span className="text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded font-semibold border border-[#4cd7f6]/20">
                  2.1 min faster than alternate route
                </span>
                <span className="text-[#64748b]">
                  Dist: <strong className="text-[#dee1f9]">0.8 km</strong>
                </span>
                <span className="text-[#64748b]">
                  ETA: <strong className="text-[#4cd7f6]">4.2 min</strong>
                </span>
              </div>
            </div>

            {/* Step Progression Map Strip */}
            <div className="p-3 bg-[#1a1f30] rounded-lg flex flex-col gap-3 border border-[#25293a]">
              {/* Stepper Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 relative">
                {/* Step 1 */}
                <div className="flex items-start gap-2.5 bg-[#25293a]/70 p-2.5 rounded border border-[#25293a]">
                  <div className="w-6 h-6 rounded-full bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center font-bold text-xs shrink-0 font-code-telemetry">
                    1
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#64748b] uppercase font-semibold">Start Point</span>
                    <span className="text-xs font-bold text-[#dee1f9] truncate">Station 3 — Elm St</span>
                    <span className="font-code-telemetry text-[11px] text-[#4cd7f6]">Departs bay</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-2.5 bg-[#25293a]/70 p-2.5 rounded border border-[#25293a]">
                  <div className="w-6 h-6 rounded-full bg-[#1a1f30] text-[#94a3b8] flex items-center justify-center font-bold text-xs shrink-0 font-code-telemetry">
                    2
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#64748b] uppercase font-semibold">Turn Right</span>
                    <span className="text-xs font-bold text-[#dee1f9] truncate">Central Ave</span>
                    <span className="font-code-telemetry text-[11px] text-[#64748b]">0.3 km • Clear flow</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-2.5 bg-[#25293a]/70 p-2.5 rounded border border-[#25293a]">
                  <div className="w-6 h-6 rounded-full bg-[#1a1f30] text-[#94a3b8] flex items-center justify-center font-bold text-xs shrink-0 font-code-telemetry">
                    3
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#64748b] uppercase font-semibold">Turn Left</span>
                    <span className="text-xs font-bold text-[#dee1f9] truncate">Oak Street</span>
                    <span className="font-code-telemetry text-[11px] text-[#64748b]">0.4 km • Green wave</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-2.5 bg-[#ff5451]/15 p-2.5 rounded border border-[#ff5451]/30">
                  <div className="w-6 h-6 rounded-full bg-[#ff5451] text-[#5c0008] flex items-center justify-center font-bold text-xs shrink-0 font-code-telemetry">
                    4
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#ff5451] uppercase font-bold">Target</span>
                    <span className="text-xs font-bold text-[#dee1f9] truncate">412 Oak St</span>
                    <span className="font-code-telemetry text-[11px] text-[#ff5451] font-semibold">INCIDENT SITE</span>
                  </div>
                </div>
              </div>

              {/* Traffic Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-[#080d1d] rounded border border-[#25293a]">
                <div className="flex items-center gap-2 text-xs text-[#dee1f9]">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">traffic</span>
                  <span>
                    <strong>Traffic Status:</strong> Low congestion on Oak St. Lincoln Ave alternate has construction delay (+4 min).
                  </span>
                </div>
                <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded shrink-0 border border-[#4cd7f6]/20 font-semibold">
                  Signals Preempted: 3
                </span>
              </div>

              {/* Tactical Map Visual Canvas Integration */}
              <div
                className="w-full h-44 bg-cover bg-center rounded-lg shadow-inner relative overflow-hidden flex items-end p-4 border border-[#25293a]"
                style={{ background: 'radial-gradient(circle at 30% 40%, #0e1a2e 0%, #060a14 60%), repeating-linear-gradient(0deg, transparent, transparent 39px, #25293a22 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #25293a22 40px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1d] via-[#080d1d]/40 to-transparent" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 bg-[#080d1d]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#25293a]">
                    <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
                    <span className="font-code-telemetry text-xs text-[#dee1f9] font-medium">
                      LIVE GPS TRACK: AMB-03 &amp; FIRE-01 SYNCED
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#dee1f9] bg-[#080d1d]/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-[#25293a]">
                    <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">layers</span>
                    <span>Tactical Overlay • GIS Layer 04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Bar */}
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              <button
                type="button"
                onClick={handleDispatch}
                className={`flex items-center justify-center gap-2 font-bold px-5 py-3 rounded shadow-lg transition-all text-xs uppercase tracking-wider cursor-pointer w-full sm:w-auto ${
                  dispatchedUnits.length > 0
                    ? 'bg-[#2f3446] text-[#4cd7f6] border border-[#4cd7f6]/40'
                    : 'bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {dispatchedUnits.length > 0 ? 'check' : 'bolt'}
                </span>
                <span>
                  {dispatchedUnits.length > 0
                    ? 'Units Deployed & Tracking'
                    : '⚡ Dispatch AMB-03 + FIRE-01 Now'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleToggleMoreUnits}
                className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-3 rounded transition-colors border cursor-pointer w-full sm:w-auto ${
                  addedExtraUnits
                    ? 'bg-[#4cd7f6]/15 border-[#4cd7f6] text-[#4cd7f6]'
                    : 'bg-[#1a1f30] hover:bg-[#25293a] text-[#dee1f9] border-[#25293a]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {addedExtraUnits ? 'check' : 'add'}
                </span>
                <span>{addedExtraUnits ? 'HAZ-01 Attached' : 'Add More Units'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                className="px-3 py-2.5 rounded bg-[#1a1f30] hover:bg-[#25293a] text-[#94a3b8] hover:text-[#dee1f9] text-xs font-semibold transition-colors border border-[#25293a] cursor-pointer"
              >
                Manual Override
              </button>
              <button
                type="button"
                className="px-3 py-2.5 rounded bg-[#080d1d] hover:bg-[#1a1f30] text-[#ff5451] text-xs font-semibold transition-colors border border-[#25293a] cursor-pointer"
              >
                Defer / Escalate
              </button>
            </div>
          </div>

          {/* System Architecture Reference Asset Section */}
          <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded shadow-md shrink-0 border border-[#25293a] bg-[#0e1a2e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">architecture</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#dee1f9]">
                  CAD Multi-Screen Architecture Active
                </span>
                <span className="text-[11px] text-[#94a3b8]">
                  Screen 4: Dispatch Telemetry Console mapped to Central Dispatch Hub node
                </span>
              </div>
            </div>
            <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1 rounded shrink-0 border border-[#25293a] font-semibold">
              NODE #ERM-CAD-04
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
