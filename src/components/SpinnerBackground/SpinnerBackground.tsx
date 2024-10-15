import Media from '@/utils/constants/Media';

import './SpinnerBackground.scss';

const SpinnerBackground = () => {
  return (
    <img
      className="spinner-background"
      src={Media.images.background}
      alt="Background"
    />
  );
};

export default SpinnerBackground;
