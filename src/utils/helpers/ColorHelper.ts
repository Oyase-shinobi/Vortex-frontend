import Colors from '@/utils/constants/Colors';
import { Color } from '@/utils/types';

const getColors = (colors: Color[], index: number): Color => {
  if (index > Colors.length) {
    return getColors(colors, index % Colors.length);
  }
  return colors[index];
};

export default getColors;
