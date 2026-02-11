import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CareerGrowthArrowUpIcon(props: IconProps): JSX.Element {
  const { width = "1.4rem", height = "1.4rem", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M7.0013 12.8327C10.223 12.8327 12.8346 10.221 12.8346 6.99935C12.8346 3.77769 10.223 1.16602 7.0013 1.16602C3.77964 1.16602 1.16797 3.77769 1.16797 6.99935C1.16797 10.221 3.77964 12.8327 7.0013 12.8327Z"
          fill="#32D583"
        />
        <path
          d="M9.05771 6.39836L7.30771 4.64836C7.13854 4.47919 6.85854 4.47919 6.68938 4.64836L4.93938 6.39836C4.77021 6.56753 4.77021 6.84753 4.93938 7.01669C5.10854 7.18586 5.38854 7.18586 5.55771 7.01669L6.56104 6.01336V9.04086C6.56104 9.28003 6.75937 9.47836 6.99854 9.47836C7.23771 9.47836 7.43604 9.28003 7.43604 9.04086V6.01336L8.43938 7.01669C8.52688 7.10419 8.63771 7.14503 8.74854 7.14503C8.85938 7.14503 8.97021 7.10419 9.05771 7.01669C9.22688 6.84753 9.22688 6.56753 9.05771 6.39836Z"
          fill="#05603A"
        />
      </svg>
    </SvgIcon>
  );
}
