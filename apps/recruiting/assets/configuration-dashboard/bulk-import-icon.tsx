import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function BulkImportIcon(props: IconProps): JSX.Element {
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
        <g clip-path="url(#clip0_6_12317)">
          <g clip-path="url(#clip1_6_12317)">
            <path
              d="M32 12V25.3333C32 29.0093 29.0093 32 25.3333 32H6.66667C2.99067 32 0 29.0093 0 25.3333V12C0 8.324 2.99067 5.33333 6.66667 5.33333H12V4C12 1.79467 13.7947 0 16 0C18.2053 0 20 1.79467 20 4V5.33333H25.3333C29.0093 5.33333 32 8.324 32 12ZM14.6667 9.33333H17.3347V4C17.3333 3.264 16.7347 2.66667 16 2.66667C15.2653 2.66667 14.6667 3.264 14.6667 4V9.33333ZM12.6667 16.6667C12.6667 18.5053 14.1613 20 16 20C17.8387 20 19.3333 18.5053 19.3333 16.6667C19.3333 14.828 17.8387 13.3333 16 13.3333C14.1613 13.3333 12.6667 14.828 12.6667 16.6667ZM22.624 26.3347C21.8787 23.436 19.0933 21.3333 16 21.3333C12.9067 21.3333 10.12 23.436 9.376 26.3347C9.192 27.048 9.62133 27.7747 10.3347 27.9587C11.0507 28.144 11.7747 27.7107 11.9573 26.9987C12.3973 25.2893 14.1347 24 16 24C17.8653 24 19.6027 25.2893 20.0427 26.9987C20.1973 27.6 20.7387 28 21.3333 28C21.4427 28 21.5547 27.9867 21.6667 27.9587C22.38 27.7747 22.808 27.048 22.624 26.3347Z"
              fill="#7A5AF8"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_12317">
            <rect width="32" height="32" fill="white" />
          </clipPath>
          <clipPath id="clip1_6_12317">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
