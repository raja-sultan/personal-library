import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function KeyIcon(props: IconProps): JSX.Element {
  const { width = "2.4rem", height = "2.4rem", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7916 14.9303C17.7316 16.9803 14.7816 17.6103 12.1916 16.8003L7.48161 21.5003C7.14161 21.8503 6.47161 22.0603 5.99161 21.9903L3.81161 21.6903C3.09161 21.5903 2.42161 20.9103 2.31161 20.1903L2.01161 18.0103C1.94161 17.5303 2.17161 16.8603 2.50161 16.5203L7.20161 11.8203C6.40161 9.22031 7.02161 6.27031 9.08161 4.22031C12.0316 1.27031 16.8216 1.27031 19.7816 4.22031C22.7416 7.17031 22.7416 11.9803 19.7916 14.9303Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.8916 17.4902L9.1916 19.7902"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5015 11C15.3299 11 16.0015 10.3284 16.0015 9.5C16.0015 8.67157 15.3299 8 14.5015 8C13.673 8 13.0015 8.67157 13.0015 9.5C13.0015 10.3284 13.673 11 14.5015 11Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
