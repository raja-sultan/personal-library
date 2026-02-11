import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CareerDevelopmentIcon(props: IconProps): JSX.Element {
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
        <circle cx="24" cy="24" r="24" fill="#EBE9FE" />
        <path
          d="M30.47 28.83L30.86 31.99C30.96 32.82 30.07 33.4 29.36 32.97L25.17 30.48C24.71 30.48 24.26 30.45 23.82 30.39C24.56 29.52 25 28.42 25 27.23C25 24.39 22.54 22.09 19.5 22.09C18.34 22.09 17.27 22.42 16.38 23C16.35 22.75 16.34 22.5 16.34 22.24C16.34 17.69 20.29 14 25.17 14C30.05 14 34 17.69 34 22.24C34 24.94 32.61 27.33 30.47 28.83Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 27.23C25 28.42 24.56 29.52 23.82 30.39C22.83 31.59 21.26 32.36 19.5 32.36L16.89 33.91C16.45 34.18 15.89 33.81 15.95 33.3L16.2 31.33C14.86 30.4 14 28.91 14 27.23C14 25.47 14.94 23.92 16.38 23C17.27 22.42 18.34 22.09 19.5 22.09C22.54 22.09 25 24.39 25 27.23Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
