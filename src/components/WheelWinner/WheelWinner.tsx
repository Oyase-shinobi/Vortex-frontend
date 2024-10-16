import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import CelebrateAnimation from '@/components/CelebrateAnimation/CelebrateAnimation';
import GhostSvg from '@/components/GhostSvg/GhostSvg';

import { RootState } from '@/store/store';

import ColorHelper from '@/utils/helpers/ColorHelper';
import Media from '@/utils/constants/Media';
import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import StringHelper from '@/utils/helpers/StringHelper';

import './WheelWinner.scss';

const WheelWinner = () => {
  const { playerEntryList, winnerAddress, prizePool, colors } = useSelector(
    (state: RootState) => state.gameSlice.game,
  );

  const winEntry = useMemo(() => {
    return playerEntryList.find(
      (item: PlayerEntry) => item.player === winnerAddress,
    ) as PlayerEntry | undefined;
  }, [playerEntryList, winnerAddress]);

  const zoom = useMemo(() => {
    const width = window.innerWidth;
    if (width >= 1810) return 100;
    if (width <= 1200) {
      return 100 - (1200 - width) / 18;
    }
    return 100 - (1810 - width) / 20;
  }, [window.innerWidth]);

  if (winEntry === undefined) {
    console.error('Wheel winner not found!');
    return null;
  }

  const index = winEntry.index;
  const winMultiplier = (prizePool / Number(winEntry.entry)).toFixed(2);

  return (
    <div className="wheel-winner" style={{ transform: `scale(${zoom/100})` }}>
      <div className="winner-icon">
        <GhostSvg color={ColorHelper(colors, index)} isMax={true} />
      </div>
      <div className="winner-title">{'Winner'}</div>
      <div className="winner-address">
        {StringHelper.truncateAddress(winnerAddress)}
      </div>
      <div className="win-multiplier-section">
        <img src={Media.icons.thunder} alt="thunder" className="thunder-icon" />
        <div className="multiplier-text">{`${winMultiplier}X`}</div>
      </div>

      <div className="celebration-animation-container">
        <CelebrateAnimation />
      </div>
    </div>
  );
};

export default WheelWinner;
