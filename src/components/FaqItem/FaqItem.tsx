import { useState } from 'react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import Media from '@/utils/constants/Media';
import { FaqType } from '@/utils/constants/Faq';

import './FaqItem.scss';

const FaqItem = ({ title, content }: FaqType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const openClassname = isOpen ? 'open' : isClicked ? 'close' : '';

  return (
    <div className={`faq-item ${openClassname}`}>
      <ButtonDiv className="faq-title" onClick={toggleFaq}>
        <div>{title}</div>
        <img src={Media.icons.arrow} alt="arrow" className="arrow-icon" />
      </ButtonDiv>
      {isOpen && <div className="faq-content">{content}</div>}
    </div>
  );
};

export default FaqItem;
