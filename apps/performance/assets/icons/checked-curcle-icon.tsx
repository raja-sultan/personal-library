import { SvgIcon, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CheckedIcon(props: IconProps): JSX.Element {
  const theme = useTheme();
  const {
    width = "2.4rem",
    height = "2.4rem",
    sx = { color: theme.palette.primary.main },
  } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0013 29.3346C23.3346 29.3346 29.3346 23.3346 29.3346 16.0013C29.3346 8.66797 23.3346 2.66797 16.0013 2.66797C8.66797 2.66797 2.66797 8.66797 2.66797 16.0013C2.66797 23.3346 8.66797 29.3346 16.0013 29.3346Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.332 16.0038L14.1054 19.7771L21.6654 12.2305"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
