import { Link } from 'react-router-dom';

import FaqItem from '@/components/FaqItem/FaqItem';

import Faq from '@/utils/constants/Faq';
import Media from '@/utils/constants/Media';

import './Rules.scss';

const Rules = () => {
  return (
    <div className="rules">
      <div className="title-section">
        <div className="title">{'What is VORTEX? '}</div>
        <Link className="spin-button" to={'/'}>
          {'VORTEX'}
        </Link>
      </div>

      <div className="description-section">
        <div className="description-block">
          <div className="description-title">{'Spin. To. Win.'}</div>
          <div className="description-content">
            {'The landscape is a Vortex of opportunities and at the very center is our ultimate spin-to-win experience that will propel the bravest players to the very top of on-chain gaming.\n' +
              '\n' +
              'It’s all about walking away with that jackpot. Spin, earn points, and rake in those gains. Vortex is going to ignite the start of the next revolution.\n'}
          </div>
          <img
            className="description-tt"
            src={Media.gifs.spinVortex}
            alt="spin"
          />
          <img
            className="description-icon-list"
            src={Media.images.rules}
            alt="rules"
          />
        </div>
        <div className="faq-block">
          <div className="title">{'How does it work?'}</div>
          <div className="faq-list">
            {Faq.map((item) => (
              <FaqItem
                key={item.title}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
