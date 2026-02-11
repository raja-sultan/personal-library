import { SvgIcon, type SvgIconProps } from "@mui/material";

import React from "react";

export function Delete(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.0625 6.14014C17.7325 5.81014 14.3825 5.64014 11.0425 5.64014C9.0625 5.64014 7.0825 5.74014 5.1025 5.94014L3.0625 6.14014"
          stroke="CurrentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5625 5.13016L8.7825 3.82016C8.9425 2.87016 9.0625 2.16016 10.7525 2.16016H13.3725C15.0625 2.16016 15.1925 2.91016 15.3425 3.83016L15.5625 5.13016"
          stroke="CurrentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9129 9.30029L18.2629 19.3703C18.1529 20.9403 18.0629 22.1603 15.2729 22.1603H8.85289C6.06289 22.1603 5.97289 20.9403 5.86289 19.3703L5.21289 9.30029"
          stroke="CurrentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3926 16.6602H13.7226"
          stroke="CurrentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5625 12.6602H14.5625"
          stroke="CurrentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
