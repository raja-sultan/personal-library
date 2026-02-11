import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function DownloadIcon(props: IconProps): JSX.Element {
  const { width = "38px", height = "42px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="68"
        viewBox="0 0 48 48"
        fill="none"
      >
        <g filter="url(#filter0_d_556_170408)">
          <rect x="2" y="1" width="44" height="44" rx="22" fill="#7A5AF8" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.0481 23.352C32.2731 23.577 32.3995 23.8822 32.3995 24.2004C32.3995 24.5186 32.2731 24.8238 32.0481 25.0488L24.8481 32.2488C24.6231 32.4738 24.3179 32.6001 23.9997 32.6001C23.6815 32.6001 23.3763 32.4738 23.1513 32.2488L15.9513 25.0488C15.8367 24.9381 15.7453 24.8057 15.6824 24.6593C15.6195 24.5129 15.5864 24.3554 15.585 24.1961C15.5836 24.0367 15.614 23.8787 15.6743 23.7312C15.7347 23.5838 15.8238 23.4498 15.9364 23.3371C16.0491 23.2244 16.1831 23.1353 16.3306 23.075C16.478 23.0147 16.6361 22.9843 16.7954 22.9857C16.9547 22.9871 17.1122 23.0202 17.2586 23.0831C17.405 23.146 17.5374 23.2374 17.6481 23.352L22.7997 28.5036V14.6004C22.7997 14.2821 22.9261 13.9769 23.1512 13.7519C23.3762 13.5268 23.6814 13.4004 23.9997 13.4004C24.318 13.4004 24.6232 13.5268 24.8482 13.7519C25.0733 13.9769 25.1997 14.2821 25.1997 14.6004V28.5036L30.3513 23.352C30.5763 23.127 30.8815 23.0006 31.1997 23.0006C31.5179 23.0006 31.8231 23.127 32.0481 23.352Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_556_170408"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_556_170408"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_556_170408"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}
