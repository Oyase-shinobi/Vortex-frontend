export type FaqType = {
  title: string;
  content: string;
};

const faqList: FaqType[] = [
  {
    title: 'What Network is Vortex on?',
    content:
      'Currently, Vortex is looking to be set up on the Aptos network. The team at Vortex is also seeking to expand to other networks in the future!',
  },
  {
    title: 'Is there a fee for playing?',
    content:
      'A 1% protocol fee will be taken when you claim your winnings. This fee will be dedicated to the growth of Vortex and the ecosystem we are trying to grow.',
  },
  {
    title: 'How do I get started? ',
    content:
      'First, head over to the Vortex website. Simply connect your wallet, place your bet and spin away. Remember that, currently, Vortex accepts only APT so you will need to have sufficient APT to start playing.',
  },
  {
    title: 'How does each round work?',
    content:
      'There will be a timer counting down to the start of each round. Players can join during this period and place their bets. Once the timer reaches zero, the game will begin where the wheel will be spun and a winner will be chosen. For even more detail on how Vortex works, head to our documentation section.',
  },
  {
    title: 'What are my chances of winning?',
    content:
      'Your chances of winning are in direct correlation to how much you bet. The more you throw down the more likely you are to win.',
  },
  {
    title: 'Is Vortex fair?',
    content:
      'Currently, Vortex utilizes the built-in randomizer on the Aptos testnet for picking a winner. We are aiming to utilize VRF when we launch on the Aptos mainnet with the current choice of pick being ThunderCore’s VRF model.',
  },
];

export default faqList;
