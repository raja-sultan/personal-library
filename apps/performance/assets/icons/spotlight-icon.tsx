import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

export interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function SpotlightIcon(props: IconProps): JSX.Element {
  const { width = "52px", height = "auto", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_21880_85744)">
          <circle cx="26" cy="25" r="24" fill="white" />
        </g>
        <path
          d="M24 31L28.5278 26.4722C29.0625 25.9375 29.0625 25.0625 28.5278 24.5278L24 20"
          stroke="#667085"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <filter id="filter0_d_21880_85744" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21880_85744" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_21880_85744" result="shape" />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}
