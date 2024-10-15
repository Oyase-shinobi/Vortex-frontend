import { useSelector } from 'react-redux';

import GameTimerBar from '@/components/GameTimerBar/GameTimerBar';
import SpinWheel from '@/components/SpinWheel/SpinWheel';

import { RootState } from '@/store/store';

import Media from '@/utils/constants/Media';
import StringHelper from '@/utils/helpers/StringHelper';

import './SpinnerPanel.scss';

const SpinnerPanel = () => {
  const { prizePool } = useSelector((state: RootState) => state.gameSlice.game);

  const totalEntryString = `${StringHelper.numberWithComma(prizePool)}APT`;

  return (
    <div className="spinner-panel">
      <GameTimerBar />
      <div className="total-entry">
        <img src={Media.images.aptos} className="tt-icon" alt="APT" />
        <div>{totalEntryString}</div>
      </div>
      <SpinWheel />
    </div>
  );
};

export default SpinnerPanel;
