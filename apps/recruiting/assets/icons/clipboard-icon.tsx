import { SvgIcon, type SvgIconProps } from "@mui/material";
import React from "react";

export function ClipboardIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
          stroke="#7A5AF8"
        />
        <path
          d="M14 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"
          stroke="#7A5AF8"
        />
        <path
          d="M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V14.9995"
          stroke="#7A5AF8"
        />
        <path d="M15 19V16H18" stroke="#7A5AF8" />
        <path d="M21 21.9991L15.04 16.0391" stroke="#7A5AF8" />
      </svg>
    </SvgIcon>
  );
}
