import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';
import ConnectButtonModule from '@/components/ConnectButtonModule/ConnectButtonModule';

import { setGameMode } from '@/store/game/slice';

import GameMode from '@/utils/constants/GameMode';
import Media from '@/utils/constants/Media';
import NavInfo from '@/utils/constants/NavInfo';
import SocialMedia from '@/utils/constants/SocialMedia';
import useWindowSize from '@/utils/hooks/useWindowSize';

import './HeaderMobile.scss';

const HeaderMobile = () => {
  const dispatch = useDispatch();
  const { isWindowSmall } = useWindowSize();
  const { connected, disconnect } = useWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isWindowSmall) {
      setIsMenuOpen(false);
    }
  }, [isWindowSmall]);

  return (
    <div className="header-mobile">
      <div className="top-section">
        <Link
          className="logo"
          to={'/'}
          onClick={() => {
            dispatch(setGameMode(GameMode.view));
            setIsMenuOpen(false);
          }}
        >
          <img className="logo-icon" alt="logo" src={Media.images.logo} />
          <div className="logo-text">VORTEX</div>
        </Link>

        <div className="connect-wallet-container">
          <ConnectButtonModule />
        </div>

        <ButtonDiv className="icon-container" onClick={toggleMenu}>
          <img
            src={isMenuOpen ? Media.icons.closeSmall : Media.icons.menu}
            alt="icon"
            className="icon"
          />
        </ButtonDiv>
      </div>

      {isMenuOpen && (
        <>
          <div className="header-content">
            <div className="nav-list">
              {NavInfo.map((item) => (
                // TODO: change target...
                <Link
                  className="nav-item"
                  to={item.link}
                  target={item.target}
                  key={item.name}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {connected && (
              <ButtonDiv
                className="disconnect-button"
                onClick={async () => {
                  disconnect();
                  setIsMenuOpen(false);
                }}
              >
                {'Disconnect'}
              </ButtonDiv>
            )}

            <div className="social-list">
              {SocialMedia.map((item) => (
                <a
                  className="social-icon"
                  href={item.link}
                  target="_blank"
                  key={item.name}
                >
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className="social-icon-normal"
                  />
                  <img
                    src={item.hoverImagePath}
                    alt={item.name}
                    className="social-icon-hover"
                  />
                </a>
              ))}
            </div>
          </div>

          <ButtonDiv className="backdrop" onClick={toggleMenu} />
        </>
      )}
    </div>
  );
};

export default HeaderMobile;
