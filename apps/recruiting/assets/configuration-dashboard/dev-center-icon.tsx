import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function DevCenterIcon(props: IconProps): JSX.Element {
  const { width = "32px", height = "32px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_6_12225)">
          <path
            d="M8.58 12.592C8.30267 12.3853 8.02533 12.2813 7.748 12.2813H6.50267V19.744H7.74933C8.02667 19.744 8.304 19.64 8.58133 19.4333C8.85867 19.2267 8.99733 18.916 8.99733 18.5V13.5253C8.996 13.1107 8.856 12.7987 8.58 12.592ZM28.864 0H3.136C1.40667 0 0.004 1.39867 0 3.128V28.8707C0.004 30.6013 1.40667 32 3.136 32H28.864C30.5933 32 31.996 30.6013 32 28.872V3.128C31.996 1.39867 30.5933 0 28.864 0ZM11.0147 18.5133C11.0147 19.8573 10.1853 21.892 7.56 21.888H4.24533V10.0693H7.62933C10.1613 10.0693 11.012 12.1027 11.0133 13.4467L11.0147 18.5133ZM18.2053 12.1813H14.4V14.9253H16.7267V17.0373H14.4V19.7813H18.2067V21.8933H13.7653C12.968 21.9147 12.3053 21.284 12.2853 20.4867V11.5507C12.2653 10.7533 12.896 10.092 13.6933 10.072H18.2067L18.2053 12.1813ZM25.608 20.416C24.6653 22.612 22.976 22.1747 22.22 20.416L19.468 10.0733H21.7947L23.9173 18.196L26.0293 10.0733H28.356L25.608 20.416Z"
            fill="#7A5AF8"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_12225">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
