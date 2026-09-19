import React from 'react';
import { Screen } from '../types';


interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  activeIncidentsCount: number;
  pendingDispatchCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
  activeIncidentsCount,
  pendingDispatchCount,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const navItem = (
    screenId: Screen,
    icon: string,
    label: string,
    badge?: number,
    badgeColor?: string,
    categoryColor?: 'primary' | 'secondary' | 'neutral'
  ) => {
    const isActive = currentScreen === screenId;
    let activeStyle = '';
    
    if (isActive) {
      if (categoryColor === 'primary') {
        activeStyle = 'bg-[#25293a] text-[#ffb3ad] border-l-2 border-[#ff5451] font-semibold';
      } else if (categoryColor === 'secondary') {
        activeStyle = 'bg-[#25293a] text-[#4cd7f6] border-l-2 border-[#4cd7f6] font-semibold';
      } else {
        activeStyle = 'bg-[#25293a] text-[#dee1f9] font-semibold border-l-2 border-[#dee1f9]';
      }
    } else {
      activeStyle = 'text-[#94a3b8] hover:bg-[#1a1f30] hover:text-[#dee1f9]';
    }

    return (
      <button
        key={screenId}
        type="button"
        onClick={() => {
          onNavigate(screenId);
          if (onCloseMobile) onCloseMobile();
        }}
        className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs transition-colors cursor-pointer text-left ${activeStyle}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
          <span className="truncate">{label}</span>
        </div>
        {badge !== undefined && (
          <span
            className={`font-code-telemetry text-[11px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
              badgeColor || 'bg-[#25293a] text-[#4cd7f6]'
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-[#080d1d] border-r border-[#25293a] z-50 flex flex-col justify-between select-none transition-transform duration-200 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="h-14 px-3 flex items-center gap-2 border-b border-[#25293a] bg-[#080d1d]">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-[#4cd7f6] to-[#0891b2] flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[18px] text-[#080d1d] font-bold">shield</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold tracking-tight text-[#dee1f9] truncate font-sans">
                AI ERM SYSTEM
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#4cd7f6] truncate font-semibold">
                Response Command
              </span>
            </div>
          </div>

          {/* Section: COMMAND */}
          <div className="px-3 pt-3 pb-1">
            <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
              COMMAND
            </span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItem('live-dashboard', 'space_dashboard', 'Live Dashboard', activeIncidentsCount, 'bg-[#25293a] text-[#4cd7f6]', 'primary')}
            {navItem('dispatch-center', 'fmd_good', 'Dispatch Center', pendingDispatchCount, 'bg-[#ff5451] text-[#5c0008]', 'primary')}
            {navItem('incident-map', 'map', 'Incident Map', undefined, undefined, 'primary')}
          </nav>

          {/* Section: AI TOOLS */}
          <div className="px-3 pt-3 pb-1">
            <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
              AI TOOLS
            </span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItem('severity-predictor', 'psychology', 'Severity Predictor', undefined, undefined, 'secondary')}
            {navItem('route-optimizer', 'alt_route', 'Route Optimizer', undefined, undefined, 'secondary')}
            {navItem('resource-tracker', 'emergency', 'Resource Tracker', undefined, undefined, 'secondary')}
            {navItem('report-incident', 'warning', 'Report Incident', undefined, undefined, 'secondary')}
          </nav>

          {/* Section: REPORTS */}
          <div className="px-3 pt-3 pb-1">
            <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
              REPORTS
            </span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItem('analytics-reports', 'monitoring', 'Analytics & Reports', undefined, undefined, 'neutral')}
            {navItem('response-logs', 'assignment', 'Response Logs', undefined, undefined, 'neutral')}
            {navItem('settings', 'settings', 'Settings', undefined, undefined, 'neutral')}
          </nav>
        </div>

        {/* Profile Footer */}
        <div className="relative p-2 border-t border-[#25293a] bg-[#161b2b]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4cd7f6] to-[#0891b2] flex items-center justify-center text-[#080d1d] text-xs font-bold ring-1 ring-[#25293a]">
                  CR
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4cd7f6] rounded-full ring-2 ring-[#161b2b]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#dee1f9] truncate leading-tight">
                  Cmdr. Reynolds
                </span>
                <span className="text-[10px] text-[#4cd7f6] truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] inline-block animate-pulse" />
                  Ready / On-Duty
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 text-[#94a3b8] hover:text-[#dee1f9] hover:bg-[#1a1f30] rounded cursor-pointer transition-colors"
              title="Operator options"
            >
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-14 left-2 right-2 bg-[#1a1f30] border border-[#25293a] rounded-lg shadow-2xl p-1 z-50 text-xs">
              <div className="px-2 py-1.5 border-b border-[#25293a] text-[11px] text-[#94a3b8]">
                Clearance: <strong className="text-[#4cd7f6]">TOP SECRET // CAD-4</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('settings');
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-[#25293a] text-[#dee1f9] rounded transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Terminal Preferences
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-[#ff5451]/20 text-[#ffb3ad] rounded transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                Lock Console / Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
