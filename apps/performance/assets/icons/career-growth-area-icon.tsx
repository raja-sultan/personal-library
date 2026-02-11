import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CareerGrowthAreaIcon(props: IconProps): JSX.Element {
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
          d="M20.67 26H16C14.9 26 14 26.9 14 28V34H20.67V26Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.33 22H22.66C21.56 22 20.66 22.9 20.66 24V34H27.33V24C27.33 22.9 26.44 22 25.33 22Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 29H27.33V34H34V31C34 29.9 33.1 29 32 29Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.52 14.07L25.05 15.13C25.12 15.28 25.31 15.42 25.47 15.44L26.43 15.6C27.04 15.7 27.19 16.15 26.75 16.58L26 17.33C25.87 17.46 25.8 17.7 25.84 17.87L26.05 18.79C26.22 19.52 25.83 19.8 25.19 19.42L24.29 18.89C24.13 18.79 23.86 18.79 23.7 18.89L22.8 19.42C22.16 19.8 21.77 19.52 21.94 18.79L22.15 17.87C22.19 17.7 22.12 17.45 21.99 17.33L21.25 16.59C20.81 16.15 20.95 15.71 21.57 15.61L22.53 15.45C22.69 15.42 22.88 15.28 22.95 15.14L23.48 14.08C23.77 13.5 24.23 13.5 24.52 14.07Z"
          stroke="#7A5AF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
