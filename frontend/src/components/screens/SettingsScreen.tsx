import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [preemptionActive, setPreemptionActive] = useState(true);
  const [autoDispatchThreshold, setAutoDispatchThreshold] = useState('95.0%');
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">settings</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">Tactical Terminal Settings</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Console preferences • CAD gateway connectivity • Reinforcement learning hyper-parameters
          </p>
        </div>
        <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1.5 rounded border border-[#25293a] font-semibold">
          STATION ID: CONSOLE-ALPHA-01
        </span>
      </div>

      {saveStatus && (
        <div className="p-3 bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] rounded-lg text-xs font-code-telemetry">
          ✓ Preferences written to encrypted local terminal profile and synchronized to SOC.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: CAD & Audio Preferences */}
        <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] flex flex-col gap-4">
          <span className="text-sm font-bold text-[#dee1f9] pb-2 border-b border-[#25293a] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">volume_up</span>
            Auditory &amp; Alert Telemetry
          </span>

          <label className="flex items-center justify-between p-2 rounded bg-[#080d1d] border border-[#25293a] cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-[#dee1f9] block">Tier 1 Siren &amp; CAD Chime</span>
              <span className="text-[11px] text-[#94a3b8]">Play audible tone upon new Critical incidents</span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="accent-[#4cd7f6] w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-[#080d1d] border border-[#25293a] cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-[#dee1f9] block">Traffic Signal Preemption Hook</span>
              <span className="text-[11px] text-[#94a3b8]">Automatically transmit green-wave lockouts upon unit rollout</span>
            </div>
            <input
              type="checkbox"
              checked={preemptionActive}
              onChange={(e) => setPreemptionActive(e.target.checked)}
              className="accent-[#4cd7f6] w-4 h-4 cursor-pointer"
            />
          </label>

          <div>
            <label className="text-[11px] text-[#94a3b8] uppercase tracking-wider block font-semibold mb-1">
              Autonomous Dispatch Confidence Minimum
            </label>
            <select
              value={autoDispatchThreshold}
              onChange={(e) => setAutoDispatchThreshold(e.target.value)}
              className="w-full bg-[#080d1d] text-[#dee1f9] text-xs px-3 py-2 rounded border border-[#25293a]"
            >
              <option value="90.0%">90.0% Confidence</option>
              <option value="95.0%">95.0% Confidence (Recommended)</option>
              <option value="98.0%">98.0% Confidence (Strict Guardrails)</option>
            </select>
          </div>
        </div>

        {/* Card 2: Security & Session */}
        <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] flex flex-col gap-4">
          <span className="text-sm font-bold text-[#dee1f9] pb-2 border-b border-[#25293a] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">security</span>
            Security &amp; Terminal Cryptography
          </span>

          <div className="p-3 bg-[#080d1d] rounded border border-[#25293a] flex flex-col gap-1 font-code-telemetry text-xs">
            <span className="text-[#64748b] text-[10px]">CURRENT OPERATOR</span>
            <span className="text-[#dee1f9] font-bold">Commander Reynolds (ID: CR-9042)</span>
            <span className="text-[#4cd7f6] text-[11px]">ROLE: SYSTEM ADMINISTRATOR // LEVEL 4</span>
          </div>

          <div className="p-3 bg-[#080d1d] rounded border border-[#25293a] flex flex-col gap-1 font-code-telemetry text-xs">
            <span className="text-[#64748b] text-[10px]">GATEWAY TLS FINGERPRINT</span>
            <span className="text-[#94a3b8] text-[11px] truncate">SHA-256: 7A:91:BB:04:F2:C1:99:38:DE:4B:32:00</span>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-auto py-2.5 bg-[#4cd7f6] hover:bg-[#03b5d3] text-[#003640] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
