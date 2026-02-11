import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CustomOptionsIcon(props: IconProps): JSX.Element {
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
        <g clip-path="url(#clip0_6_12296)">
          <path
            d="M8.66667 23.332H0V27.9987C0 29.0596 0.421427 30.077 1.17157 30.8271C1.92172 31.5773 2.93913 31.9987 4 31.9987H8.66667V23.332Z"
            fill="#7A5AF8"
          />
          <path
            d="M32.0026 23.332H23.3359V31.9987H28.0026C29.0635 31.9987 30.0809 31.5773 30.831 30.8271C31.5812 30.077 32.0026 29.0596 32.0026 27.9987V23.332Z"
            fill="#7A5AF8"
          />
          <path d="M8.66667 11.668H0V20.3346H8.66667V11.668Z" fill="#7A5AF8" />
          <path
            d="M32.0026 11.668H23.3359V20.3346H32.0026V11.668Z"
            fill="#7A5AF8"
          />
          <path
            d="M8.66667 0H4C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4L0 8.66667H8.66667V0Z"
            fill="#7A5AF8"
          />
          <path
            d="M20.3307 23.332H11.6641V31.9987H20.3307V23.332Z"
            fill="#7A5AF8"
          />
          <path
            d="M20.3307 11.668H11.6641V20.3346H20.3307V11.668Z"
            fill="#7A5AF8"
          />
          <path d="M20.3307 0H11.6641V8.66667H20.3307V0Z" fill="#7A5AF8" />
          <path
            d="M28.0026 0H23.3359V8.66667H32.0026V4C32.0026 2.93913 31.5812 1.92172 30.831 1.17157C30.0809 0.421427 29.0635 0 28.0026 0Z"
            fill="#7A5AF8"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_12296">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
