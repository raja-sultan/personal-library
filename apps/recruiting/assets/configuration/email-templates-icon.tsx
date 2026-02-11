import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function EmailTemplatesIcon(props: IconProps): JSX.Element {
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
          d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5"
          stroke="#98A2B3"
        />
        <path
          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
          stroke="#98A2B3"
        />
        <path
          d="M19.211 14.7703L15.671 18.3103C15.531 18.4503 15.401 18.7103 15.371 18.9003L15.181 20.2503C15.111 20.7403 15.451 21.0803 15.941 21.0103L17.291 20.8203C17.481 20.7903 17.751 20.6603 17.881 20.5203L21.421 16.9803C22.031 16.3703 22.321 15.6603 21.421 14.7603C20.531 13.8703 19.821 14.1603 19.211 14.7703Z"
          stroke="#98A2B3"
        />
        <path
          d="M18.7031 15.2803C19.0031 16.3603 19.8431 17.2003 20.9231 17.5003"
          stroke="#98A2B3"
        />
      </svg>
    </SvgIcon>
  );
}
