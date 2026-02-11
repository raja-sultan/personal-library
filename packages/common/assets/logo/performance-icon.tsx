import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function PerformanceIcon(props: IconProps): JSX.Element {
  const { width = "36px", height = "36px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="36.000000pt"
        height="36.000000pt"
        viewBox="0 0 36.000000 36.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path d="M79 345 c-58 -31 -63 -127 -9 -167 l30 -21 -30 -19 c-37 -22 -70 -74 -70 -110 0 -49 38 -36 113 40 37 37 67 71 67 75 0 4 -8 7 -17 7 -12 0 -8 6 14 20 38 23 53 48 53 90 0 42 -15 67 -50 85 -36 19 -67 19 -101 0z" />
          <path d="M270 180 c0 -5 7 -10 15 -10 16 0 20 -16 6 -24 -5 -3 -14 1 -21 9 -7 8 -17 15 -23 15 -16 0 -157 -142 -157 -157 0 -23 13 -14 82 54 66 66 68 66 88 48 20 -18 21 -18 43 3 29 27 37 28 37 2 0 -11 5 -20 10 -20 6 0 10 20 10 45 l0 45 -45 0 c-25 0 -45 -4 -45 -10z" />
          <path d="M182 57 c-23 -23 -42 -46 -42 -50 0 -4 28 -7 61 -7 l62 0 -6 37 c-11 65 -27 69 -75 20z" />
        </g>
      </svg>
    </SvgIcon>
  );
}
