import Achievement from '@/components/Achievement/Achievement';
import HistoryTable from '@/components/HistoryTable/HistoryTable';
import UnclaimedWinnings from '@/components/UnclaimedWinnings/UnclaimedWinnings';

import './History.scss';

const History = () => {
  return (
    <div className="history">
      <div className="winnings-and-achievement">
        <UnclaimedWinnings />
        <Achievement />
      </div>
      <HistoryTable />
    </div>
  );
};

export default History;
