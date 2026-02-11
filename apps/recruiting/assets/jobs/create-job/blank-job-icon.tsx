import { SvgIcon, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function BlankJobIcon(props: IconProps): JSX.Element {
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
        <rect x="0.5" width="85.35" height="72" rx="10" fill={bgColor} />
        <path
          d="M33.0151 38.2852H27.9347C26.5318 38.2852 25.3945 39.2445 25.3945 40.428V46.8566C25.3945 48.0401 26.5318 48.9994 27.9347 48.9994H33.0151C34.418 48.9994 35.5552 48.0401 35.5552 46.8566V40.428C35.5552 39.2445 34.418 38.2852 33.0151 38.2852Z"
          fill={iconColor}
        />
        <path
          d="M45.7182 29.7148H40.6378C39.2349 29.7148 38.0977 30.6742 38.0977 31.8577V46.8577C38.0977 48.0412 39.2349 49.0006 40.6378 49.0006H45.7182C47.1211 49.0006 48.2584 48.0412 48.2584 46.8577V31.8577C48.2584 30.6742 47.1211 29.7148 45.7182 29.7148Z"
          fill={iconColor}
        />
        <path
          d="M58.4174 19H53.3371C51.9342 19 50.7969 19.9594 50.7969 21.1429V46.8571C50.7969 48.0406 51.9342 49 53.3371 49H58.4174C59.8203 49 60.9576 48.0406 60.9576 46.8571V21.1429C60.9576 19.9594 59.8203 19 58.4174 19Z"
          fill={iconColor}
        />
      </svg>
    </SvgIcon>
  );
}
