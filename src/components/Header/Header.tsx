import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ConnectButtonModule from '@/components/ConnectButtonModule/ConnectButtonModule';

import { setGameMode } from '@/store/game/slice';

import GameMode from '@/utils/constants/GameMode';
import Media from '@/utils/constants/Media';
import NavInfo from '@/utils/constants/NavInfo';
import SocialMedia from '@/utils/constants/SocialMedia';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <Link
        className="logo"
        to={'/'}
        onClick={() => {
          dispatch(setGameMode(GameMode.view));
        }}
      >
        <img className="logo-icon" alt="logo" src={Media.images.logo} />
        <div className="logo-text">VORTEX</div>
      </Link>

      <div className="header-content">
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

        <div className="nav-list">
          {NavInfo.map((item) => (
            // TODO: change target...
            <Link
              className="nav-item"
              to={item.link}
              target={item.target}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="connect-button-section">
          <ConnectButtonModule />
        </div>
      </div>
    </div>
  );
};

export default Header;
