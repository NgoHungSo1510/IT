import React from 'react';
import type { GameStatus } from '../types/game.types';

interface Props {
  pointsCount: number;
  onPointsChange: (val: number) => void;
  time: number;
  gameStatus: GameStatus;
  onRestart: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
}

const ControlPanel: React.FC<Props> = ({
  pointsCount, onPointsChange, time, gameStatus, onRestart, isAutoPlay, onToggleAutoPlay
}) => {
  let statusColor = "black";
  let statusText = "LET'S PLAY";
  if (gameStatus === 'won') { statusColor = "green"; statusText = "ALL CLEARED"; }
  else if (gameStatus === 'lost') { statusColor = "red"; statusText = "GAME OVER"; }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: statusColor, margin: '0 0 15px 0' }}>{statusText}</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ width: '80px', fontWeight: 'bold' }}>Points:</label>
        <input 
          type="number" 
          value={pointsCount} 
          onChange={e => onPointsChange(Number(e.target.value) || 0)}
          disabled={gameStatus === 'playing'}
          style={{ width: '150px', padding: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <label style={{ width: '80px', fontWeight: 'bold' }}>Time:</label>
        <span>{time.toFixed(1)}s</span>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={onRestart} 
          style={{ padding: '6px 20px', cursor: 'pointer', border: '1px solid #999', backgroundColor: '#f0f0f0' }}
        >
          {gameStatus === 'idle' ? 'Start' : 'Restart'}
        </button>
        <button 
          onClick={onToggleAutoPlay} 
          style={{ padding: '6px 20px', cursor: 'pointer', border: '1px solid #999', backgroundColor: '#f0f0f0' }}
        >
          Auto Play {isAutoPlay ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;