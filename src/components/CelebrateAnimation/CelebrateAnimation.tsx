import { useEffect, useState } from 'react';

import Media from '@/utils/constants/Media';

import './CelebrateAnimation.scss';

const CelebrateAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <img
        className="celebrate-animation"
        src={Media.gifs.prize}
        alt="celebrate animation"
      />
    )
  );
};

export default CelebrateAnimation;
