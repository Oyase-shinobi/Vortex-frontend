import { createColumnHelper } from '@tanstack/table-core';

import DateCell from '@/components/tableCells/DateCell/DateCell';
import EntryCell from '@/components/tableCells/EntryCell/EntryCell';
import PrizePoolCell from '@/components/tableCells/PrizePoolCell/PrizePoolCell';
import VerifyCell from '@/components/tableCells/VerifyCell/VerifyCell';

import StringHelper from '@/utils/helpers/StringHelper';
import NumberHelper from '@/utils/helpers/NumberHelper';
import { HistoryTableData } from '@/utils/types';

class HistoryTableOptions {
  static columnHelper = createColumnHelper<HistoryTableData>();

  static columns = [
    this.columnHelper.accessor('round', {
      cell: (info) => info.getValue(),
      header: () => <span>ROUND</span>,
    }),
    this.columnHelper.accessor('prizePool', {
      cell: (info) => <PrizePoolCell value={info.getValue()} />,
      header: () => <span>PRIZE POOL</span>,
    }),
    this.columnHelper.accessor('winner', {
      cell: (info) => {
        const value = info.getValue();
        if (value === undefined || value === '') {
          return 'No winner';
        }
        return StringHelper.truncateAddress(info.getValue());
      },
      header: () => <span>WINNER</span>,
    }),
    this.columnHelper.accessor('winnerEntry', {
      cell: (info) => {
        const entry = Number(NumberHelper.formatAptos(BigInt(info.getValue())));
        const prizePool = Number(
          NumberHelper.formatAptos(BigInt(info.row.getValue('prizePool'))),
        );
        const ratio = prizePool === 0 ? 0 : (entry * 100) / prizePool;
        return <EntryCell entry={entry} ratio={ratio} />;
      },
      header: () => <span>ENTRIES</span>,
    }),
    this.columnHelper.accessor('winnerMultiplier', {
      cell: (info) => {
        const value = info.getValue();
        if (value === '' || value === 0) {
          return '-';
        }
        return `${Number(value).toFixed(2)}X`;
      },
      header: () => <span>WIN</span>,
    }),
    this.columnHelper.accessor('yourEntry', {
      cell: (info) => {
        const entry = Number(NumberHelper.formatAptos(BigInt(info.getValue())));
        const prizePool = Number(
          NumberHelper.formatAptos(BigInt(info.row.getValue('prizePool'))),
        );
        const ratio = prizePool === 0 ? 0 : (entry * 100) / prizePool;
        return <EntryCell entry={entry} ratio={ratio} />;
      },
      header: () => <span>YOUR ENTRIES</span>,
    }),
    this.columnHelper.accessor('finishAt', {
      cell: (info) => <DateCell value={info.getValue()} />,
      header: () => <span>FINISH</span>,
    }),
    this.columnHelper.accessor('playerCount', {
      cell: (info) => info.getValue(),
      header: () => <span>PLAYERS</span>,
    }),
    this.columnHelper.accessor('hash', {
      cell: (info) => <VerifyCell hash={info.getValue()} />,
      header: () => <span>VERIFY</span>,
    }),
  ];
}

export default HistoryTableOptions;
