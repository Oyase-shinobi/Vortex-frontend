import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import Media from '@/utils/constants/Media';

import './Players.scss';

const Players = () => {
  const { playerEntryList } = useSelector(
    (state: RootState) => state.gameSlice.game,
  );

  return (
    <div className="players">
      <div className="player-count">{`${playerEntryList.length} PLAYERS`}</div>
      <img src={Media.icons.players} alt="players" className="players-icon" />
    </div>
  );
};

export default Players;
