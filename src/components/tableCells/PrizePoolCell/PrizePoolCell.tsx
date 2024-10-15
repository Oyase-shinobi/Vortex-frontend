import Media from '@/utils/constants/Media';
import NumberHelper from '@/utils/helpers/NumberHelper';
import StringHelper from '@/utils/helpers/StringHelper';

import './PrizePoolCell.scss';

type PrizePoolCell = {
  value: number;
};

const PrizePoolCell = ({ value }: PrizePoolCell) => {
  const prizePoolString = StringHelper.numberWithComma(
    Number(NumberHelper.formatAptos(BigInt(value))),
  );

  return (
    <div className="prize-pool-cell">
      <img src={Media.images.aptos} className="tt-icon" alt="tt-icon" />
      <div>{`${prizePoolString}APT`}</div>
    </div>
  );
};

export default PrizePoolCell;
