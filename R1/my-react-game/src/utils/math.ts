import type { PointData } from '../types/game.types';

export const generateRandomPoints = (
  count: number,
  containerSize: number,
  pointSize: number
): PointData[] => {
  const newPoints: PointData[] = [];
  for (let i = 1; i <= count; i++) {
    newPoints.push({
      id: i,
      x: Math.random() * (containerSize - pointSize),
      y: Math.random() * (containerSize - pointSize),
      status: 'active',
      zIndex: count - i + 1, // Điểm số nhỏ nằm trên cùng
    });
  }
  return newPoints;
};