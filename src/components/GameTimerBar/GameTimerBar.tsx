import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Round from '@/components/Round/Round';
import HistoryButton from '@/components/HistoryButton/HistoryButton';

import { RootState } from '@/store/store';
import {
  setPlayerEntryList,
  setGameState,
  resetRoundWinner,
} from '@/store/game/slice';

import GameState from '@/utils/constants/GameState';
import StringHelper from '@/utils/helpers/StringHelper';

import './GameTimerBar.scss';

const GameTimerBar = () => {
  let timerId: NodeJS.Timeout | null = null;
  const dispatch = useDispatch();

  const { gameState, prizePool, countdown } = useSelector(
    (state: RootState) => state.gameSlice.game,
  );
  const { price } = useSelector(
    (state: RootState) => state.coinPriceSlice.coinPrice,
  );

  const [nextCountdown, setNextCountdown] = useState(10);

  const totalEntryUsdString = `$${StringHelper.numberWithComma(
    Number(prizePool) * price,
    2,
  )}`;

  const countdownRatio = useMemo(() => {
    return (countdown * 100) / 90;
  }, [countdown]);

  useEffect(() => {
    if (gameState === GameState.complete) {
      timerId = setInterval(() => {
        setNextCountdown((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerId!);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timerId!);
      };
    }
  }, [gameState]);

  useEffect(() => {
    if (nextCountdown <= 0) {
      dispatch(setGameState(GameState.idle));
      dispatch(resetRoundWinner());
      dispatch(setPlayerEntryList([]));
      setNextCountdown(10);
    }
  }, [nextCountdown]);

  return (
    <div className="game-timer-bar">
      <div className="top-section">
        <Round />
        <div className="total-entry-usd">{totalEntryUsdString}</div>
        <HistoryButton />
      </div>

      {gameState === GameState.idle && (
        <div className="bottom-section">
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${countdownRatio}%` }}
            />
          </div>
        </div>
      )}

      {gameState === GameState.selecting && (
        <div className="bottom-section">{'Drawing winner...'}</div>
      )}

      {gameState === GameState.complete && (
        <div className="bottom-section">{`${nextCountdown}s to the next round...`}</div>
      )}
    </div>
  );
};

export default GameTimerBar;
