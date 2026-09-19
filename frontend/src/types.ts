export type Screen = 
  | 'login'
  | 'live-dashboard'
  | 'dispatch-center'
  | 'incident-map'
  | 'severity-predictor'
  | 'route-optimizer'
  | 'resource-tracker'
  | 'report-incident'
  | 'analytics-reports'
  | 'response-logs'
  | 'settings';

export type UserRole = 'admin' | 'coordinator' | 'field';

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Incident {
  id: string;
  title: string;
  type: string;
  location: string;
  zone: string;
  sector: string;
  severity: SeverityLevel;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  timestamp: string;
  timeAgo: string;
  casualties: string;
  reportedBy: string;
  weather: string;
  coordinates: string;
  nearestHospital: string;
  description: string;
  assignedUnits: string[];
  recommendedUnits?: string[];
  status: 'Active' | 'Pending' | 'Resolved' | 'Dispatched';
  aiAccuracy: string;
  responseTime: string;
  mapCoords: { x: number; y: number };
}

export interface EmergencyUnit {
  id: string;
  name: string;
  type: string;
  category: 'Ambulance' | 'Fire' | 'Police' | 'Hazmat' | 'Air';
  status: 'AVAILABLE' | 'EN ROUTE' | 'ON SCENE' | 'STANDBY';
  etaMinutes: number;
  distanceKm: number;
  viaRoute: string;
  matchScore: number;
  badgeType: 'ALS' | 'RESCUE' | 'BLS' | 'HAZMAT' | 'PATROL';
  location: string;
  isPrimary?: boolean;
}

export interface TelemetrySummary {
  activeIncidents: number;
  incidentsDiff: number;
  criticalCount: number;
  highCount: number;
  medCount: number;
  unitsDeployed: number;
  totalUnits: number;
  unitsBreakdown: string;
  standbyUnits: number;
  avgResponseTime: number;
  responseDiff: number;
  slaTarget: number;
  aiModelAccuracy: number;
  f1Score: number;
  evaluatedPredictions: number;
  resourcesAvailable: number;
  capacityPercent: number;
  stationsReporting: number;
  iotNodesOnline: number;
  totalIotNodes: number;
}
