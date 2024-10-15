import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import GameMode from '@/utils/constants/GameMode';
import GameState from '@/utils/constants/GameState';

import Colors from '@/utils/constants/Colors';
import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import RoundWinner from '@/utils/dataModel/RoundWinner';
import { Color } from '@/utils/types';

export interface GameStateType {
  gameMode: GameMode;
  gameState: GameState | null;
  round: number | null;
  lastRoundTimeStamp: string | null;
  prizePool: number | null;
  playerEntryList: PlayerEntry[];
  watching: number;
  userEntry: number | null;
  userRound: number;
  winnerAddress: `0x${string}` | null;
  roundWinner: RoundWinner | null;
  countdown: number;
  colors: Color[];
  roundInfoTimestamp: number;
}

const gameSliceDefaultState: GameStateType = {
  gameMode: GameMode.view,
  gameState: GameState.idle,
  round: null,
  lastRoundTimeStamp: null,
  prizePool: 0,
  playerEntryList: [],
  watching: 1,
  userEntry: null,
  userRound: 1,
  winnerAddress: null,
  roundWinner: null,
  countdown: 0,
  colors: Colors,
  roundInfoTimestamp: Date.now(),
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: gameSliceDefaultState,
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
      return;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
      return;
    },
    setRoundInfo: (state, action) => {
      if (
        state.gameState !== GameState.idle &&
        state.lastRoundTimeStamp !== null
      ) {
        if (state.roundInfoTimestamp < Date.now() - 120_000) {
          state.round = action.payload.round;
          state.gameState = GameState.idle;
          state.roundInfoTimestamp = Date.now();
        }
        state.lastRoundTimeStamp = action.payload.lastRoundTimeStamp;
        return;
      }
      state.round = action.payload.round;
      state.lastRoundTimeStamp = action.payload.lastRoundTimeStamp;
      state.roundInfoTimestamp = Date.now();
      return;
    },
    setWatching: (state, action) => {
      state.watching = action.payload;
      return;
    },
    setPlayerEntryList: (state, action) => {
      if (state.gameState !== GameState.idle && state.prizePool !== 0) {
        return;
      }
      state.playerEntryList = action.payload;
      state.prizePool = action.payload.reduce(
        (accum: number, item: PlayerEntry) => accum + Number(item.entry),
        0,
      );
      return;
    },
    setUserEntry: (state, action) => {
      state.userEntry = action.payload;
      return;
    },
    setUserRound: (state, action) => {
      state.userRound = action.payload;
      return;
    },
    setRoundWinner: (state, action) => {
      state.roundWinner = action.payload;
      if (action.payload === null) {
        state.winnerAddress = null;
        return;
      }
      if (!action.payload.isWinner) {
        state.winnerAddress = null;
        state.gameState = GameState.idle;
        return;
      }
      if (action.payload.isWinner) {
        state.winnerAddress = action.payload.winnerAddress;
        return;
      }
      state.winnerAddress = null;
      return;
    },
    resetRoundWinner: (state) => {
      state.roundWinner = null;
      state.winnerAddress = null;
    },
    setCountdown: (state, action) => {
      if (
        state.gameState === GameState.selecting ||
        state.gameState === GameState.complete
      ) {
        state.countdown = 0;
        return;
      }
      if (state.gameState === GameState.idle && action.payload <= 0) {
        state.gameState = GameState.selecting;
      }
      state.countdown = action.payload;
      return;
    },
    resetGameState: (state) => {
      state.gameMode = gameSliceDefaultState.gameMode;
      state.gameState = gameSliceDefaultState.gameState;
      state.round = gameSliceDefaultState.round;
      state.lastRoundTimeStamp = gameSliceDefaultState.lastRoundTimeStamp;
      state.prizePool = gameSliceDefaultState.prizePool;
      state.playerEntryList = gameSliceDefaultState.playerEntryList;
      state.watching = gameSliceDefaultState.watching;
      state.userEntry = gameSliceDefaultState.userEntry;
      state.userRound = gameSliceDefaultState.userRound;
      state.winnerAddress = gameSliceDefaultState.winnerAddress;
      state.roundWinner = gameSliceDefaultState.roundWinner;
      state.countdown = gameSliceDefaultState.countdown;
      return;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
      return;
    },
  },
});

export const {
  setGameMode,
  setGameState,
  setRoundInfo,
  setWatching,
  setPlayerEntryList,
  setUserEntry,
  setUserRound,
  setRoundWinner,
  resetRoundWinner,
  setCountdown,
  resetGameState,
  setColors,
} = gameSlice.actions;

export default combineReducers({
  game: gameSlice.reducer,
});
