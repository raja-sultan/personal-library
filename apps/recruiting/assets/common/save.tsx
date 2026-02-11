import type { SvgIconProps } from "@mui/material";
import { styled } from "@mui/material";
import React from "react";

export function Save(props: SvgIconProps): JSX.Element {
  const SvgRapper = styled("svg")``;
  return (
    <SvgRapper
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="#039855"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
        stroke="#039855"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgRapper>
  );
}
