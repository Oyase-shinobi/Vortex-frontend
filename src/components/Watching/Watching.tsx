import { useSelector } from 'react-redux';

import Media from '@/utils/constants/Media';

import { RootState } from '@/store/store';

import './Watching.scss';

const Watching = () => {
  const { watching } = useSelector((state: RootState) => state.gameSlice.game);

  return (
    <div className="watching">
      <div className="watching-count">{`${watching} WATCHING`}</div>
      <img
        src={Media.icons.watching}
        alt="watching"
        className="watching-icon"
      />
    </div>
  );
};

export default Watching;
