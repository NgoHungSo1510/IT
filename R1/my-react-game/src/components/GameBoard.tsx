import React from 'react';
import type { PointData } from '../types/game.types';
import PointCard from './PointCard';

interface Props {
  points: PointData[];
  containerSize: number;
  pointSize: number;
  onPointClick: (id: number) => void;
  onPointFaded: (id: number) => void;
}

const GameBoard: React.FC<Props> = ({ points, containerSize, pointSize, onPointClick, onPointFaded }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: `${containerSize}px`, 
      height: `${containerSize}px`, 
      border: '2px solid black',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      {points.map(point => (
        <PointCard
          key={point.id}
          data={point}
          pointSize={pointSize}
          onClick={onPointClick}
          onFaded={onPointFaded}
        />
      ))}
    </div>
  );
};

export default GameBoard;