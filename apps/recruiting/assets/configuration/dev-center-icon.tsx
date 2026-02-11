import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function DevCenterIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.1231 13.6959V16.9719C16.1231 19.7079 15.0311 20.7999 12.2951 20.7999H9.03112C6.30712 20.7999 5.20312 19.7079 5.20312 16.9719V13.6959C5.20312 10.9719 6.29512 9.87988 9.03112 9.87988H12.3071C15.0311 9.87988 16.1231 10.9719 16.1231 13.6959Z"
          stroke="#98A2B3"
        />
        <path
          d="M20.8028 9.0162V12.2922C20.8028 15.0282 19.7108 16.1202 16.9748 16.1202H16.1228V13.6962C16.1228 10.9722 15.0308 9.8802 12.2948 9.8802H9.88281V9.0162C9.88281 6.2802 10.9748 5.2002 13.7108 5.2002H16.9868C19.7108 5.2002 20.8028 6.2922 20.8028 9.0162Z"
          stroke="#98A2B3"
        />
        <path
          d="M25.0016 16.5996C25.0016 21.2436 21.2456 24.9996 16.6016 24.9996L17.8616 22.8996"
          stroke="#98A2B3"
        />
        <path d="M1 9.4C1 4.756 4.756 1 9.4 1L8.14 3.1" stroke="#98A2B3" />
      </svg>
    </SvgIcon>
  );
}
