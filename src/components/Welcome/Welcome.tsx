import { useContext, useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import LocalStorageKeys from '@/utils/constants/LocalStorageKeys';
import Media from '@/utils/constants/Media';
import { ModalContext } from '@/utils/contexts/ModalContext/ModalContext';

import './Welcome.scss';

const Welcome = () => {
  let timerId: NodeJS.Timeout | null = null;

  const { setIsOpenWelcome } = useContext(ModalContext);
  const [showWelcome, saveShowWelcome] = useSessionStorage(
    LocalStorageKeys.showedWelcome,
    false,
  );

  const [countdown, setCountdown] = useState(5);
  const [showElement, setShowElement] = useState(!showWelcome);
  const [startAnimation, setStartAnimation] = useState(false);

  const animationClassname = useMemo(() => {
    return startAnimation ? 'fade' : '';
  }, [startAnimation]);

  useEffect(() => {
    setIsOpenWelcome(showElement);
  }, [showElement]);

  useEffect(() => {
    timerId = setInterval(() => {
      setCountdown((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerId!);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerId!);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 1) {
      setStartAnimation(true);
      return;
    }
    if (countdown <= 0) {
      saveShowWelcome(true);
      setShowElement(false);
    }
  }, [countdown]);

  const handlePlayButtonOnClicked = () => {
    if (timerId) {
      clearInterval(timerId!);
    }
    saveShowWelcome(true);
    setShowElement(false);
  };

  return showElement ? (
    <div className={`welcome ${animationClassname}`}>
      <div className="welcome-content">
        <img src={Media.gifs.vertex} alt="logo" className="logo" />
        <div className="title">{'VORTEX'}</div>
        <div className="sub-title">{'The Winner Takes It All'}</div>
        <ButtonDiv className="play-button" onClick={handlePlayButtonOnClicked}>
          {"Let's play!"}
        </ButtonDiv>
        <div className="start-game-count">{`Enter the game in ${countdown}s...`}</div>
      </div>
      <img src={Media.gifs.welcome} className="welcome-gif" alt="welcome-gif" />
    </div>
  ) : null;
};

export default Welcome;
