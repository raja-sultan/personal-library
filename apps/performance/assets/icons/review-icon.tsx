import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function ReviewIcon(props: IconProps): JSX.Element {
  const { width = "24px", height = "24px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="icons/linear/note">
          <g id="note">
            <g id="Group 1000005268">
              <path id="Vector" d="M11.76 22H7C4.79 22 3 21 3 18V8.25C3 5 4.79 4.25 7 4.25C7 4.87 7.25 5.43 7.66 5.84C8.07 6.25 8.63 6.5 9.25 6.5H12.75C13.99 6.5 15 5.49 15 4.25C17.21 4.25 19 5 19 8.25V11.26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path id="Vector_2" d="M15 4.25C15 5.49 13.99 6.5 12.75 6.5H9.25C8.63 6.5 8.07 6.25 7.66 5.84C7.25 5.43 7 4.87 7 4.25C7 3.01 8.01 2 9.25 2H12.75C13.37 2 13.93 2.25 14.34 2.66C14.75 3.07 15 3.63 15 4.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path id="Vector_3" d="M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path id="Vector_4" d="M7 17H8.47" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <g id="Group">
                <path id="Vector_5" d="M17.2 20.65C18.97 20.65 20.4 19.22 20.4 17.45C20.4 15.68 18.97 14.25 17.2 14.25C15.43 14.25 14 15.68 14 17.45C14 19.22 15.43 20.65 17.2 20.65Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path id="Vector_6" d="M21 21.25L20 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </g>
            </g>
          </g>
        </g>
      </svg>

    </SvgIcon>
  );
}
