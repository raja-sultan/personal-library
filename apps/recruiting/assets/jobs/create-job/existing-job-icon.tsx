import { SvgIcon, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function ExistingJobIcon(props: IconProps): JSX.Element {
  const { width = "72px", height = "72px", sx = {} } = props;
  const theme = useTheme();
  const bgColor = theme.palette.primary.lightest;
  const iconColor = theme.palette.primary.main;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="72"
        viewBox="0 0 86 72"
        fill="none"
      >
        <rect x="0.695312" width="85.2806" height="72" rx="10" fill={bgColor} />
        <path
          d="M58.795 24.6861V27.3647C58.795 29.7252 51.8317 31.6504 43.2491 31.6504C34.6664 31.6504 27.7031 29.7252 27.7031 27.3647V24.6861C27.7031 22.3256 34.6664 20.4004 43.2491 20.4004C51.8317 20.4004 58.795 22.3256 58.795 24.6861ZM58.795 30.7129V36.7397C58.795 39.1002 51.8317 41.0254 43.2491 41.0254C34.6664 41.0254 27.7031 39.1002 27.7031 36.7397V30.7129C31.0431 32.6549 37.1562 33.5589 43.2491 33.5589C49.342 33.5589 55.455 32.6549 58.795 30.7129ZM58.795 40.0879V46.1147C58.795 48.4752 51.8317 50.4004 43.2491 50.4004C34.6664 50.4004 27.7031 48.4752 27.7031 46.1147V40.0879C31.0431 42.0299 37.1562 42.9339 43.2491 42.9339C49.342 42.9339 55.455 42.0299 58.795 40.0879Z"
          fill={iconColor}
        />
      </svg>
    </SvgIcon>
  );
}
