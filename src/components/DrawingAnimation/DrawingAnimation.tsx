import Media from '@/utils/constants/Media';

import './DrawingAnimation.scss';

const DrawingAnimation = () => {
  return (
    <img
      className="drawing-animation"
      src={Media.gifs.lightning}
      alt="Lighting"
    />
  );
};

export default DrawingAnimation;
