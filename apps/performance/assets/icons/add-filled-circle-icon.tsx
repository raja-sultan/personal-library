import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
  onClick?: () => void;
}

export function AddFilledCircleIcon(props: IconProps): JSX.Element {
  const { width = "40px", height = "40px", sx = {}, onClick } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }} onClick={onClick}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 42 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_7915_470048)">
          <rect
            x="2"
            y="1"
            width="40"
            height="40"
            rx="20"
            fill="currentColor"
          />
          <g clipPath="url(#clip0_7915_470048)">
            <path
              d="M16 21H28"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 27V15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_7915_470048"
            x="0"
            y="0"
            width="44"
            height="44"
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
              result="effect1_dropShadow_7915_470048"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_7915_470048"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_7915_470048">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(10 9)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
