import { useMemo } from 'react';

import GhostSvg from '@/components/GhostSvg/GhostSvg';

import GameState from '@/utils/constants/GameState';
import Media from '@/utils/constants/Media';
import StringHelper from '@/utils/helpers/StringHelper';
import { Color } from '@/utils/types';

import './PlayerStatusBar.scss';

type PlayerStatusBar = {
  color: Color;
  playerAddress: string;
  playerEntry: number;
  playerEntryRatio: number;
  winnerAddress: `0x${string}` | null;
  gameState: GameState;
};

const PlayerStatusBar = ({
  color,
  playerAddress,
  playerEntry,
  playerEntryRatio,
  winnerAddress,
  gameState,
}: PlayerStatusBar) => {
  const isWinner = useMemo(
    () => playerAddress === winnerAddress && gameState === GameState.complete,
    [playerAddress, winnerAddress, gameState],
  );

  return (
    <div
      className="player-status-bar"
      style={{
        boxShadow: isWinner ? `0 0 8px 0 ${color}` : 'none',
      }}
    >
      <div className="ratio-bar">
        <div style={{ background: color, width: `${playerEntryRatio}%` }} />
      </div>

      <div className="status-row">
        <div className="player-color-icon">
          <GhostSvg color={color} />
        </div>
        <div className="ratio-text">{`${playerEntryRatio.toFixed(2)}%`}</div>
        <div className="player-address">
          {StringHelper.truncateAddress(playerAddress)}
        </div>
        <div className="tt-entry">
          <img className="tt-icon" alt="tt-icon" src={Media.images.aptos} />
          <div className="entry-text">{`${StringHelper.numberWithComma(
            playerEntry,
          )}APT`}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatusBar;
