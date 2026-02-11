import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CustomOptionsIcon(props: IconProps): JSX.Element {
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
          d="M22 11V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H10"
          stroke="#98A2B3"
        />
        <path d="M2.03125 8.5H22.0012" stroke="#98A2B3" />
        <path d="M2.03125 15.5H12.0012" stroke="#98A2B3" />
        <path d="M8.50781 21.9897V2.00977" stroke="#98A2B3" />
        <path d="M15.5078 11.9897V2.00977" stroke="#98A2B3" />
        <path
          d="M18.7324 14.6701L14.5824 18.82C14.4224 18.98 14.2724 19.29 14.2324 19.51L14.0024 21.1C13.9224 21.67 14.3224 22.08 14.8924 21.99L16.4824 21.76C16.7024 21.73 17.0124 21.5701 17.1724 21.4101L21.3224 17.26C22.0324 16.55 22.3724 15.7101 21.3224 14.6601C20.2824 13.6201 19.4524 13.9501 18.7324 14.6701Z"
          stroke="#98A2B3"
        />
        <path
          d="M18.1406 15.2598C18.4906 16.5198 19.4806 17.4997 20.7406 17.8597"
          stroke="#98A2B3"
        />
      </svg>
    </SvgIcon>
  );
}
