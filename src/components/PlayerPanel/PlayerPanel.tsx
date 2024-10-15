import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import Players from '@/components/Players/Players';
import PlayerStatusBar from '@/components/PlayerStatusBar/PlayerStatusBar';
import Watching from '@/components/Watching/Watching';

import { RootState } from '@/store/store';

import ArrayHelper from '@/utils/helpers/ArrayHelper';
import ColorHelper from '@/utils/helpers/ColorHelper';
import GameState from '@/utils/constants/GameState';
import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import useWindowSize from '@/utils/hooks/useWindowSize';

import './PlayerPanel.scss';

const PlayerPanel = () => {
  const {
    playerEntryList,
    prizePool,
    winnerAddress,
    roundWinner,
    gameState,
    colors,
  } = useSelector((state: RootState) => state.gameSlice.game);
  const { isWindowSmall } = useWindowSize();
  const { connected } = useWallet();

  const list = useMemo(() => {
    if (gameState === GameState.complete && playerEntryList.length > 0) {
      const winnerIndex = playerEntryList.findIndex(
        (item: PlayerEntry) => item.player === winnerAddress,
      );
      if (winnerIndex !== -1) {
        return ArrayHelper.moveToNewIndex([...playerEntryList], winnerIndex, 0);
      }
      return playerEntryList;
    }
    return playerEntryList;
  }, [gameState, roundWinner, winnerAddress, playerEntryList]);

  const playerRatio = (value: number) => {
    return (value / Number(prizePool)) * 100;
  };

  const extraBottomSpaceClassname =
    isWindowSmall && !connected ? 'extra-space' : '';

  return (
    <div className={`player-panel ${extraBottomSpaceClassname}`}>
      <div className="player-and-watching">
        <Players />
        <Watching />
      </div>
      <div className="status-bar-list">
        {list.map((entry: PlayerEntry) => (
          <PlayerStatusBar
            key={entry.player}
            color={ColorHelper(colors, entry.index)}
            playerAddress={entry.player}
            playerEntry={Number(entry.entry)}
            playerEntryRatio={playerRatio(Number(entry.entry))}
            winnerAddress={winnerAddress}
            gameState={gameState}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerPanel;
