import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function UploadIcon(props: IconProps): JSX.Element {
  const { width = "48px", height = "48px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_17457_266267)">
          <rect x="2" y="1" width="44" height="44" rx="22" fill="white" />
          <path
            d="M18.7602 33H29.2402C32.0002 33 33.1002 31.31 33.2302 29.25L33.7502 20.99C33.8902 18.83 32.1702 17 30.0002 17C29.3902 17 28.8302 16.65 28.5502 16.11L27.8302 14.66C27.3702 13.75 26.1702 13 25.1502 13H22.8602C21.8302 13 20.6302 13.75 20.1702 14.66L19.4502 16.11C19.1702 16.65 18.6102 17 18.0002 17C15.8302 17 14.1102 18.83 14.2502 20.99L14.7702 29.25C14.8902 31.31 16.0002 33 18.7602 33Z"
            stroke="#344054"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.5 19H25.5"
            stroke="#344054"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 29C25.79 29 27.25 27.54 27.25 25.75C27.25 23.96 25.79 22.5 24 22.5C22.21 22.5 20.75 23.96 20.75 25.75C20.75 27.54 22.21 29 24 29Z"
            stroke="#344054"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2.5"
            y="1.5"
            width="43"
            height="43"
            rx="21.5"
            stroke="#D0D5DD"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_17457_266267"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
              result="effect1_dropShadow_17457_266267"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_17457_266267"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}
