type NavInfoType = {
  name: string;
  link: string;
  target: string;
};

const navInfo: NavInfoType[] = [
  {
    name: 'Rules',
    link: '/rules',
    target: '_self',
  },
  {
    name: 'Docs',
    link: 'https://vortexgameofficial.gitbook.io/vortexgameofficial',
    target: '_blank',
  },
  {
    name: 'Claim',
    link: '/history',
    target: '_self',
  },
];

export default navInfo;
