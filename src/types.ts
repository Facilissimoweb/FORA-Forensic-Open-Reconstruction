export interface EvidenceMarker {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  description: string;
  tag: string; // e.g. "Arma", "Impronta", "Bossolo", "DNA", "Traccia Ematica"
  photoUrl?: string;
  notes?: string;
}

export interface Trajectory {
  id: number;
  startX: number;
  startY: number;
  startZ: number;
  endX: number;
  endY: number;
  endZ: number;
  angleAzimuth: number; // in gradi
  angleElevation: number; // in gradi
  confidence: number; // e.g. 95%
  type: string; // e.g. "Balistica", "Traiettoria Caduta", "Linea Visiva"
}

export interface ForensicCase {
  id: string;
  title: string;
  date: string;
  location: string;
  operator: string;
  description: string;
  markers: EvidenceMarker[];
  trajectories: Trajectory[];
}
