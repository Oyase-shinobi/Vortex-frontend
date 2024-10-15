import ApiService from '@/utils/api/ApiService';
import PriceHelper from '@/utils/helpers/PriceHelper';

import store from '@/store/store';
import {
  setCountdown,
  setPlayerEntryList,
  setRoundInfo,
} from '@/store/game/slice';
import { setCoinPrice } from '@/store/coinPrice/slice';

let countdownId: NodeJS.Timeout | null = null;
let statusId: NodeJS.Timeout | null = null;
let priceId: NodeJS.Timeout | null = null;

const pollCountdown = async () => {
  const lastRoundTimeStamp = store.getState().gameSlice.game.lastRoundTimeStamp;
  if (!lastRoundTimeStamp) return;
  const now = Date.now();
  const nextRoundStartTimeStamp = (Number(lastRoundTimeStamp) + 90) * 1000;
  const countdown = Math.floor((nextRoundStartTimeStamp - now) / 1000);
  store.dispatch(setCountdown(countdown < 0 ? 0 : countdown));
};

const pollGameStatus = async () => {
  const gameStatus = await ApiService.game.getGameStatus();
  store.dispatch(setPlayerEntryList(gameStatus.entryList));
  store.dispatch(
    setRoundInfo({
      round: gameStatus.round,
      lastRoundTimeStamp: gameStatus.lastRoundTime.toString(),
    }),
  );
};

const pollCoinPrice = async () => {
  const price = await PriceHelper.getPrice();
  store.dispatch(setCoinPrice(price));
};

const startPolling = () => {
  pollCoinPrice().then(() => {});
  countdownId = setInterval(pollCountdown, 1_000);
  statusId = setInterval(pollGameStatus, 2_000);
  priceId = setInterval(pollCoinPrice, 60_000);
};

export const stopPolling = () => {
  if (countdownId !== null) {
    clearInterval(countdownId);
  }
  if (statusId !== null) {
    clearInterval(statusId);
  }
  if (priceId !== null) {
    clearInterval(priceId);
  }
};

export default startPolling;
