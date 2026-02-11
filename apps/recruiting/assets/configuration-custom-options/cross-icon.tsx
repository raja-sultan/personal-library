import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CrossIcon(props: IconProps): JSX.Element {
  const { width = "18px", height = "18px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.96875 5.97063L1.72611 1.72799L5.96875 5.97063Z"
          fill="#344054"
        />
        <path
          d="M10.2114 1.72799L5.96875 5.97063M5.96875 5.97063L1.72611 10.2133M5.96875 5.97063L10.2114 10.2133M5.96875 5.97063L1.72611 1.72799"
          stroke="#667085"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
