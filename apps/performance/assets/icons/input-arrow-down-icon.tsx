import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
  onClick?: () => void;
}

export function InputArrowDownIcon(props: IconProps): JSX.Element {
  const { width = "12px", height = "7px", sx = {}, onClick } = props;

  return (
    <SvgIcon onClick={onClick} sx={{ width, height, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
      >
        <path
          d="M1 6L6 1L11 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
