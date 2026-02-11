import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function BriefcaseIcon(props: IconProps): JSX.Element {
  const { width = "2.4rem", height = "2.4rem", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 6H19C19 4.4087 18.3679 2.88258 17.2426 1.75736C16.1174 0.632141 14.5913 0 13 0C11.4087 0 9.88258 0.632141 8.75736 1.75736C7.63214 2.88258 7 4.4087 7 6H2C1.46957 6 0.960859 6.21071 0.585786 6.58579C0.210714 6.96086 0 7.46957 0 8V23C0 23.5304 0.210714 24.0391 0.585786 24.4142C0.960859 24.7893 1.46957 25 2 25H24C24.5304 25 25.0391 24.7893 25.4142 24.4142C25.7893 24.0391 26 23.5304 26 23V8C26 7.46957 25.7893 6.96086 25.4142 6.58579C25.0391 6.21071 24.5304 6 24 6ZM13 2C14.0609 2 15.0783 2.42143 15.8284 3.17157C16.5786 3.92172 17 4.93913 17 6H9C9 4.93913 9.42143 3.92172 10.1716 3.17157C10.9217 2.42143 11.9391 2 13 2Z"
          fill="#98A2B3"
        />
      </svg>
    </SvgIcon>
  );
}
