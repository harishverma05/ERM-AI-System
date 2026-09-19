import React, { useState } from 'react';
import { EmergencyUnit } from '../../types';

interface ResourceTrackerScreenProps {
  units: EmergencyUnit[];
}

export const ResourceTrackerScreen: React.FC<ResourceTrackerScreenProps> = ({ units }) => {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Ambulance' | 'Fire' | 'Police' | 'Hazmat'>('All');

  const fleet = [
    ...units,
    {
      id: 'AMB-02',
      name: 'AMB-02',
      type: 'Basic Life Support',
      category: 'Ambulance' as const,
      status: 'AVAILABLE' as const,
      etaMinutes: 3.8,
      distanceKm: 0.9,
      viaRoute: 'River Road',
      matchScore: 88,
      badgeType: 'BLS' as const,
      location: 'Station 2'
    },
    {
      id: 'FIRE-04',
      name: 'FIRE-04',
      type: 'Aerial Ladder Truck',
      category: 'Fire' as const,
      status: 'STANDBY' as const,
      etaMinutes: 7.2,
      distanceKm: 2.4,
      viaRoute: 'Highway 7',
      matchScore: 92,
      badgeType: 'RESCUE' as const,
      location: 'Station 1'
    },
    {
      id: 'POL-01',
      name: 'POL-01',
      type: 'Cruiser Perimeter Unit',
      category: 'Police' as const,
      status: 'ON SCENE' as const,
      etaMinutes: 1.5,
      distanceKm: 0.4,
      viaRoute: 'Oak Corridor',
      matchScore: 95,
      badgeType: 'PATROL' as const,
      location: 'Zone 4 Beat'
    },
    {
      id: 'AIR-01',
      name: 'AIR-01',
      type: 'Medevac Helicopter',
      category: 'Ambulance' as const,
      status: 'STANDBY' as const,
      etaMinutes: 5.0,
      distanceKm: 6.2,
      viaRoute: 'Direct Flight',
      matchScore: 99,
      badgeType: 'ALS' as const,
      location: 'Helipad Metro Central'
    }
  ];

  const filteredFleet = fleet.filter((u) => {
    if (filterCategory === 'All') return true;
    return u.category === filterCategory;
  });

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">emergency</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">
              Emergency Resource &amp; Fleet Tracker
            </h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Real-time GPS status • Maintenance health • Equipment readiness telemetry
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
          {(['All', 'Ambulance', 'Fire', 'Police', 'Hazmat'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#25293a] text-[#4cd7f6] font-semibold'
                  : 'text-[#64748b] hover:text-[#dee1f9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredFleet.map((u) => (
          <div
            key={u.id}
            className="p-4 rounded-lg bg-[#161b2b] border border-[#25293a] shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-base font-bold text-[#dee1f9] font-code-telemetry">{u.name}</span>
                <p className="text-xs text-[#94a3b8]">{u.type}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-code-telemetry ${
                  u.status === 'AVAILABLE'
                    ? 'bg-[#4cd7f6]/15 text-[#4cd7f6]'
                    : u.status === 'ON SCENE'
                    ? 'bg-[#ff5451]/20 text-[#ffb3ad]'
                    : 'bg-[#ffb95f]/20 text-[#ffb95f]'
                }`}
              >
                {u.status}
              </span>
            </div>

            <div className="my-3 py-2 bg-[#080d1d] px-3 rounded border border-[#25293a] flex items-center justify-between text-xs font-code-telemetry">
              <span className="text-[#64748b]">Base Station</span>
              <span className="text-[#dee1f9]">{u.location}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748b]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">speed</span>
                ETA: {u.etaMinutes}m ({u.distanceKm} km)
              </span>
              <span className="text-[#4cd7f6] font-code-telemetry">Score: {u.matchScore}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
