import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import Media from '@/utils/constants/Media';

import './Round.scss';

const Round = () => {
  const { round } = useSelector((state: RootState) => state.gameSlice.game);

  return (
    <div className="round">
      <img className="round-icon" src={Media.icons.round} alt="round" />
      <div>{`ROUND ${round ?? ''}`}</div>
    </div>
  );
};

export default Round;
