import Route from './route';
import { getRequest } from '@/utils/api/axios/axiosMethod';

import PlayerWinningStatus from '@/utils/dataModel/PlayerWinningStatus';
import FutureEntry from '@/utils/dataModel/FutureEntry';

const getUnclaimedPrize = (address: `0x${string}`) =>
  getRequest(Route.getUnclaimedPrize(address)).then((res) => {
    const { data } = res;
    return data.prize;
  });

const getWinRecord = (address: `0x${string}`) =>
  getRequest(Route.getWinRecord(address)).then((res) => {
    const { data } = res;
    return data as PlayerWinningStatus;
  });

const getFutureEntry = (address: `0x${string}`, round: number) =>
  getRequest(Route.getFutureEntry(address, round)).then((res) => {
    const { data } = res;
    return data as FutureEntry;
  });

export default {
  getUnclaimedPrize,
  getWinRecord,
  getFutureEntry,
};
