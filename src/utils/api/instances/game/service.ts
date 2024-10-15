import Route from './route';
import { getRequest } from '@/utils/api/axios/axiosMethod';

import GameStatus from '@/utils/dataModel/GameStatus';
import RoundWinner from '@/utils/dataModel/RoundWinner';
import EntryAndRoundDto from '@/utils/dataModel/dto/EntryAndRoundDto';
import { Color, HistoryTableData } from '@/utils/types';

const getGameStatus = () =>
  getRequest(Route.getGameStatus).then((res) => {
    const { data } = res;
    return new GameStatus(data);
  });

const getColors = () =>
  getRequest(Route.getColors).then((res) => {
    const { data } = res;
    return data.colors as Color[];
  });

const getWinnerByRound = (round: string) =>
  getRequest(Route.getWinnerByRound(round)).then((res) => {
    const { data } = res;
    return new RoundWinner(data);
  });

const getHistory = (address: string, page: string) =>
  getRequest(Route.getHistory(address, page)).then((res) => {
    const { data } = res;
    const result = data.result as EntryAndRoundDto[];
    const list = result.map((item) => {
      return {
        round: item.id,
        prizePool: Number(item.prize_pool),
        winner: item.winner_address,
        winnerEntry: Number(item.winner_entry),
        winnerMultiplier: item.winner_multiplier,
        finishAt: item.finish_at === null ? null : new Date(item.finish_at),
        playerCount: item.player_count,
        yourEntry: Number(item.player_entry),
        hash: item.finish_tx_hash,
      } as HistoryTableData;
    });
    return {
      list,
      pages: data.pages,
    };
  });

const getPlayerHistory = (address: string, page: string) =>
  getRequest(Route.getPlayerHistory(address, page)).then((res) => {
    const { data } = res;
    const result = data.result as EntryAndRoundDto[];
    const list = result.map((item) => {
      return {
        round: item.round,
        prizePool: Number(item.prize_pool),
        winner: item.winner_address,
        winnerEntry: Number(item.winner_entry),
        winnerMultiplier: item.winner_multiplier,
        finishAt: item.finish_at === null ? null : new Date(item.finish_at),
        playerCount: item.player_count,
        yourEntry: Number(item.player_entry),
        hash: item.finish_tx_hash,
      } as HistoryTableData;
    });
    return {
      list,
      pages: data.pages,
    };
  });

export default {
  getGameStatus,
  getColors,
  getWinnerByRound,
  getHistory,
  getPlayerHistory,
};
