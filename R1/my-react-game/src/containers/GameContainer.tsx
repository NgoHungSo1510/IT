import React, { useState, useEffect, useRef } from 'react';
import type { PointData, GameStatus } from '../types/game.types';
import { generateRandomPoints } from '../utils/math';
import ControlPanel from '../components/ControlPanel';
import GameBoard from '../components/GameBoard';

const CONTAINER_SIZE = 500;
const POINT_SIZE = 40;

const GameContainer: React.FC = () => {
  const [pointsCount, setPointsCount] = useState<number>(5);
  const [points, setPoints] = useState<PointData[]>([]);
  const [nextTarget, setNextTarget] = useState<number>(1);
  const [time, setTime] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => setTime(prev => prev + 0.1), 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus]);

  useEffect(() => {
    let autoInterval: NodeJS.Timeout;
    if (isAutoPlay && gameStatus === 'playing') {
      autoInterval = setInterval(() => handlePointClick(nextTarget), 500);
    }
    return () => clearInterval(autoInterval);
  }, [isAutoPlay, gameStatus, nextTarget]);

  const startGame = () => {
    setNextTarget(1);
    setTime(0);
    setGameStatus('playing');
    setIsAutoPlay(false);
    setPoints(generateRandomPoints(pointsCount, CONTAINER_SIZE, POINT_SIZE));
  };

  const handlePointClick = (id: number) => {
    if (gameStatus !== 'playing') return;
    if (id === nextTarget) {
      setPoints(prev => prev.map(p => p.id === id ? { ...p, status: 'fading' } : p));
      setNextTarget(prev => prev + 1);
    } else {
      setGameStatus('lost');
    }
  };

  const handleFaded = (id: number) => {
    setPoints(prev => {
      const updatedPoints = prev.map(p => p.id === id ? { ...p, status: 'cleared' } : p);
      const allCleared = updatedPoints.every(p => p.status === 'cleared');
      if (allCleared && updatedPoints.length > 0) setGameStatus('won');
      return updatedPoints;
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: `${CONTAINER_SIZE}px` }}>
        <ControlPanel
          pointsCount={pointsCount}
          onPointsChange={setPointsCount}
          time={time}
          gameStatus={gameStatus}
          onRestart={startGame}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
        />
        
        <GameBoard
          points={points}
          containerSize={CONTAINER_SIZE}
          pointSize={POINT_SIZE}
          onPointClick={handlePointClick}
          onPointFaded={handleFaded}
        />
        
        <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
          Next: {gameStatus === 'playing' ? nextTarget : ''}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;