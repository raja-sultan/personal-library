import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function FeedBackSettingProgressIcon(props: IconProps): JSX.Element {
  const { width = "2px", height = "8px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg width="2" height="8" viewBox="0 0 2 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="2" height="8" fill="currentColor" />
      </svg>

    </SvgIcon>
  );
}
