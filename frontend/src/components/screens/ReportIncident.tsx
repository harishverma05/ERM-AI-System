import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../../types';

interface ReportIncidentProps {
  onIncidentCreated: (newIncident: Incident) => void;
}

export const ReportIncident: React.FC<ReportIncidentProps> = ({ onIncidentCreated }) => {
  const [incidentType, setIncidentType] = useState('Structural Fire');
  const [location, setLocation] = useState('412 Oak Street, Zone 4');
  const [zone, setZone] = useState('Zone 4');
  const [severity, setSeverity] = useState<SeverityLevel>('CRITICAL');
  const [casualties, setCasualties] = useState('4-6 trapped (2 Potential)');
  const [reportedBy, setReportedBy] = useState('911 Emergency Call — Anonymous');
  const [description, setDescription] = useState(
    'Structural fire reported on 3rd floor of residential multi-family building. Dense black smoke visible from street level. Possible occupants trapped on floor 3 and 4. Caller reports hearing cries for assistance. Wind pushing smoke toward adjacent structures.'
  );
  const [specialResources, setSpecialResources] = useState<string[]>([
    'Aerial Ladder',
    'Heavy Extrication'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const toggleResource = (res: string) => {
    if (specialResources.includes(res)) {
      setSpecialResources(specialResources.filter((r) => r !== res));
    } else {
      setSpecialResources([...specialResources, res]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInc: Incident = {
        id: `INC-08${Math.floor(52 + Math.random() * 40)}`,
        title: incidentType,
        type: incidentType,
        location,
        zone,
        sector: 'North District',
        severity,
        priority: severity === 'CRITICAL' ? 'P1' : severity === 'HIGH' ? 'P2' : 'P3',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeAgo: 'Just now',
        casualties,
        reportedBy,
        weather: 'Wind 28 km/h NW • Dry',
        coordinates: '40.7589° N, 73.9851° W',
        nearestHospital: 'City General (1.2 km)',
        description,
        assignedUnits: [],
        recommendedUnits: ['AMB-03', 'FIRE-01'],
        status: 'Active',
        aiAccuracy: '96.4%',
        responseTime: '4.2 min',
        mapCoords: { x: 455, y: 320 }
      };

      setIsSubmitting(false);
      setSubmissionSuccess(true);
      onIncidentCreated(newInc);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5451] text-[22px]">add_alert</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">Report Incident / Intake CAD</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Manual 911 dispatch intake • NLP live classification • Auto-route proposal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1.5 rounded border border-[#25293a] font-semibold">
            CAD GATEWAY: SEC-04 READY
          </span>
        </div>
      </div>

      {submissionSuccess && (
        <div className="p-4 rounded-lg bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#dee1f9] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-[#4cd7f6]">check_circle</span>
            <div>
              <p className="text-sm font-bold text-[#dee1f9]">Incident Transmitted to Tactical CAD</p>
              <p className="text-xs text-[#4cd7f6] font-code-telemetry">
                Broadcasted to all active units. AI Dispatch Engine queue updated with immediate priority.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionSuccess(false)}
            className="text-[#4cd7f6] hover:text-[#dee1f9] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left 7 Cols: Incident Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-[#161b2b] p-4 md:p-6 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
            <span className="text-sm font-bold text-[#dee1f9] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">edit_note</span>
              Incident Intake Details
            </span>
            <span className="text-[11px] text-[#64748b] font-code-telemetry">MANDATORY CAD FIELDS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Incident Type */}
            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Incident Classification
              </label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2.5 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none"
              >
                <option value="Structural Fire">Structural Fire</option>
                <option value="Vehicle Collision">Multi-Vehicle Collision</option>
                <option value="Medical Emergency">Medical Emergency / Cardiac</option>
                <option value="Hazmat Incident">Hazmat Incident / Gas Leak</option>
                <option value="Crowd Disturbance">Crowd Disturbance</option>
                <option value="Wildfire Perimeter">Wildfire Perimeter</option>
              </select>
            </div>

            {/* Zone */}
            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Operational Zone
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2.5 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none"
              >
                <option value="Zone 1">Zone 1 — Industrial West</option>
                <option value="Zone 2">Zone 2 — Riverfront</option>
                <option value="Zone 3">Zone 3 — Civic Center</option>
                <option value="Zone 4">Zone 4 — North District (Oak Corridor)</option>
                <option value="Zone 5">Zone 5 — Central Downtown</option>
                <option value="Zone 6">Zone 6 — South Suburbs</option>
                <option value="Zone 7">Zone 7 — Metro East Corridor</option>
              </select>
            </div>
          </div>

          {/* Location / Address */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider font-semibold">
                Street Address / Mile Marker
              </label>
              <span className="text-[11px] text-[#4cd7f6] font-code-telemetry flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[13px]">my_location</span>
                GPS Auto-Detected: 40.7589° N, 73.9851° W
              </span>
            </div>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2.5 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none font-code-telemetry"
            />
          </div>

          {/* Triage Severity Classification Cards */}
          <div>
            <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1.5 font-semibold">
              Triage Severity Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Level 1 */}
              <div
                onClick={() => setSeverity('CRITICAL')}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  severity === 'CRITICAL'
                    ? 'bg-[#93000a]/30 border-[#ff5451]'
                    : 'bg-[#080d1d] hover:bg-[#1a1f30] border-[#25293a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#ffb3ad] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5451] animate-ping" />
                    Level 1 — Critical
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ff5451] text-[#5c0008]">
                    P1
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8]">
                  Immediate life threat, major structure fire, entrapment. Immediate dual-dispatch required.
                </p>
              </div>

              {/* Level 2 */}
              <div
                onClick={() => setSeverity('HIGH')}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  severity === 'HIGH'
                    ? 'bg-[#ca8100]/25 border-[#ffb95f]'
                    : 'bg-[#080d1d] hover:bg-[#1a1f30] border-[#25293a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#ffb95f]">Level 2 — High</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ffb95f] text-[#472a00]">
                    P2
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8]">
                  Severe trauma, active gas leak, rapid escalation risk. High-priority dispatch.
                </p>
              </div>

              {/* Level 3 */}
              <div
                onClick={() => setSeverity('MEDIUM')}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  severity === 'MEDIUM'
                    ? 'bg-[#4cd7f6]/20 border-[#4cd7f6]'
                    : 'bg-[#080d1d] hover:bg-[#1a1f30] border-[#25293a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#4cd7f6]">Level 3 — Medium</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#4cd7f6] text-[#003640]">
                    P3
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8]">
                  Non-life-threatening injury, minor vehicle collision, controlled crowd altercation.
                </p>
              </div>

              {/* Level 4 */}
              <div
                onClick={() => setSeverity('LOW')}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  severity === 'LOW'
                    ? 'bg-[#25293a] border-[#94a3b8]'
                    : 'bg-[#080d1d] hover:bg-[#1a1f30] border-[#25293a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#94a3b8]">Level 4 — Low</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#25293a] text-[#94a3b8]">
                    P4
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8]">
                  Routine assistance, post-incident hazard check, non-urgent welfare check.
                </p>
              </div>
            </div>
          </div>

          {/* Description with NLP Live Analyzer */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider font-semibold">
                Incident Description &amp; Caller Narrative
              </label>
              <span className="text-[11px] text-[#4cd7f6] font-code-telemetry flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[13px]">neurology</span>
                NLP Live Analyzer Active
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#080d1d] text-[#dee1f9] text-xs p-3 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none font-sans leading-relaxed"
            />
          </div>

          {/* Casualties and Reporter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Casualties &amp; At-Risk Count
              </label>
              <input
                type="text"
                value={casualties}
                onChange={(e) => setCasualties(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none font-code-telemetry"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Reporting Source
              </label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none"
              />
            </div>
          </div>

          {/* Requested Special Resources Checkboxes */}
          <div>
            <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1.5 font-semibold">
              Requested Specialized Capabilities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'Aerial Ladder',
                'HAZMAT Containment',
                'Heavy Extrication',
                'Tactical K9',
                'Marine / Water Rescue',
                'Drone Recon'
              ].map((res) => {
                const isChecked = specialResources.includes(res);
                return (
                  <label
                    key={res}
                    className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#1a1f30] border-[#4cd7f6] text-[#dee1f9]'
                        : 'bg-[#080d1d] border-[#25293a] text-[#94a3b8]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleResource(res)}
                      className="accent-[#4cd7f6]"
                    />
                    <span className="text-[11px] font-medium">{res}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Transmitting CAD Data &amp; Alerting Dispatch...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                  <span>Submit Incident &amp; Transmit to CAD</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right 5 Cols: AI Real-Time Verification Card */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Card: AI Analysis & NLP Features */}
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#4cd7f6]/30 shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#25293a]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">neurology</span>
                <h3 className="text-sm font-bold text-[#dee1f9]">AI Triage Prediction</h3>
              </div>
              <span className="font-code-telemetry text-xs bg-[#4cd7f6]/10 text-[#4cd7f6] px-2 py-0.5 rounded font-bold border border-[#4cd7f6]/20">
                TRIAGE-NLP v2.4
              </span>
            </div>

            {/* Predicted Severity */}
            <div className="p-3 rounded bg-[#080d1d] border border-[#ff5451]/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
                  CLASSIFIER OUTPUT
                </span>
                <span className="font-code-telemetry text-xs text-[#ff5451] font-bold">
                  96.1% CONFIDENCE
                </span>
              </div>
              <div className="text-base font-bold text-[#ffb3ad] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5451] animate-ping" />
                PREDICTED: CRITICAL L1 (LIFE THREAT)
              </div>
              {/* Confidence Progress Bar */}
              <div className="w-full bg-[#161b2b] h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-[#ff5451] h-full rounded-full w-[96.1%]" />
              </div>
            </div>

            {/* Extracted NLP Semantic Features */}
            <div>
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider block mb-1 font-semibold">
                Extracted Semantic Risk Tokens
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-code-telemetry px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb3ad] border border-[#ff5451]/30">
                  Occupants Trapped [CRITICAL]
                </span>
                <span className="text-[10px] font-code-telemetry px-2 py-0.5 rounded bg-[#ca8100]/30 text-[#ffb95f] border border-[#ffb95f]/30">
                  Heavy Black Smoke [HIGH]
                </span>
                <span className="text-[10px] font-code-telemetry px-2 py-0.5 rounded bg-[#25293a] text-[#dee1f9] border border-[#25293a]">
                  Multi-Family 3rd Floor [MED]
                </span>
                <span className="text-[10px] font-code-telemetry px-2 py-0.5 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/30">
                  Spread Risk: NW Wind [ALERT]
                </span>
              </div>
            </div>

            {/* Environmental Weather Risk */}
            <div className="p-2.5 rounded bg-[#1a1f30] border border-[#25293a] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#ffb95f] shrink-0">air</span>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-[#dee1f9]">Weather Risk Advisory</span>
                <p className="text-[#94a3b8] text-[11px] mt-0.5 leading-snug">
                  Wind blowing 28 km/h NW will propel fire embers toward adjacent two-story structure at 416 Oak Street. Secondary perimeter unit recommended.
                </p>
              </div>
            </div>

            {/* Nearby Critical Facilities */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
                Nearby Priority Facilities
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-code-telemetry">
                <div className="p-2 rounded bg-[#080d1d] border border-[#25293a]">
                  <span className="text-[#64748b] block text-[10px]">Hospital</span>
                  <span className="text-[#4cd7f6] font-bold">City General (1.2 km)</span>
                </div>
                <div className="p-2 rounded bg-[#080d1d] border border-[#25293a]">
                  <span className="text-[#64748b] block text-[10px]">Hydrant Flow</span>
                  <span className="text-[#dee1f9] font-bold">1200 GPM (Adequate)</span>
                </div>
              </div>
            </div>

            {/* Mini Target Map Locator Preview */}
            <div className="relative h-36 rounded overflow-hidden border border-[#25293a] bg-[#080d1d]">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                <rect width="300" height="150" fill="#080d1d" />
                {/* Street Lines */}
                <path d="M 0 75 L 300 75" stroke="#161b2b" strokeWidth="6" />
                <path d="M 150 0 L 150 150" stroke="#161b2b" strokeWidth="6" />
                <circle cx="150" cy="75" r="30" fill="none" stroke="#ff5451" strokeDasharray="3 3" strokeWidth="1" />
                <circle cx="150" cy="75" r="50" fill="none" stroke="#4cd7f6" opacity="0.3" strokeWidth="0.75" />
                {/* Crosshair */}
                <line x1="140" y1="75" x2="160" y2="75" stroke="#ff5451" strokeWidth="2" />
                <line x1="150" y1="65" x2="150" y2="85" stroke="#ff5451" strokeWidth="2" />
                <circle cx="150" cy="75" r="4" fill="#ff5451" className="animate-ping" />
              </svg>
              <div className="absolute bottom-2 left-2 bg-[#080d1d]/85 px-2 py-0.5 rounded text-[10px] font-code-telemetry text-[#4cd7f6] border border-[#25293a]">
                40.7589° N, 73.9851° W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
