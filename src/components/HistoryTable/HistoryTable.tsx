import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import Table from '@/lib/Table/Table';
import TableTab from '@/components/TableTab/TableTab';
import Pagination from '@/components/Pagination/Pagination';

import ApiService from '@/utils/api/ApiService';
import HistoryTableMode from '@/utils/constants/HistoryTableMode';
import HistoryTableOptions from '@/utils/tables/HistoryTableOptions';
import { HistoryTableData } from '@/utils/types';

import './HistoryTable.scss';

const HistoryTable = () => {
  const [page, setPage] = useState<number | string>(1);
  const [tableData, setTableData] = useState<HistoryTableData[]>([]);
  const [tableMode, setTableMode] = useState(HistoryTableMode.completed);
  const [totalPage, setTotalPage] = useState(1);

  const { account } = useWallet();

  useEffect(() => {
    if (account === null) {
      return;
    }
    const fetchTableDataFunction =
      tableMode === HistoryTableMode.completed
        ? ApiService.game.getHistory
        : ApiService.game.getPlayerHistory;
    fetchTableDataFunction(account.address, page.toString()).then((res) => {
      setTableData(res.list);
      setTotalPage(res.pages);
    });
  }, [account, page, tableMode]);

  return (
    <div className="history-table">
      <div className="tabs">
        <TableTab
          isActive={tableMode === HistoryTableMode.completed}
          name={'COMPLETED'}
          onClick={() => {
            setTableMode(HistoryTableMode.completed);
            setPage(1);
          }}
        />
        <TableTab
          isActive={tableMode === HistoryTableMode.yourRounds}
          name={'YOUR ROUNDS'}
          onClick={() => {
            setTableMode(HistoryTableMode.yourRounds);
            setPage(1);
          }}
        />
      </div>
      <Table data={tableData} columns={HistoryTableOptions.columns} />
      <Pagination page={page} totalPages={totalPage} setPage={setPage} />
    </div>
  );
};

export default HistoryTable;
