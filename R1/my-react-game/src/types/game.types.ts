export type PointStatus = 'active' | 'fading' | 'cleared';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface PointData {
  id: number;
  x: number;
  y: number;
  status: PointStatus;
  zIndex: number;
}