import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function RecruitingIcon(props: IconProps): JSX.Element {
  const { width = "42px", height = "42px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="42.000000pt"
        height="42.000000pt"
        viewBox="0 0 42.000000 42.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path
            d="M256 385 c-3 -8 -1 -15 4 -15 6 0 10 7 10 15 0 8 -2 15 -4 15 -2 0
-6 -7 -10 -15z"
          />
          <path d="M296 363 c-6 -14 -5 -15 5 -6 7 7 10 15 7 18 -3 3 -9 -2 -12 -12z" />
          <path
            d="M151 342 c-105 -53 -105 -186 0 -240 33 -17 53 -21 81 -16 34 5 41 2
72 -30 39 -42 46 -43 71 -16 18 20 17 21 -13 64 -28 39 -31 47 -21 75 22 64
-13 140 -77 167 -44 18 -72 18 -113 -4z m93 -22 c8 0 25 -12 40 -26 38 -39 37
-105 -3 -145 -66 -65 -171 -20 -171 74 0 34 6 50 26 70 25 26 57 37 82 31 8
-2 19 -4 26 -4z"
          />
          <path
            d="M169 266 c-8 -17 -8 -29 -1 -42 8 -14 7 -23 -5 -36 -20 -22 -11 -46
22 -54 57 -14 103 20 72 54 -12 13 -13 22 -5 36 17 30 -5 66 -42 66 -22 0 -33
-6 -41 -24z m70 -3 c12 -23 -4 -53 -29 -53 -25 0 -41 29 -29 52 12 23 45 23
58 1z"
          />
          <path
            d="M325 330 c-3 -5 -2 -10 4 -10 5 0 13 5 16 10 3 6 2 10 -4 10 -5 0
-13 -4 -16 -10z"
          />
          <path
            d="M42 278 c-15 -15 -16 -54 -2 -63 6 -4 1 -18 -11 -35 -25 -33 -20 -46
22 -55 39 -9 43 -4 24 31 -8 16 -15 35 -15 42 0 7 -5 21 -12 32 -10 15 -9 23
6 39 20 22 9 30 -12 9z"
          />
          <path
            d="M366 269 c15 -16 16 -24 6 -39 -6 -11 -15 -37 -18 -60 -6 -38 -5 -40
19 -40 36 0 43 17 18 50 -12 17 -17 31 -11 35 14 9 13 48 -2 63 -21 21 -32 13
-12 -9z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}
