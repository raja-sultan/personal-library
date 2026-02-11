import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function OrganizationIcon(props: IconProps): JSX.Element {
  const { width = "32px", height = "32px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="#7A5AF8" />
        <path
          d="M21.6693 36.6673H8.33594C5.0026 36.6673 3.33594 35.0007 3.33594 31.6673V18.334C3.33594 15.0007 5.0026 13.334 8.33594 13.334H16.6693V31.6673C16.6693 35.0007 18.3359 36.6673 21.6693 36.6673Z"
          stroke="white"
        />
        <path
          d="M16.8526 6.66602C16.7192 7.16602 16.6693 7.71602 16.6693 8.33268V13.3327H8.33594V9.99935C8.33594 8.16602 9.83594 6.66602 11.6693 6.66602H16.8526Z"
          stroke="white"
        />
        <path d="M23.3359 13.334V21.6673" stroke="white" />
        <path d="M30 13.334V21.6673" stroke="white" />
        <path
          d="M28.3359 28.334H25.0026C24.0859 28.334 23.3359 29.084 23.3359 30.0007V36.6673H30.0026V30.0007C30.0026 29.084 29.2526 28.334 28.3359 28.334Z"
          stroke="white"
        />
        <path d="M10 21.666V28.3327" stroke="white" />
        <path
          d="M16.6641 31.6673V8.33398C16.6641 5.00065 18.3307 3.33398 21.6641 3.33398H31.6641C34.9974 3.33398 36.6641 5.00065 36.6641 8.33398V31.6673C36.6641 35.0007 34.9974 36.6673 31.6641 36.6673H21.6641C18.3307 36.6673 16.6641 35.0007 16.6641 31.6673Z"
          stroke="white"
        />
      </svg>
    </SvgIcon>
  );
}
