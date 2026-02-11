import { SvgIcon, type SvgIconProps } from "@mui/material";
import React from "react";

export function EditIcon(props: SvgIconProps): JSX.Element {
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
          d="M13 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22H9C4 22 2 20 2 15V13"
          stroke="#7A5AF8"
        />
        <path
          d="M7.96012 3.01928L15.8401 10.8993C16.1401 11.1993 16.4401 11.7893 16.5001 12.2193L16.9301 15.2293C17.0901 16.3193 16.3201 17.0793 15.2301 16.9293L12.2201 16.4993C11.8001 16.4393 11.2101 16.1393 10.9001 15.8393L3.02012 7.95928C1.66012 6.59928 1.02012 5.01928 3.02012 3.01928C5.02012 1.01928 6.60012 1.65928 7.96012 3.01928Z"
          stroke="#7A5AF8"
        />
        <path
          d="M9.08984 4.15039C8.41984 6.54039 6.54984 8.41039 4.14984 9.09039"
          stroke="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
