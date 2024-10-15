import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import Media from '@/utils/constants/Media';

import './Loading.scss';

const Loading = () => {
  const { isLoading } = useSelector(
    (state: RootState) => state.loadingSlice.loading,
  );

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading">
      <img src={Media.gifs.loading} className="loading-icon" alt="loading" />
    </div>
  );
};

export default Loading;
