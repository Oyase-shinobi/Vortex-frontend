import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import Media from '@/utils/constants/Media';
import StringHelper from '@/utils/helpers/StringHelper';

import './QuickEntrySelection.scss';

type QuickEntrySelectionType = {
  entryAmount: number;
  handleOnClick: (value: number) => void;
};

const QuickEntrySelection = ({
  entryAmount,
  handleOnClick,
}: QuickEntrySelectionType) => {
  const entryAmountString = StringHelper.numberWithComma(entryAmount);

  return (
    <ButtonDiv
      className="quick-entry-selection"
      onClick={() => {
        handleOnClick(entryAmount);
      }}
    >
      <img src={Media.images.aptos} className="tt-icon" alt="tt-icon" />
      <div className="entry-amount">{`${entryAmountString}APT`}</div>
    </ButtonDiv>
  );
};

export default QuickEntrySelection;
