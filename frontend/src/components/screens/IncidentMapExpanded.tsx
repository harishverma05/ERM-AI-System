import React, { useState } from 'react';
import { Incident, EmergencyUnit } from '../../types';


interface IncidentMapExpandedProps {
  incidents: Incident[];
  units: EmergencyUnit[];
  onSelectIncident: (id: string) => void;
  onNavigateToDispatch: () => void;
}

export const IncidentMapExpanded: React.FC<IncidentMapExpandedProps> = ({
  incidents,
  units,
  onSelectIncident,
  onNavigateToDispatch
}) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(incidents[0] || null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'traffic' | 'weather' | 'units'>('all');
  const [zoom, setZoom] = useState(1);

  if (!selectedIncident && incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[#dee1f9] select-none p-6 gap-4">
        <span className="material-symbols-outlined text-[#25293a] text-[64px]">map</span>
        <h2 className="text-xl font-bold text-[#64748b]">No Incidents on Map</h2>
        <p className="text-sm text-[#4a5568]">Incidents will appear here once reported.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">map</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">
              Tactical Geospatial Situational Map
            </h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Full-resolution GIS telemetry • Real-time traffic flow &amp; preemption • Drone surveillance feeds
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
            {(['all', 'traffic', 'weather', 'units'] as const).map((layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => setActiveLayer(layer)}
                className={`px-3 py-1 rounded transition-colors uppercase font-bold cursor-pointer ${
                  activeLayer === layer
                    ? 'bg-[#25293a] text-[#4cd7f6]'
                    : 'text-[#64748b] hover:text-[#dee1f9]'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#080d1d] p-0.5 rounded border border-[#25293a]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
              className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#dee1f9] rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.15))}
              className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#dee1f9] rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative w-full h-[640px] bg-[#060a14] rounded-lg border border-[#25293a] overflow-hidden shadow-xl">
        {/* Background Visual GIS Imagery with Tactical Vector Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-screen"
          style={{ background: 'radial-gradient(circle at 30% 40%, #0e1a2e 0%, #060a14 60%), repeating-linear-gradient(0deg, transparent, transparent 39px, #25293a22 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #25293a22 40px)' }}
        />

        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 640">
            {/* Grid */}
            <defs>
              <pattern id="expGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1b253b" strokeWidth="0.8" />
                <circle cx="25" cy="25" r="1.5" fill="#253553" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#expGrid)" />

            {/* Tactical Corridors */}
            <g fill="none" stroke="#1a2d4d" strokeWidth="3" strokeLinecap="round">
              <path d="M 0 300 Q 300 280 500 340 T 1000 300" />
              <path d="M 450 0 L 480 320 L 520 640" stroke="#254273" strokeWidth="4" />
              <path d="M 200 100 L 800 500" stroke="#14213d" strokeWidth="2" />
            </g>

            {/* Animated Dispatch Route */}
            <path
              d="M 280 480 L 350 420 L 470 410 L 490 330"
              fill="none"
              stroke="#4cd7f6"
              strokeWidth="3.5"
              strokeDasharray="6,4"
              className="animate-pulse"
            />

            {/* Sectors */}
            <polygon
              points="400,220 620,210 650,420 430,440"
              fill="#ff5451"
              fillOpacity="0.15"
              stroke="#ff5451"
              strokeWidth="2"
              strokeDasharray="5,3"
            />
            <polygon
              points="680,180 920,160 950,380 710,400"
              fill="#ffb95f"
              fillOpacity="0.12"
              stroke="#ffb95f"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
          </svg>

          {/* Interactive Incident Markers */}
          {incidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setSelectedIncident(inc)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
              style={{ left: `${inc.mapCoords.x}px`, top: `${inc.mapCoords.y}px` }}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`absolute w-10 h-10 rounded-full animate-ping ${
                    inc.severity === 'CRITICAL'
                      ? 'bg-[#ff5451]/30'
                      : inc.severity === 'HIGH'
                      ? 'bg-[#ffb95f]/30'
                      : 'bg-[#4cd7f6]/30'
                  }`}
                />
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#080d1d] ${
                    inc.severity === 'CRITICAL'
                      ? 'bg-[#ff5451] text-[#5c0008]'
                      : inc.severity === 'HIGH'
                      ? 'bg-[#ffb95f] text-[#3e2400]'
                      : 'bg-[#4cd7f6] text-[#003640]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px] font-bold">
                    {inc.type.includes('Fire')
                      ? 'local_fire_department'
                      : inc.type.includes('Collision')
                      ? 'car_crash'
                      : 'emergency'}
                  </span>
                </div>

                <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#080d1d]/90 backdrop-blur-md border border-[#25293a] px-2.5 py-1 rounded shadow-xl flex items-center gap-1.5 text-xs">
                  <span className="font-code-telemetry font-bold text-[#ff5451]">{inc.id}</span>
                  <span className="text-[#dee1f9]">{inc.title}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Active Units */}
          {units.map((unit, idx) => (
            <div
              key={unit.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#080d1d]/95 border border-[#4cd7f6] px-2 py-1 rounded shadow-lg z-25 text-xs"
              style={{ left: `${300 + idx * 140}px`, top: `${420 - idx * 40}px` }}
            >
              <span className="material-symbols-outlined text-[15px] text-[#4cd7f6] animate-pulse">
                navigation
              </span>
              <span className="font-code-telemetry text-[#4cd7f6] font-bold">{unit.name}</span>
              <span className="text-[10px] text-[#94a3b8]">{unit.type.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Floating Detail Inspector HUD */}
        <div className="absolute top-4 right-4 w-80 bg-[#080d1d]/95 backdrop-blur-xl border border-[#25293a] rounded-lg p-4 shadow-2xl z-40 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
            <span className="text-xs font-bold text-[#4cd7f6] font-code-telemetry">
              TACTICAL INSPECTOR
            </span>
            <span className="px-2 py-0.5 rounded bg-[#ff5451] text-[#5c0008] text-[10px] font-bold">
              {selectedIncident.severity}
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#dee1f9]">{selectedIncident.title}</h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">{selectedIncident.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-code-telemetry bg-[#161b2b] p-2.5 rounded border border-[#25293a]">
            <div>
              <span className="text-[#64748b] block text-[10px]">COORDINATES</span>
              <span className="text-[#dee1f9] text-[11px] truncate block">{selectedIncident.coordinates}</span>
            </div>
            <div>
              <span className="text-[#64748b] block text-[10px]">TIME ACTIVE</span>
              <span className="text-[#4cd7f6]">{selectedIncident.timeAgo}</span>
            </div>
            <div>
              <span className="text-[#64748b] block text-[10px]">CASUALTIES</span>
              <span className="text-[#ff5451] font-bold">{selectedIncident.casualties}</span>
            </div>
            <div>
              <span className="text-[#64748b] block text-[10px]">AI TRIAGE</span>
              <span className="text-[#4cd7f6] font-bold">{selectedIncident.aiAccuracy}</span>
            </div>
          </div>

          <p className="text-xs text-[#94a3b8] leading-relaxed">
            {selectedIncident.description}
          </p>

          <button
            type="button"
            onClick={() => {
              onSelectIncident(selectedIncident.id);
              onNavigateToDispatch();
            }}
            className="w-full py-2.5 bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">fmd_good</span>
            Open in Dispatch Hub
          </button>
        </div>

        {/* Live Surveillance Feed Overlay Mini Thumbnail */}
        <div className="absolute bottom-4 left-4 w-64 bg-[#080d1d]/95 backdrop-blur-xl border border-[#25293a] rounded-lg p-2.5 shadow-2xl z-40 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-code-telemetry text-[#4cd7f6] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] animate-ping" />
              CCTV-042 [LIVE RECON]
            </span>
            <span className="text-[#64748b]">1080p • 30fps</span>
          </div>
          <div className="h-28 bg-[#161b2b] rounded overflow-hidden relative border border-[#25293a]">
            <div className="w-full h-full flex items-center justify-center bg-[#0e1a2e]">
              <span className="material-symbols-outlined text-[32px] text-[#25293a]">satellite_alt</span>
            </div>
            <div className="absolute top-1 left-1 bg-[#080d1d]/80 px-1 rounded text-[9px] font-code-telemetry text-[#4cd7f6]">
              REC ● 09:47:22
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
