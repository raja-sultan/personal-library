import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
  onClick?: () => void;
}

export function ArrowUpCircleIcon(props: IconProps): JSX.Element {
  const { width = "2.4rem", height = "2.4rem", sx = {}, onClick } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }} onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#344054" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.46875 13.2602L11.9987 9.74023L15.5287 13.2602" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    </SvgIcon>
  );
}
