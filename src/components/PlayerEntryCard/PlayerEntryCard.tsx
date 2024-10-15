import Media from '@/utils/constants/Media';
import StringHelper from '@/utils/helpers/StringHelper';
import { Color } from '@/utils/types';

import './PlayerEntryCard.scss';

type PlayerEntryCardType = {
  color: Color;
  percentage: number;
  entry: number;
};

const PlayerEntryCard = ({ color, percentage, entry }: PlayerEntryCardType) => {
  const percentageString = `${percentage.toFixed(2)}%`;
  const entryAmountString = `${StringHelper.numberWithComma(entry)}APT`;

  return (
    <div className="player-entry-card">
      <div className="color-bar" style={{ backgroundColor: color }} />
      <div className="percentage">{percentageString}</div>
      <div className="player-total-entry">
        <img className="tt-icon" src={Media.images.aptos} alt="APT" />
        <div className="entry-amount">{entryAmountString}</div>
      </div>
    </div>
  );
};

export default PlayerEntryCard;
