import React, { useState, useEffect } from 'react';
import { Screen } from '../types';


interface HeaderProps {
  onNavigate: (screen: Screen) => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenMobileSidebar }) => {
  const [timeStr, setTimeStr] = useState('09:47:22 UTC-5');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as HH:mm:ss UTC-5
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} UTC-5`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-60 right-0 h-14 bg-[#080d1d]/90 border-b border-[#25293a] z-40 flex items-center justify-between px-3 md:px-6 backdrop-blur-xl">
      {/* Left items */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#1a1f30] rounded"
          title="Open Menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* System ID */}
        <div className="flex items-center gap-1 font-code-telemetry text-xs text-[#64748b]">
          <span className="text-[#4cd7f6] font-semibold">SEC-04</span>
          <span>/</span>
          <span className="text-[#dee1f9]">SYS-CAD</span>
        </div>

        <div className="hidden sm:block h-4 w-px bg-[#25293a]" />

        {/* IoT Sensors Status */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-1 rounded border border-[#4cd7f6]/20 font-semibold">
          <span className="material-symbols-outlined text-[14px]">sensors</span>
          <span>IoT Sensors 24/24 Online</span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Active Critical Incidents Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#93000a]/20 border border-[#93000a] px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#ff5451] animate-ping" />
          <span className="text-[11px] font-semibold text-[#ffb3ad]">
            3 Critical Incidents Active — Zone 4 &amp; 7
          </span>
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-1.5 font-code-telemetry text-xs text-[#dee1f9] bg-[#1a1f30] px-2.5 py-1 rounded border border-[#25293a]">
          <span className="material-symbols-outlined text-[14px] text-[#64748b]">schedule</span>
          <span>{timeStr}</span>
        </div>

        {/* Report Incident CTA */}
        <button
          type="button"
          onClick={() => onNavigate('report-incident')}
          className="flex items-center gap-1 bg-[#ff5451] hover:bg-[#b91a24] text-[#5c0008] hover:text-white px-3 py-1.5 rounded font-semibold text-xs transition-colors shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add_alert</span>
          <span className="font-bold">+ Report Incident</span>
        </button>

        {/* Controls Divider */}
        <div className="flex items-center gap-1.5 border-l border-[#25293a] pl-2 md:pl-4">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#1a1f30] rounded transition-colors cursor-pointer"
            title={isMuted ? 'Unmute CAD Alarm' : 'Mute CAD Alarm'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4cd7f6] to-[#0891b2] flex items-center justify-center text-[#080d1d] text-xs font-bold ring-1 ring-[#25293a] cursor-pointer"
            onClick={() => onNavigate('settings')}
            title="Cmdr. Reynolds Settings"
          >
            CR
          </div>
        </div>
      </div>
    </header>
  );
};
