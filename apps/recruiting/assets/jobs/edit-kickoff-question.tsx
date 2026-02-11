import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function EditKickOffQuestion(props: IconProps): JSX.Element {
  const { width = "42px", height = "42px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2717 2H8.44681C4.53435 2 2.57812 4 2.57812 8V21C2.57812 21.55 3.01828 22 3.55624 22H16.2717C20.1842 22 22.1404 20 22.1404 16V8C22.1404 4 20.1842 2 16.2717 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.2482 7.84015L8.17175 13.0302C7.97612 13.2302 7.79029 13.6202 7.75117 13.9002L7.47729 15.8802C7.37948 16.6002 7.86854 17.1002 8.57278 17.0002L10.5094 16.7202C10.7833 16.6802 11.1648 16.4902 11.3604 16.2902L16.4368 11.1002C17.3074 10.2102 17.7279 9.17015 16.4368 7.85015C15.1457 6.52015 14.1285 6.94015 13.2482 7.84015Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5234 8.58008C12.9538 10.1501 14.1569 11.3901 15.7023 11.8301"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
