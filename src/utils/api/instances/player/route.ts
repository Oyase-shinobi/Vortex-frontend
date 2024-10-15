import ApiKey from '@/utils/api/ApiKey';
import PathHelper from '@/utils/helpers/PathHelper';

const getUnclaimedPrize = (address: `0x${string}`) =>
  PathHelper.createPath([ApiKey.player, ApiKey.prize, address]);
const getWinRecord = (address: `0x${string}`) =>
  PathHelper.createPath([ApiKey.player, ApiKey.win, address]);
const getFutureEntry = (address: `0x${string}`, round: number) =>
  PathHelper.createPath([
    ApiKey.player,
    ApiKey.future,
    address,
    round.toString(),
  ]);

export default {
  getUnclaimedPrize,
  getWinRecord,
  getFutureEntry,
};
