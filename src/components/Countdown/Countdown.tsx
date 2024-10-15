import { useMemo } from 'react';

import GameState from '@/utils/constants/GameState';
import Media from '@/utils/constants/Media';

import './Countdown.scss';

type CountdownType = {
  time: number;
  gameState: GameState;
};

const Countdown = ({ time, gameState }: CountdownType) => {
  const minutes = useMemo(() => {
    const result = Math.floor(time / 60);
    return result < 10 ? `0${result}` : result;
  }, [time]);

  const seconds = useMemo(() => {
    const result = Math.floor(time % 60);
    return result < 10 ? `0${result}` : result;
  }, [time]);

  const completeClassname =
    time <= 0 ||
    gameState === GameState.complete ||
    gameState === GameState.selecting
      ? 'complete'
      : '';

  return (
    <div className={`countdown ${completeClassname}`}>
      <img
        src={Media.gifs.countdown}
        alt="countdown"
        className="countdown-icon"
      />
      <div className="time-block">{minutes}</div>
      <div className="time-block-middle">{':'}</div>
      <div className="time-block">{seconds}</div>
    </div>
  );
};

export default Countdown;
