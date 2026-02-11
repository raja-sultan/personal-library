import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function AgenciesIcon(props: IconProps): JSX.Element {
  const { width = "32px", height = "32px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_6_12260)">
          <path
            d="M28 0H20C17.7947 0 16 1.79467 16 4V32H32V4C32 1.79467 30.2053 0 28 0ZM22.6667 25.3333H20V22.6667H22.6667V25.3333ZM22.6667 20H20V17.3333H22.6667V20ZM22.6667 14.6667H20V12H22.6667V14.6667ZM22.6667 9.33333H20V6.66667H22.6667V9.33333ZM28 25.3333H25.3333V22.6667H28V25.3333ZM28 20H25.3333V17.3333H28V20ZM28 14.6667H25.3333V12H28V14.6667ZM28 9.33333H25.3333V6.66667H28V9.33333ZM12.3173 8.032L9.42933 5.144C7.95333 3.668 5.37867 3.668 3.90133 5.144L1.016 8.032C0.370667 8.676 0 9.57067 0 10.484V32H13.3333V10.484C13.3333 9.57067 12.9627 8.676 12.3173 8.032ZM8 25.3333H5.33333V22.6667H8V25.3333ZM8 20H5.33333V17.3333H8V20ZM8 14.6667H5.33333V12H8V14.6667Z"
            fill="#7A5AF8"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_12260">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
