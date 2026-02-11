import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function LearningIcon(props: IconProps): JSX.Element {
  const { width = "42px", height = "40px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="40.000000pt"
        height="42.000000pt"
        viewBox="0 0 40.000000 42.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path
            d="M190 390 c0 -16 5 -30 10 -30 6 0 10 14 10 30 0 17 -4 30 -10 30 -5
0 -10 -13 -10 -30z"
          />
          <path
            d="M70 335 c12 -13 27 -22 32 -19 12 8 -21 44 -40 44 -12 0 -10 -6 8
-25z"
          />
          <path
            d="M307 342 c-10 -10 -14 -22 -10 -25 7 -8 43 21 43 35 0 14 -16 9 -33
-10z"
          />
          <path
            d="M129 291 c-36 -36 -40 -95 -9 -133 11 -14 24 -37 30 -52 8 -22 16
-26 50 -26 34 0 42 4 50 26 6 15 19 38 30 52 12 15 20 40 20 64 0 89 -107 132
-171 69z m81 -10 c0 -5 -11 -12 -25 -15 -15 -4 -27 -16 -31 -31 -3 -14 -10
-25 -15 -25 -17 0 -9 40 11 60 20 20 60 28 60 11z"
          />
          <path
            d="M0 220 c0 -5 13 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -17 0
-30 -4 -30 -10z"
          />
          <path
            d="M340 220 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
0 -30 -4 -30 -10z"
          />
          <path d="M66 101 c-26 -29 -2 -34 24 -6 18 19 20 25 8 25 -8 0 -23 -9 -32 -19z" />
          <path
            d="M310 95 c12 -13 27 -22 32 -19 12 8 -21 44 -40 44 -12 0 -10 -6 8
-25z"
          />
          <path d="M153 55 c-7 -19 24 -55 47 -55 23 0 54 36 47 55 -9 21 -85 21 -94 0z" />
        </g>
      </svg>
    </SvgIcon>
  );
}
