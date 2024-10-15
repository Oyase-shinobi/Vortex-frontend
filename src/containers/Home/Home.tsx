import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import SpinnerBackground from '@/components/SpinnerBackground/SpinnerBackground';
import Welcome from '@/components/Welcome/Welcome';

import BidPanel from '@/components/BidPanel/BidPanel';
import EntryPanel from '@/components/EntryPanel/EntryPanel';
import PlayerPanel from '@/components/PlayerPanel/PlayerPanel';
import SpinnerPanel from '@/components/SpinnerPanel/SpinnerPanel';

import { RootState } from '@/store/store';
import {
  resetGameState,
  setColors,
  setGameState,
  setRoundWinner,
} from '@/store/game/slice';

import ApiService from '@/utils/api/ApiService';
import GameState from '@/utils/constants/GameState';
import useWindowSize from '@/utils/hooks/useWindowSize';
import startPolling, { stopPolling } from '@/utils/helpers/PollingHelper';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { gameMode, gameState, round } = useSelector(
    (state: RootState) => state.gameSlice.game,
  );
  const { isWindowSmall } = useWindowSize();
  const { connected } = useWallet();

  useEffect(() => {
    startPolling();
    getColors();

    return () => {
      dispatch(resetGameState());
      stopPolling();
    };
  }, []);

  useEffect(() => {
    if (gameState === GameState.idle) {
      getColors();
    }
  }, [round, gameState]);

  useEffect(() => {
    if (gameState === GameState.selecting) {
      fetchWinnerInfo(30);
    }
  }, [gameState, round]);

  const getColors = () => {
    ApiService.game.getColors().then((res) => {
      dispatch(setColors(res));
    });
  };

  const fetchWinnerInfo = (count: number) => {
    if (count <= 0) {
      dispatch(setGameState(GameState.idle));
      return;
    }
    ApiService.game.getWinnerByRound(round).then((res) => {
      if (res.isComplete) {
        // console.log(res);
        dispatch(setRoundWinner(res));
        return;
      }
      setTimeout(() => {
        fetchWinnerInfo(count - 1);
      }, 2000);
    });
  };

  return (
    <div className={`home ${gameMode}`}>
      <SpinnerBackground />

      <div className="spinner-section">
        <SpinnerPanel />
      </div>

      <div className="info-section">
        {isWindowSmall && gameState !== GameState.idle ? null : <EntryPanel />}

        {isWindowSmall ? (
          <Fragment>
            {connected && gameState === GameState.idle && <BidPanel />}
            <PlayerPanel />
          </Fragment>
        ) : gameMode === 'view' ? (
          <PlayerPanel />
        ) : (
          <BidPanel />
        )}
      </div>

      <Welcome />
    </div>
  );
};

export default Home;
