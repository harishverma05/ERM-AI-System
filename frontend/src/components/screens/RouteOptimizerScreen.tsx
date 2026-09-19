import React, { useState } from 'react';

export const RouteOptimizerScreen: React.FC = () => {
  const [origin, setOrigin] = useState('Station 3 (Elm St)');
  const [destination, setDestination] = useState('412 Oak Street (Zone 4)');
  const [selectedRoute, setSelectedRoute] = useState<'ai' | 'arterial' | 'highway'>('ai');

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">alt_route</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">AI Dynamic Route Optimizer</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Dijkstra + Reinforcement Learning • Traffic signal preemption • Live road hazard avoidance
          </p>
        </div>
        <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1.5 rounded border border-[#25293a] font-semibold">
          ACTIVE SIGNALS PREEMPTED: 14
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 5 Cols: Routing Options */}
        <div className="lg:col-span-5 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[11px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                Dispatch Origin
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2 rounded border border-[#25293a] font-code-telemetry"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                Incident Target
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2 rounded border border-[#25293a] font-code-telemetry"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              Computed Path Candidates
            </span>

            {/* Candidate 1: AI Recommended */}
            <div
              onClick={() => setSelectedRoute('ai')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedRoute === 'ai'
                  ? 'bg-[#25293a] border-[#4cd7f6] shadow-md'
                  : 'bg-[#080d1d] border-[#25293a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#4cd7f6] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  AI Optimal (Oak St Expressway)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#4cd7f6]/20 text-[#4cd7f6]">
                  RECOMMENDED
                </span>
              </div>
              <div className="flex items-baseline gap-2 font-code-telemetry">
                <span className="text-xl font-bold text-[#dee1f9]">4.2 min</span>
                <span className="text-xs text-[#94a3b8]">0.8 km</span>
                <span className="text-xs text-[#4cd7f6] ml-auto">2.1m faster</span>
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1">
                3 green-wave smart corridors preempted. Debris on Lincoln Ave safely bypassed.
              </p>
            </div>

            {/* Candidate 2: Arterial */}
            <div
              onClick={() => setSelectedRoute('arterial')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedRoute === 'arterial'
                  ? 'bg-[#25293a] border-[#ffb95f]'
                  : 'bg-[#080d1d] border-[#25293a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#dee1f9]">Main Ave Arterial</span>
                <span className="text-[10px] text-[#64748b]">STANDARD</span>
              </div>
              <div className="flex items-baseline gap-2 font-code-telemetry">
                <span className="text-lg font-bold text-[#dee1f9]">6.3 min</span>
                <span className="text-xs text-[#94a3b8]">1.4 km</span>
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1">
                Moderate congestion near downtown transit center. 2 red signal cycles.
              </p>
            </div>

            {/* Candidate 3: Highway 7 */}
            <div
              onClick={() => setSelectedRoute('highway')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedRoute === 'highway'
                  ? 'bg-[#25293a] border-[#ff5451]'
                  : 'bg-[#080d1d] border-[#25293a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#ffb3ad]">Lincoln Ave / Hwy 7 Overpass</span>
                <span className="text-[10px] text-[#ff5451] font-bold">IMPEDED</span>
              </div>
              <div className="flex items-baseline gap-2 font-code-telemetry">
                <span className="text-lg font-bold text-[#ff5451]">9.8 min</span>
                <span className="text-xs text-[#94a3b8]">2.2 km</span>
              </div>
              <p className="text-[11px] text-[#ffb3ad] mt-1">
                Severe collision delay reported on Overpass ramp. Bottleneck +3.5 min.
              </p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Route Visualizer */}
        <div className="lg:col-span-7 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] flex flex-col gap-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
            <span className="text-xs font-bold text-[#dee1f9] font-code-telemetry">
              REAL-TIME SATELLITE VECTOR PATH
            </span>
            <span className="text-[11px] text-[#4cd7f6] font-code-telemetry">
              CAD TELEMETRY SYNCED
            </span>
          </div>

          <div className="relative h-96 bg-[#080d1d] rounded-lg overflow-hidden border border-[#25293a]">
            <svg className="w-full h-full" viewBox="0 0 600 400">
              {/* Background Grid */}
              <defs>
                <pattern id="routeGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#161f33" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#routeGrid)" />

              {/* Road Grid */}
              <g fill="none" stroke="#1c2b45" strokeWidth="6" strokeLinecap="round">
                <path d="M 50 100 L 550 100" />
                <path d="M 50 200 L 550 200" />
                <path d="M 50 300 L 550 300" />
                <path d="M 150 40 L 150 360" />
                <path d="M 300 40 L 300 360" />
                <path d="M 450 40 L 450 360" />
              </g>

              {/* Impeded Lincoln Ave (Red) */}
              <line x1="300" y1="100" x2="300" y2="300" stroke="#ff5451" strokeWidth="6" strokeDasharray="6 4" />

              {/* Selected Route Path */}
              {selectedRoute === 'ai' ? (
                <path
                  d="M 150 300 L 300 300 L 450 300 L 450 200 L 450 100"
                  fill="none"
                  stroke="#4cd7f6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              ) : selectedRoute === 'arterial' ? (
                <path
                  d="M 150 300 L 150 200 L 300 200 L 450 200 L 450 100"
                  fill="none"
                  stroke="#ffb95f"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M 150 300 L 300 300 L 300 100 L 450 100"
                  fill="none"
                  stroke="#ff5451"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Start Station */}
              <circle cx="150" cy="300" r="8" fill="#4cd7f6" stroke="#080d1d" strokeWidth="2" />
              <text x="165" y="305" fill="#4cd7f6" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                Station 3 (Elm St)
              </text>

              {/* Target Incident */}
              <circle cx="450" cy="100" r="10" fill="#ff5451" stroke="#080d1d" strokeWidth="2" className="animate-ping" />
              <circle cx="450" cy="100" r="8" fill="#ff5451" />
              <text x="465" y="105" fill="#ffb3ad" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                Target: 412 Oak St
              </text>
            </svg>

            <div className="absolute bottom-3 left-3 bg-[#080d1d]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#25293a] text-xs font-code-telemetry text-[#4cd7f6]">
              PREEMPTION PROTOCOL: ACTIVE (SIGNALS LOCKED GREEN)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
