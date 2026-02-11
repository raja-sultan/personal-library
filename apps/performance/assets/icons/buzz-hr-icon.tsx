import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function BuzzHrIcon(props: IconProps): JSX.Element {
  const { width = "29px", height = "42px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="30.000000pt"
        height="42.000000pt"
        viewBox="0 0 30.000000 42.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path d="M2 268 c3 -168 10 -186 89 -226 24 -12 46 -27 48 -33 2 -8 5 -8 10 0 4 6 27 21 52 34 113 57 120 196 13 259 -34 20 -35 22 -18 35 10 7 13 13 7 13 -6 0 -16 -7 -23 -15 -7 -8 -23 -15 -37 -15 -13 0 -26 7 -29 15 -4 8 -13 15 -22 15 -13 0 -12 -3 4 -15 19 -15 19 -15 -1 -27 -11 -6 -22 -11 -24 -11 -2 1 -19 28 -37 60 l-34 58 2 -147z m189 -38 l24 -19 -70 0 -70 0 24 19 c13 11 33 20 46 20 13 0 33 -9 46 -20z m29 -55 c0 -12 -15 -15 -75 -15 -60 0 -75 3 -75 15 0 12 15 15 75 15 60 0 75 -3 75 -15z m-29 -55 c-30 -25 -62 -25 -92 0 l-24 19 70 0 70 0 -24 -19z" />
        </g>
      </svg>
    </SvgIcon>
  );
}
