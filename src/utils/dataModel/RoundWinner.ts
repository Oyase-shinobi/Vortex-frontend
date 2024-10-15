class RoundWinner {
  isComplete: boolean;
  isWinner?: boolean;
  winnerAddress?: string;
  round?: number;

  constructor({ isComplete, isWinner, winnerAddress, round }: RoundWinner) {
    this.isComplete = isComplete;
    this.isWinner = isWinner ?? false;
    this.winnerAddress = winnerAddress ?? '';
    this.round = round ?? -1;
  }
}

export default RoundWinner;
