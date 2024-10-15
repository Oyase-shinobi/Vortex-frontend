class PlayerEntry {
  round: string;
  entry: string;
  entryTime: string;
  player: string;
  index: number;

  constructor({ round, entry, entryTime, player, index }: PlayerEntry) {
    this.round = round;
    this.entry = entry;
    this.entryTime = entryTime;
    this.player = player;
    this.index = index;
  }
}

export default PlayerEntry;
