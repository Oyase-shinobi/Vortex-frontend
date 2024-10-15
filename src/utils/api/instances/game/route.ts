import ApiKey from '@/utils/api/ApiKey';
import PathHelper from '@/utils/helpers/PathHelper';

const getGameStatus = PathHelper.createPath([ApiKey.game, ApiKey.status]);
const getColors = PathHelper.createPath([ApiKey.game, ApiKey.colors]);
const getWinnerByRound = (round: string) =>
  PathHelper.createPath([ApiKey.game, ApiKey.winner, round]);
const getHistory = (address: string, page: string) =>
  PathHelper.createPath([ApiKey.game, ApiKey.history, address, page]);
const getPlayerHistory = (address: string, page: string) =>
  PathHelper.createPath([ApiKey.game, ApiKey.myHistory, address, page]);

export default {
  getGameStatus,
  getColors,
  getWinnerByRound,
  getHistory,
  getPlayerHistory,
};
