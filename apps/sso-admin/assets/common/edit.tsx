import type { SvgIconProps } from "@mui/material";
import { styled } from "@mui/material";
import React from "react";

export function Edit(props: SvgIconProps): JSX.Element {
  const SvgRapper = styled("svg")``;
  return (
    <SvgRapper
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33594 9.3335H8.0026C7.29536 9.3335 6.61708 9.61445 6.11699 10.1145C5.61689 10.6146 5.33594 11.2929 5.33594 12.0002V24.0002C5.33594 24.7074 5.61689 25.3857 6.11699 25.8858C6.61708 26.3859 7.29536 26.6668 8.0026 26.6668H20.0026C20.7098 26.6668 21.3881 26.3859 21.8882 25.8858C22.3883 25.3857 22.6693 24.7074 22.6693 24.0002V22.6668"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3333 6.66681L25.3333 10.6668M27.18 8.78014C27.7051 8.25501 28.0001 7.54279 28.0001 6.80014C28.0001 6.0575 27.7051 5.34527 27.18 4.82014C26.6549 4.29501 25.9426 4 25.2 4C24.4574 4 23.7451 4.29501 23.22 4.82014L12 16.0001V20.0001H16L27.18 8.78014Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgRapper>
  );
}
