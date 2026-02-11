import { SvgIcon, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function EditIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6654 2.25H9.33203C4.66536 2.25 2.33203 4.5 2.33203 9V23.625C2.33203 24.2438 2.85703 24.75 3.4987 24.75H18.6654C23.332 24.75 25.6654 22.5 25.6654 18V9C25.6654 4.5 23.332 2.25 18.6654 2.25Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0622 8.81993L9.00724 14.6587C8.7739 14.8837 8.55225 15.3224 8.50558 15.6374L8.17891 17.8649C8.06225 18.6749 8.64557 19.2374 9.48557 19.1249L11.7956 18.8099C12.1222 18.7649 12.5772 18.5512 12.8106 18.3262L18.8656 12.4874C19.9039 11.4862 20.4056 10.3162 18.8656 8.83118C17.3256 7.33493 16.1122 7.80743 15.0622 8.81993Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1992 9.65234C14.7126 11.4186 16.1476 12.8136 17.9909 13.3086"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
