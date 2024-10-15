import Media from '@/utils/constants/Media';

type SocialMediaType = {
  name: string;
  link: string;
  imagePath: string;
  hoverImagePath: string;
};

const navInfo: SocialMediaType[] = [
  {
    name: 'Telegram',
    link: '',
    imagePath: Media.icons.telegram,
    hoverImagePath: Media.icons.telegramHover,
  },
  {
    name: 'X',
    link: 'https://x.com/VortexGameWeb3',
    imagePath: Media.icons.twitter,
    hoverImagePath: Media.icons.twitterHover,
  },
  // {
  //   name: 'Discord',
  //   link: '',
  //   imagePath: Media.icons.discord,
  //   hoverImagePath: Media.icons.discordHover,
  // },
];

export default navInfo;
