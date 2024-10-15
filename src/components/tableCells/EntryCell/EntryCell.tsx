import Media from '@/utils/constants/Media';
import StringHelper from '@/utils/helpers/StringHelper';

import './EntryCell.scss';

type EntryCellType = {
  entry: number;
  ratio: number;
};

const EntryCell = ({ entry, ratio }: EntryCellType) => {
  const entryInfoString = () => {
    return `${StringHelper.numberWithComma(entry)}APT\n(${ratio.toFixed(2)}%)`;
  };

  if (entry === null) {
    return <div>{'-'}</div>;
  }

  return (
    <div className="entry-cell">
      <img src={Media.images.aptos} className="tt-icon" alt="tt-icon" />
      <div className="entry-info">{entryInfoString()}</div>
    </div>
  );
};

export default EntryCell;
