import React, { useState } from 'react';
import { ANALYTICS_DATA } from '../../data/mockData';

export const AnalyticsReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'custom'>('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    }, 1200);
  };

  const incidentsTableData: { id: string; type: string; zone: string; severity: string; time: string; units: string; ai: string; status: string }[] = [];

  const filteredTable = incidentsTableData.filter(
    (row) =>
      row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.severity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">monitoring</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">Analytics &amp; Reports</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Operational Intelligence • Triage Accuracy Validation • Resource Allocation Trends
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
            {(['24h', '7d', '30d', 'custom'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded transition-colors uppercase font-bold cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#25293a] text-[#4cd7f6]'
                    : 'text-[#64748b] hover:text-[#dee1f9]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Report Action */}
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#4cd7f6] hover:bg-[#03b5d3] text-[#003640] font-bold text-xs transition-colors shadow cursor-pointer disabled:opacity-75"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isExporting ? 'progress_activity' : 'download'}
            </span>
            <span>{isExporting ? 'Generating Report...' : 'Export Telemetry'}</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-3 bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] rounded-lg text-xs font-code-telemetry flex items-center justify-between shadow-lg">
          <span>✓ Cryptographically signed CAD report compiled &amp; exported to PDF/CSV.</span>
          <button type="button" onClick={() => setExportSuccess(false)} className="text-[#dee1f9] hover:underline">Dismiss</button>
        </div>
      )}

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Total Incidents */}
        <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              Total Incidents (24h)
            </span>
            <span className="text-[11px] text-[#ffb3ad] font-bold bg-[#ff5451]/15 px-1.5 py-0.2 rounded font-code-telemetry">
              ▲ 12%
            </span>
          </div>
          <div className="my-1.5 text-2xl font-bold text-[#dee1f9] font-stat-metric">
            {ANALYTICS_DATA.kpis.totalIncidentsToday}
          </div>
          <p className="text-[11px] text-[#94a3b8] truncate">Across 7 metropolitan zones</p>
        </div>

        {/* Avg Response Time */}
        <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              Avg Response Time
            </span>
            <span className="text-[11px] text-[#4cd7f6] font-bold bg-[#4cd7f6]/15 px-1.5 py-0.2 rounded font-code-telemetry">
              ▼ 1.4m vs target
            </span>
          </div>
          <div className="my-1.5 text-2xl font-bold text-[#4cd7f6] font-stat-metric">
            {ANALYTICS_DATA.kpis.avgResponseTime} <span className="text-xs font-normal">min</span>
          </div>
          <p className="text-[11px] text-[#94a3b8] truncate">SLA Goal: &lt; 8.0 min</p>
        </div>

        {/* Resolution Rate */}
        <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              Resolution Rate
            </span>
            <span className="text-[11px] text-[#ffb95f] font-bold bg-[#ffb95f]/15 px-1.5 py-0.2 rounded font-code-telemetry">
              ▲ 3.2%
            </span>
          </div>
          <div className="my-1.5 text-2xl font-bold text-[#dee1f9] font-stat-metric">
            {ANALYTICS_DATA.kpis.resolutionRate}%
          </div>
          <p className="text-[11px] text-[#94a3b8] truncate">Within golden hour SLA</p>
        </div>

        {/* AI Accuracy */}
        <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              AI Accuracy
            </span>
            <span className="text-[11px] text-[#4cd7f6] font-bold bg-[#4cd7f6]/15 px-1.5 py-0.2 rounded font-code-telemetry">
              F1: {ANALYTICS_DATA.kpis.f1Score}
            </span>
          </div>
          <div className="my-1.5 text-2xl font-bold text-[#4cd7f6] font-stat-metric">
            {ANALYTICS_DATA.kpis.aiAccuracy}%
          </div>
          <p className="text-[11px] text-[#94a3b8] truncate">Triage &amp; route recommendation</p>
        </div>

        {/* Units Deployed */}
        <div className="bg-[#161b2b] p-3.5 rounded-lg border border-[#25293a] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
              Units Deployed
            </span>
            <span className="text-[11px] text-[#dee1f9] font-bold bg-[#25293a] px-1.5 py-0.2 rounded font-code-telemetry">
              Total
            </span>
          </div>
          <div className="my-1.5 text-2xl font-bold text-[#dee1f9] font-stat-metric">
            {ANALYTICS_DATA.kpis.unitsDeployedTotal}
          </div>
          <p className="text-[11px] text-[#94a3b8] truncate">Fleet runs past 24h</p>
        </div>
      </div>

      {/* Charts Grid Row 1: Incidents Over Time & By Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Incidents Over Time (8 Cols) */}
        <div className="lg:col-span-8 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#25293a]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">show_chart</span>
              <span className="text-sm font-bold text-[#dee1f9]">
                Incidents Over Time (Hourly Distribution)
              </span>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5451]" />
                <span className="text-[#94a3b8]">Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" />
                <span className="text-[#94a3b8]">High</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]" />
                <span className="text-[#94a3b8]">Medium</span>
              </div>
            </div>
          </div>

          {/* SVG Line & Area Chart */}
          <div className="relative w-full h-56 my-2">
            <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="criticalAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5451" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff5451" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="cyanLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="30" x2="680" y2="30" stroke="#25293a" strokeDasharray="3 3" />
              <line x1="40" y1="80" x2="680" y2="80" stroke="#25293a" strokeDasharray="3 3" />
              <line x1="40" y1="130" x2="680" y2="130" stroke="#25293a" strokeDasharray="3 3" />
              <line x1="40" y1="170" x2="680" y2="170" stroke="#25293a" />

              {/* Y Axis Values */}
              <text x="15" y="35" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">15</text>
              <text x="15" y="85" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">10</text>
              <text x="15" y="135" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">05</text>
              <text x="15" y="173" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">00</text>

              {/* Area Under Critical Line */}
              <polygon
                points="
                  60,160 
                  140,150 
                  230,40 
                  320,140 
                  410,30 
                  500,130 
                  590,150 
                  660,150 
                  660,170 
                  60,170
                "
                fill="url(#criticalAreaGrad)"
              />

              {/* Line 1: Critical (Crimson) */}
              <polyline
                points="
                  60,160 
                  140,150 
                  230,40 
                  320,140 
                  410,30 
                  500,130 
                  590,150 
                  660,150
                "
                fill="none"
                stroke="#ff5451"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Line 2: High (Amber) */}
              <polyline
                points="
                  60,150 
                  140,140 
                  230,90 
                  320,120 
                  410,80 
                  500,110 
                  590,140 
                  660,140
                "
                fill="none"
                stroke="#ffb95f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Line 3: Medium (Cyan) */}
              <polyline
                points="
                  60,130 
                  140,120 
                  230,60 
                  320,100 
                  410,50 
                  500,90 
                  590,110 
                  660,120
                "
                fill="none"
                stroke="#4cd7f6"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Peak Nodes & Pulsing Callouts */}
              <circle cx="230" cy="40" r="5" fill="#ff5451" stroke="#080d1d" strokeWidth="2" />
              <circle cx="410" cy="30" r="5" fill="#ff5451" stroke="#080d1d" strokeWidth="2" />

              {/* X Axis Ticks */}
              <text x="50" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">00:00</text>
              <text x="130" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">04:00</text>
              <text x="215" y="190" fill="#ffb3ad" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">08:00*</text>
              <text x="305" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">12:00</text>
              <text x="395" y="190" fill="#ffb3ad" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">14:00*</text>
              <text x="485" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">18:00</text>
              <text x="575" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">21:00</text>
              <text x="645" y="190" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">24:00</text>
            </svg>
          </div>

          {/* Peak Insight Notice */}
          <div className="p-2.5 rounded bg-[#1a1f30] border border-[#25293a] flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#dee1f9]">
              <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">info</span>
              <span>
                <strong>Peak incident windows:</strong> 08:00–10:00 &amp; 14:00–16:00. Commute hours correlate with +34% vehicle collisions.
              </span>
            </span>
            <span className="font-code-telemetry text-[#4cd7f6] hidden sm:inline">
              Pattern: Commute Surge
            </span>
          </div>
        </div>

        {/* Incidents by Type Donut Chart (4 Cols) */}
        <div className="lg:col-span-4 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">pie_chart</span>
              <span className="text-sm font-bold text-[#dee1f9]">Incidents by Type</span>
            </div>
            <span className="text-[11px] font-code-telemetry text-[#64748b]">N=48</span>
          </div>

          {/* Donut Graphic */}
          <div className="relative w-40 h-40 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Slices using strokeDasharray on circles */}
              {/* Circumference = 2 * PI * 38 = 238.76 */}
              {/* Medical 29% -> 69.2 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#4cd7f6"
                strokeWidth="14"
                strokeDasharray="69.2 169.5"
                strokeDashoffset="0"
              />
              {/* Fire 25% -> 59.7 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#ff5451"
                strokeWidth="14"
                strokeDasharray="59.7 179"
                strokeDashoffset="-69.2"
              />
              {/* Accident 23% -> 54.9 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#ffb95f"
                strokeWidth="14"
                strokeDasharray="54.9 183.8"
                strokeDashoffset="-128.9"
              />
              {/* Other 14% -> 33.4 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#8991a9"
                strokeWidth="14"
                strokeDasharray="33.4 205.3"
                strokeDashoffset="-183.8"
              />
              {/* Hazmat 9% -> 21.5 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#ca8100"
                strokeWidth="14"
                strokeDasharray="21.5 217.2"
                strokeDashoffset="-217.2"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-[#dee1f9] font-stat-metric">48</span>
              <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">TOTAL</span>
            </div>
          </div>

          {/* Breakdown Legend */}
          <div className="flex flex-col gap-1.5 text-xs font-code-telemetry pt-1">
            {ANALYTICS_DATA.incidentsByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#dee1f9]">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#dee1f9] font-bold">{item.count}</span>
                  <span className="text-[#64748b] w-8 text-right">({item.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid Row 2: Average Response by Zone */}
      <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#25293a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">bar_chart</span>
            <span className="text-sm font-bold text-[#dee1f9]">
              Average Response Time by Geographic Zone
            </span>
          </div>
          <div className="flex items-center gap-2 font-code-telemetry text-xs">
            <span className="flex items-center gap-1.5 text-[#ff5451] font-semibold">
              <span className="w-3 h-0.5 bg-[#ff5451] inline-block" />
              8.0m SLA Threshold
            </span>
          </div>
        </div>

        {/* Horizontal Bar Chart with 8.0m Target Line */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-2">
          {ANALYTICS_DATA.zoneResponseTimes.map((zoneItem) => {
            const isAlert = zoneItem.time >= 8.0;
            const isWarning = zoneItem.time >= 6.5 && zoneItem.time < 8.0;

            return (
              <div
                key={zoneItem.zone}
                className="flex flex-col items-center bg-[#080d1d] p-3 rounded border border-[#25293a] justify-between relative"
              >
                <span className="font-code-telemetry text-xs font-bold text-[#dee1f9]">
                  {zoneItem.zone}
                </span>

                {/* Vertical Visual Bar Column */}
                <div className="w-8 h-32 bg-[#161b2b] rounded-t flex items-end my-2 relative">
                  {/* SLA reference tick mark at 80% */}
                  <div className="absolute top-[20%] left-0 right-0 h-0.5 bg-[#ff5451]/50 pointer-events-none" />
                  
                  <div
                    className={`w-full rounded-t transition-all ${
                      isAlert
                        ? 'bg-[#ff5451]'
                        : isWarning
                        ? 'bg-[#ffb95f]'
                        : 'bg-[#4cd7f6]'
                    }`}
                    style={{ height: `${(zoneItem.time / 10) * 100}%` }}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span
                    className={`font-code-telemetry text-xs font-bold ${
                      isAlert ? 'text-[#ff5451]' : isWarning ? 'text-[#ffb95f]' : 'text-[#4cd7f6]'
                    }`}
                  >
                    {zoneItem.time}m
                  </span>
                  <span className="text-[10px] text-[#64748b]">
                    {isAlert ? 'SLA Alert' : isWarning ? 'Elevated' : 'Optimal'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-2.5 rounded bg-[#1a1f30] border border-[#ff5451]/30 flex items-center justify-between text-xs">
          <span className="text-[#ffb3ad] flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#ff5451]">warning</span>
            Zone 7 exceeds target SLA threshold (8.0m) due to Highway 7 bottleneck. Recommend pre-staging standby rescue unit at Station 4.
          </span>
          <span className="font-code-telemetry text-[#4cd7f6] hidden sm:inline">CAD Advisory Active</span>
        </div>
      </div>

      {/* Historical Incident Log & Table */}
      <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#25293a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">table_view</span>
            <span className="text-sm font-bold text-[#dee1f9]">Historical Incident CAD Ledger</span>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748b] text-[16px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by ID, Zone, Type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080d1d] text-[#dee1f9] text-xs pl-8 pr-3 py-1.5 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#25293a] text-[#64748b] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">CAD ID</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Sector / Zone</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Response Time</th>
                <th className="py-2.5 px-3">Assigned Units</th>
                <th className="py-2.5 px-3">AI Score</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25293a] font-code-telemetry">
              {filteredTable.map((row) => (
                <tr key={row.id} className="hover:bg-[#1a1f30] transition-colors">
                  <td className="py-2 px-3 font-bold text-[#4cd7f6]">{row.id}</td>
                  <td className="py-2 px-3 text-[#dee1f9] font-sans font-medium">{row.type}</td>
                  <td className="py-2 px-3 text-[#94a3b8]">{row.zone}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.severity === 'CRITICAL'
                          ? 'bg-[#93000a]/40 text-[#ffb3ad]'
                          : row.severity === 'HIGH'
                          ? 'bg-[#ca8100]/30 text-[#ffb95f]'
                          : 'bg-[#4cd7f6]/20 text-[#4cd7f6]'
                      }`}
                    >
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-[#dee1f9]">{row.time}</td>
                  <td className="py-2 px-3 text-[#94a3b8]">{row.units}</td>
                  <td className="py-2 px-3 text-[#4cd7f6]">{row.ai}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`text-[11px] font-bold ${
                        row.status === 'Active'
                          ? 'text-[#ff5451] animate-pulse'
                          : row.status === 'Resolved'
                          ? 'text-[#4cd7f6]'
                          : 'text-[#ffb95f]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cryptographic Ledger Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-[#64748b] font-code-telemetry border-t border-[#25293a]">
          <span>CRYPTOGRAPHIC HASH: SHA-256: 4f89b78...e21ac904</span>
          <span>LEDGER VERIFIED BY AUDIT CLUSTER SEC-04</span>
        </div>
      </div>
    </div>
  );
};
