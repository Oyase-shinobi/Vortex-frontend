import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import Media from '@/utils/constants/Media';

import './VerifyCell.scss';

type VerifyCellType = {
  hash: string;
};

const VerifyCell = ({ hash }: VerifyCellType) => {
  const goToBlockExplorer = () => {
    window.open(
      `https://explorer.aptoslabs.com/txn/${hash}?network=testnet`,
      '_blank',
    );
  };

  if (hash === '' || hash === null || hash === undefined) {
    return null;
  }

  return (
    <ButtonDiv className="verify-cell" onClick={goToBlockExplorer}>
      <img src={Media.icons.verify} className="verify-icon" alt="Verify" />
    </ButtonDiv>
  );
};

export default VerifyCell;
