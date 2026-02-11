import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function OrderHistoryIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

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
          d="M19.3178 9.99977H4.68782C3.20782 9.99977 2.00781 8.78978 2.00781 7.31978V4.68977C2.00781 3.20977 3.21782 2.00977 4.68782 2.00977H19.3178C20.7978 2.00977 21.9978 3.21977 21.9978 4.68977V7.31978C21.9978 8.78978 20.7878 9.99977 19.3178 9.99977Z"
          stroke="#98A2B3"
        />
        <path
          d="M19.3178 21.9998H4.68782C3.20782 21.9998 2.00781 20.7898 2.00781 19.3198V16.6898C2.00781 15.2098 3.21782 14.0098 4.68782 14.0098H19.3178C20.7978 14.0098 21.9978 15.2198 21.9978 16.6898V19.3198C21.9978 20.7898 20.7878 21.9998 19.3178 21.9998Z"
          stroke="#98A2B3"
        />
        <path d="M6 5V7" stroke="#98A2B3" />
        <path d="M10 5V7" stroke="#98A2B3" />
        <path d="M6 17V19" stroke="#98A2B3" />
        <path d="M10 17V19" stroke="#98A2B3" />
        <path d="M14 6H18" stroke="#98A2B3" />
        <path d="M14 18H18" stroke="#98A2B3" />
      </svg>
    </SvgIcon>
  );
}
