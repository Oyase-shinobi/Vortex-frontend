import PlayerEntry from '@/utils/dataModel/PlayerEntry';
import NumberHelper from '@/utils/helpers/NumberHelper';

class GameStatus {
  round: number;
  players: number;
  prize: bigint;
  entryList: PlayerEntry[];
  lastRoundTime: bigint;

  constructor({
    round,
    players,
    prize,
    entryList,
    lastRoundTime,
  }: {
    round: string;
    prize: string;
    players: string;
    entryList: PlayerEntry[];
    lastRoundTime: string;
  }) {
    this.round = parseInt(round);
    this.players = parseInt(players);
    this.prize = BigInt(prize);
    this.lastRoundTime = BigInt(lastRoundTime);
    this.entryList = entryList.map((item) => ({
      ...item,
      entry: NumberHelper.formatAptos(BigInt(item.entry)),
    }));
  }
}

export default GameStatus;
