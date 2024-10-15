import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import ApiService from '@/utils/api/ApiService';
import Media from '@/utils/constants/Media';

import './Achievement.scss';

const Achievement = () => {
  const [wins, setWins] = useState<string | number>(0);
  const [highestWins, setHighestWins] = useState<string | number>('0');

  const { account } = useWallet();

  useEffect(() => {
    if (account === null) {
      return;
    }
    ApiService.player
      .getWinRecord(account.address as `0x${string}`)
      .then((res) => {
        setWins(res.winCount);
        setHighestWins(Number(res.highestWin).toFixed(2));
      });
  }, [account]);

  return (
    <div className="achievement">
      <div className="title">{'Your Achievement'}</div>

      <div className="achievement-list">
        <div className="achievement-item">
          <img className="achievement-icon" src={Media.icons.wins} alt="wins" />
          <div className="achievement-content">
            <div className="achievement-amount">{wins}</div>
            <div className="achievement-title">{'WINS'}</div>
          </div>
        </div>

        <div className="achievement-item">
          <img
            className="achievement-icon"
            src={Media.icons.highestWins}
            alt="wins"
          />
          <div className="achievement-content">
            <div className="achievement-amount">{`${highestWins}X`}</div>
            <div className="achievement-title">{'HIGHEST WIN'}</div>
          </div>
        </div>

        <Link className="spin-button" to={'/'}>
          {'VORTEX'}
        </Link>
      </div>
    </div>
  );
};

export default Achievement;
