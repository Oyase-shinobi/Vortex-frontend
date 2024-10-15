import { Link } from 'react-router-dom';

import Media from '@/utils/constants/Media';

import './HistoryButton.scss';

const HistoryButton = () => {
  return (
    <Link className="history-button" to="/history">
      <img className="history-icon" src={Media.icons.history} alt="history" />
      <div>{'HISTORY'}</div>
    </Link>
  );
};

export default HistoryButton;
