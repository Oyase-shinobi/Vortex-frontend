import PlayerEntry from '@/utils/dataModel/PlayerEntry';

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

// export interface PlayerEntry {
//   address: `0x${string}`;
//   value: number;
// }

export interface PlayerEntryWithIndex extends PlayerEntry {
  index: number;
}

export interface EntryInfo {
  entry: number;
  ratio: number;
}

export interface HistoryData {
  round: number;
  prizePool: number;
  winner: `0x${string}`;
  winnerEntry: EntryInfo;
  winnerMultiplier: number;
  finish: Date;
  playerEntryList: { address: string; value: number }[];
  players: number;
  yourEntry: EntryInfo | null;
  hash: string;
}

export interface HistoryTableData {
  round: number;
  prizePool: number;
  winner: `0x${string}` | '';
  winnerEntry: number;
  winnerMultiplier: number | string;
  finishAt: Date;
  playerCount: number;
  yourEntry: number;
  hash: string;
}
