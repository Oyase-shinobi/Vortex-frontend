import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [width, setWidth] = useState<number>(0);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return { width, isWindowSmall: width <= 1200 };
}
