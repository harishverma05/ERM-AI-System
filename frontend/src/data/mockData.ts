import { Incident, EmergencyUnit, TelemetrySummary } from '../types';

export const ASSETS = {
  emblem: '',
  commanderAvatar: '',
  gisMapBg: '',
  cadBlueprint: '',
  geospatialRef: '',
};

export const INITIAL_TELEMETRY: TelemetrySummary = {
  activeIncidents: 0,
  incidentsDiff: 0,
  criticalCount: 0,
  highCount: 0,
  medCount: 0,
  unitsDeployed: 0,
  totalUnits: 0,
  unitsBreakdown: '',
  standbyUnits: 0,
  avgResponseTime: 0,
  responseDiff: 0,
  slaTarget: 0,
  aiModelAccuracy: 0,
  f1Score: 0,
  evaluatedPredictions: 0,
  resourcesAvailable: 0,
  capacityPercent: 0,
  stationsReporting: 0,
  iotNodesOnline: 0,
  totalIotNodes: 0,
};

export const INITIAL_INCIDENTS: Incident[] = [];

export const INITIAL_UNITS: EmergencyUnit[] = [];

export const ANALYTICS_DATA = {
  kpis: {
    totalIncidentsToday: 0,
    incidentsDeltaPercent: 0,
    avgResponseTime: 0,
    responseDeltaMin: 0,
    resolutionRate: 0,
    resolutionDeltaPercent: 0,
    aiAccuracy: 0,
    f1Score: 0,
    unitsDeployedTotal: 0,
  },
  incidentsByType: [] as { type: string; count: number; percent: number; color: string }[],
  zoneResponseTimes: [] as { zone: string; time: number; percent: number; status: string }[],
  hourlyTrend: [] as { hour: string; critical: number; high: number; medium: number; isPeak?: boolean }[],
};
