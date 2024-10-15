import { Color } from '@/utils/types';

import useWindowSize from '@/utils/hooks/useWindowSize';

type GhostSvgType = {
  color: Color;
  isLarge?: boolean;
  isMax?: boolean;
};

const GhostSvg = ({ color, isLarge, isMax }: GhostSvgType) => {
  const { isWindowSmall } = useWindowSize();

  if (isMax) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="108"
        height="100"
        viewBox="0 0 108 100"
        fill="none"
      >
        <path
          d="M5.98011 81.25H0V87.5H5.98011V93.75H71.7699V87.5H83.733V81.25H89.7131V75H95.6932V62.5H101.676V37.5H95.6932V25H89.7131V18.75H83.733V12.5H71.7699V6.25H41.8665V12.5H29.9062V18.75H23.9233V25H17.9432V37.5H11.9631V62.5H17.9432V75H23.9233V81.25H29.9062V87.5H23.9233V81.25H17.9432V75H5.98011V81.25ZM83.733 62.5H71.7699V50H83.733V62.5ZM71.7699 43.75H65.7898V31.25H71.7699V43.75ZM89.7131 43.75H83.733V31.25H89.7131V43.75Z"
          fill={color}
        />
        <path d="M71.7699 93.75H5.98013V100H71.7699V93.75Z" fill="white" />
        <path d="M5.98011 87.5H0V93.75H5.98011V87.5Z" fill="white" />
        <path d="M83.733 87.5H71.7699V93.75H83.733V87.5Z" fill="white" />
        <path d="M29.9062 81.25H23.9233V87.5H29.9062V81.25Z" fill="white" />
        <path d="M89.7131 81.25H83.7329V87.5H89.7131V81.25Z" fill="white" />
        <path d="M5.98011 75H0V81.25H5.98011V75Z" fill="white" />
        <path d="M23.9233 75H17.9432V81.25H23.9233V75Z" fill="white" />
        <path d="M95.6932 75H89.7131V81.25H95.6932V75Z" fill="white" />
        <path
          d="M17.9432 75H5.98013V68.75H11.9631V62.5H17.9432V75Z"
          fill="white"
        />
        <path d="M101.676 62.5H95.6932V75H101.676V62.5Z" fill="white" />
        <path d="M83.733 50H71.7699V62.5H83.733V50Z" fill="white" />
        <path d="M107.656 37.5H101.676V62.5H107.656V37.5Z" fill="white" />
        <path d="M11.9631 37.5H5.98013V62.5H11.9631V37.5Z" fill="white" />
        <path d="M89.7131 31.25H83.7329V43.75H89.7131V31.25Z" fill="white" />
        <path d="M17.9432 25H11.9631V37.5H17.9432V25Z" fill="white" />
        <path d="M71.7698 31.25H65.7897V43.75H71.7698V31.25Z" fill="white" />
        <path d="M101.676 25H95.6932V37.5H101.676V25Z" fill="white" />
        <path d="M23.9233 18.75H17.9432V25H23.9233V18.75Z" fill="white" />
        <path d="M95.6932 18.75H89.7131V25H95.6932V18.75Z" fill="white" />
        <path d="M29.9062 12.5H23.9233V18.75H29.9062V12.5Z" fill="white" />
        <path d="M89.7131 12.5H83.7329V18.75H89.7131V12.5Z" fill="white" />
        <path d="M41.8665 6.25H29.9062V12.5H41.8665V6.25Z" fill="white" />
        <path d="M83.733 6.25H71.7699V12.5H83.733V6.25Z" fill="white" />
        <path d="M71.7699 0H41.8665V6.25H71.7699V0Z" fill="white" />
      </svg>
    );
  }

  if (isWindowSmall) {
    return isLarge ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="50"
        viewBox="0 0 54 50"
        fill="none"
      >
        <path
          d="M2.99006 40.625H0V43.75H2.99006V46.875H35.8849V43.75H41.8665V40.625H44.8565V37.5H47.8466V31.25H50.8381V18.75H47.8466V12.5H44.8565V9.375H41.8665V6.25H35.8849V3.125H20.9332V6.25H14.9531V9.375H11.9616V12.5H8.97159V18.75H5.98153V31.25H8.97159V37.5H11.9616V40.625H14.9531V43.75H11.9616V40.625H8.97159V37.5H2.99006V40.625ZM41.8665 31.25H35.8849V25H41.8665V31.25ZM35.8849 21.875H32.8949V15.625H35.8849V21.875ZM44.8565 21.875H41.8665V15.625H44.8565V21.875Z"
          fill={color}
        />
        <path d="M35.8849 46.875H2.98999V50H35.8849V46.875Z" fill="white" />
        <path d="M2.99006 43.75H0V46.875H2.99006V43.75Z" fill="white" />
        <path d="M41.8665 43.75H35.885V46.875H41.8665V43.75Z" fill="white" />
        <path d="M14.9531 40.625H11.9617V43.75H14.9531V40.625Z" fill="white" />
        <path d="M44.8565 40.625H41.8665V43.75H44.8565V40.625Z" fill="white" />
        <path d="M2.99006 37.5H0V40.625H2.99006V37.5Z" fill="white" />
        <path d="M11.9617 37.5H8.97168V40.625H11.9617V37.5Z" fill="white" />
        <path d="M47.8465 37.5H44.8564V40.625H47.8465V37.5Z" fill="white" />
        <path
          d="M8.97152 37.5H2.98999V34.375H5.98147V31.25H8.97152V37.5Z"
          fill="white"
        />
        <path d="M50.8382 31.25H47.8467V37.5H50.8382V31.25Z" fill="white" />
        <path d="M41.8665 25H35.885V31.25H41.8665V25Z" fill="white" />
        <path d="M53.8282 18.75H50.8381V31.25H53.8282V18.75Z" fill="white" />
        <path d="M5.98147 18.75H2.98999V31.25H5.98147V18.75Z" fill="white" />
        <path d="M44.8565 15.625H41.8665V21.875H44.8565V15.625Z" fill="white" />
        <path d="M8.9715 12.5H5.98145V18.75H8.9715V12.5Z" fill="white" />
        <path d="M35.8851 15.625H32.895V21.875H35.8851V15.625Z" fill="white" />
        <path d="M50.8382 12.5H47.8467V18.75H50.8382V12.5Z" fill="white" />
        <path d="M11.9617 9.375H8.97168V12.5H11.9617V9.375Z" fill="white" />
        <path d="M47.8465 9.375H44.8564V12.5H47.8465V9.375Z" fill="white" />
        <path d="M14.9531 6.25H11.9617V9.375H14.9531V6.25Z" fill="white" />
        <path d="M44.8565 6.25H41.8665V9.375H44.8565V6.25Z" fill="white" />
        <path d="M20.9332 3.125H14.9531V6.25H20.9332V3.125Z" fill="white" />
        <path d="M41.8665 3.125H35.885V6.25H41.8665V3.125Z" fill="white" />
        <path d="M35.8848 0H20.9331V3.125H35.8848V0Z" fill="white" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
      >
        <g>
          <path d="M1.0525 14.3H0V15.4H1.0525V14.3Z" fill="white" />
          <path
            d="M2.10523 14.3H1.05273V15.4H2.10523V16.5H13.6842V15.4H15.7897V14.3H16.8422V13.2H17.8947V11H18.9477V6.60004H17.8947V4.40004H16.8422V3.30004H15.7897V2.20004H13.6842V1.10004H8.42123V2.20004H6.31623V3.30004H5.26323V4.40004H4.21073V6.60004H3.15823V11H4.21073V13.2H5.26323V14.3H6.31623V15.4H5.26323V14.3H4.21073V13.2H2.10523V14.3ZM15.7897 11H13.6842V8.80004H15.7897V11ZM13.6842 7.70004H12.6317V5.50004H13.6842V7.70004ZM16.8422 7.70004H15.7897V5.50004H16.8422V7.70004Z"
            fill={color}
          />
          <path
            d="M13.6845 16.5001H2.10547V17.6001H13.6845V16.5001Z"
            fill="white"
          />
          <path
            d="M2.10523 15.4001H1.05273V16.5001H2.10523V15.4001Z"
            fill="white"
          />
          <path
            d="M15.7896 15.4001H13.6841V16.5001H15.7896V15.4001Z"
            fill="white"
          />
          <path d="M6.31618 14.3H5.26318V15.4H6.31618V14.3Z" fill="white" />
          <path d="M16.8421 14.3H15.7896V15.4H16.8421V14.3Z" fill="white" />
          <path
            d="M2.10523 13.2001H1.05273V14.3001H2.10523V13.2001Z"
            fill="white"
          />
          <path
            d="M5.26344 13.2001H4.21094V14.3001H5.26344V13.2001Z"
            fill="white"
          />
          <path
            d="M17.8948 13.2001H16.8423V14.3001H17.8948V13.2001Z"
            fill="white"
          />
          <path
            d="M4.21097 13.2001H2.10547V12.1001H3.15847V11.0001H4.21097V13.2001Z"
            fill="white"
          />
          <path
            d="M18.9475 11.0001H17.8945V13.2001H18.9475V11.0001Z"
            fill="white"
          />
          <path d="M15.7896 8.80005H13.6841V11H15.7896V8.80005Z" fill="white" />
          <path d="M20.0003 6.60004H18.9478V11H20.0003V6.60004Z" fill="white" />
          <path d="M3.15847 6.60004H2.10547V11H3.15847V6.60004Z" fill="white" />
          <path
            d="M16.8421 5.50006H15.7896V7.70006H16.8421V5.50006Z"
            fill="white"
          />
          <path
            d="M4.2107 4.40009H3.1582V6.60009H4.2107V4.40009Z"
            fill="white"
          />
          <path
            d="M13.6843 5.50006H12.6318V7.70006H13.6843V5.50006Z"
            fill="white"
          />
          <path
            d="M18.9475 4.40009H17.8945V6.60009H18.9475V4.40009Z"
            fill="white"
          />
          <path
            d="M5.26344 3.30005H4.21094V4.40005H5.26344V3.30005Z"
            fill="white"
          />
          <path
            d="M17.8948 3.30005H16.8423V4.40005H17.8948V3.30005Z"
            fill="white"
          />
          <path
            d="M6.31618 2.20007H5.26318V3.30007H6.31618V2.20007Z"
            fill="white"
          />
          <path
            d="M16.8421 2.20007H15.7896V3.30007H16.8421V2.20007Z"
            fill="white"
          />
          <path
            d="M8.42141 1.10004H6.31641V2.20004H8.42141V1.10004Z"
            fill="white"
          />
          <path
            d="M15.7896 1.10004H13.6841V2.20004H15.7896V1.10004Z"
            fill="white"
          />
          <path
            d="M13.6844 6.10352e-05H8.42139V1.10006H13.6844V6.10352e-05Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_175_25623">
            <rect width="20" height="17.6" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return isLarge ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="108"
      height="100"
      viewBox="0 0 108 100"
      fill="none"
    >
      <path
        d="M5.98011 81.25H0V87.5H5.98011V93.75H71.7699V87.5H83.733V81.25H89.7131V75H95.6932V62.5H101.676V37.5H95.6932V25H89.7131V18.75H83.733V12.5H71.7699V6.25H41.8665V12.5H29.9062V18.75H23.9233V25H17.9432V37.5H11.9631V62.5H17.9432V75H23.9233V81.25H29.9062V87.5H23.9233V81.25H17.9432V75H5.98011V81.25ZM83.733 62.5H71.7699V50H83.733V62.5ZM71.7699 43.75H65.7898V31.25H71.7699V43.75ZM89.7131 43.75H83.733V31.25H89.7131V43.75Z"
        fill={color}
      />
      <path d="M71.7699 93.75H5.98013V100H71.7699V93.75Z" fill="white" />
      <path d="M5.98011 87.5H0V93.75H5.98011V87.5Z" fill="white" />
      <path d="M83.733 87.5H71.7699V93.75H83.733V87.5Z" fill="white" />
      <path d="M29.9062 81.25H23.9233V87.5H29.9062V81.25Z" fill="white" />
      <path d="M89.7131 81.25H83.7329V87.5H89.7131V81.25Z" fill="white" />
      <path d="M5.98011 75H0V81.25H5.98011V75Z" fill="white" />
      <path d="M23.9233 75H17.9432V81.25H23.9233V75Z" fill="white" />
      <path d="M95.6932 75H89.7131V81.25H95.6932V75Z" fill="white" />
      <path
        d="M17.9432 75H5.98013V68.75H11.9631V62.5H17.9432V75Z"
        fill="white"
      />
      <path d="M101.676 62.5H95.6932V75H101.676V62.5Z" fill="white" />
      <path d="M83.733 50H71.7699V62.5H83.733V50Z" fill="white" />
      <path d="M107.656 37.5H101.676V62.5H107.656V37.5Z" fill="white" />
      <path d="M11.9631 37.5H5.98013V62.5H11.9631V37.5Z" fill="white" />
      <path d="M89.7131 31.25H83.7329V43.75H89.7131V31.25Z" fill="white" />
      <path d="M17.9432 25H11.9631V37.5H17.9432V25Z" fill="white" />
      <path d="M71.7698 31.25H65.7897V43.75H71.7698V31.25Z" fill="white" />
      <path d="M101.676 25H95.6932V37.5H101.676V25Z" fill="white" />
      <path d="M23.9233 18.75H17.9432V25H23.9233V18.75Z" fill="white" />
      <path d="M95.6932 18.75H89.7131V25H95.6932V18.75Z" fill="white" />
      <path d="M29.9062 12.5H23.9233V18.75H29.9062V12.5Z" fill="white" />
      <path d="M89.7131 12.5H83.7329V18.75H89.7131V12.5Z" fill="white" />
      <path d="M41.8665 6.25H29.9062V12.5H41.8665V6.25Z" fill="white" />
      <path d="M83.733 6.25H71.7699V12.5H83.733V6.25Z" fill="white" />
      <path d="M71.7699 0H41.8665V6.25H71.7699V0Z" fill="white" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="44"
      viewBox="0 0 50 44"
      fill="none"
    >
      <g clipPath="url(#clip0_75_7953)">
        <path d="M2.63125 35.75H0V38.5H2.63125V35.75Z" fill="white" />
        <path
          d="M5.26248 35.75H2.63123V38.5H5.26248V41.25H34.21V38.5H39.4737V35.75H42.105V33H44.7362V27.5H47.3687V16.5H44.7362V11H42.105V8.25H39.4737V5.5H34.21V2.75H21.0525V5.5H15.79V8.25H13.1575V11H10.5262V16.5H7.89498V27.5H10.5262V33H13.1575V35.75H15.79V38.5H13.1575V35.75H10.5262V33H5.26248V35.75ZM39.4737 27.5H34.21V22H39.4737V27.5ZM34.21 19.25H31.5787V13.75H34.21V19.25ZM42.105 19.25H39.4737V13.75H42.105V19.25Z"
          fill={color}
        />
        <path d="M34.2099 41.25H5.26245V44H34.2099V41.25Z" fill="white" />
        <path d="M5.26248 38.5H2.63123V41.25H5.26248V38.5Z" fill="white" />
        <path d="M39.4737 38.5H34.21V41.25H39.4737V38.5Z" fill="white" />
        <path d="M15.79 35.75H13.1575V38.5H15.79V35.75Z" fill="white" />
        <path d="M42.105 35.75H39.4738V38.5H42.105V35.75Z" fill="white" />
        <path d="M5.26248 33H2.63123V35.75H5.26248V33Z" fill="white" />
        <path d="M13.1575 33H10.5262V35.75H13.1575V33Z" fill="white" />
        <path d="M44.7362 33H42.105V35.75H44.7362V33Z" fill="white" />
        <path
          d="M10.5262 33H5.26245V30.25H7.89495V27.5H10.5262V33Z"
          fill="white"
        />
        <path d="M47.3687 27.5H44.7362V33H47.3687V27.5Z" fill="white" />
        <path d="M39.4737 22H34.21V27.5H39.4737V22Z" fill="white" />
        <path d="M50 16.5H47.3688V27.5H50V16.5Z" fill="white" />
        <path d="M7.89495 16.5H5.26245V27.5H7.89495V16.5Z" fill="white" />
        <path d="M42.105 13.75H39.4738V19.25H42.105V13.75Z" fill="white" />
        <path d="M10.5263 11H7.89502V16.5H10.5263V11Z" fill="white" />
        <path d="M34.21 13.75H31.5787V19.25H34.21V13.75Z" fill="white" />
        <path d="M47.3687 11H44.7362V16.5H47.3687V11Z" fill="white" />
        <path d="M13.1575 8.25H10.5262V11H13.1575V8.25Z" fill="white" />
        <path d="M44.7362 8.25H42.105V11H44.7362V8.25Z" fill="white" />
        <path d="M15.79 5.5H13.1575V8.25H15.79V5.5Z" fill="white" />
        <path d="M42.105 5.5H39.4738V8.25H42.105V5.5Z" fill="white" />
        <path d="M21.0524 2.75H15.7899V5.5H21.0524V2.75Z" fill="white" />
        <path d="M39.4737 2.75H34.21V5.5H39.4737V2.75Z" fill="white" />
        <path d="M34.21 0H21.0525V2.75H34.21V0Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_75_7953">
          <rect width="50" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GhostSvg;
