import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function OffersIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.875 13.5C3.375 13.5 3.375 15.5138 3.375 18V19.125C3.375 22.23 3.375 24.75 9 24.75H18C22.5 24.75 23.625 22.23 23.625 19.125V18C23.625 15.5138 23.625 13.5 19.125 13.5C18 13.5 17.685 13.7363 17.1 14.175L15.9525 15.39C14.625 16.8075 12.375 16.8075 11.0363 15.39L9.9 14.175C9.315 13.7363 9 13.5 7.875 13.5Z"
          fill="#7A5AF8"
          stroke="#7A5AF8"
        />
        <path
          d="M21.375 13.5V6.75C21.375 4.26375 21.375 2.25 16.875 2.25H10.125C5.625 2.25 5.625 4.26375 5.625 6.75V13.5"
          fill="#7A5AF8"
        />
        <path
          d="M21.375 13.5V6.75C21.375 4.26375 21.375 2.25 16.875 2.25H10.125C5.625 2.25 5.625 4.26375 5.625 6.75V13.5"
          stroke="#7A5AF8"
        />
        <path d="M11.8672 10.3838H15.6134" stroke="white" />
        <path d="M10.9375 7.00879H16.5625" stroke="white" />
      </svg>
    </SvgIcon>
  );
}
