import type { SvgIconProps } from "@mui/material";
import { SvgIcon } from "@mui/material";
import React from "react";

export function Edit(props: SvgIconProps): JSX.Element {
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
          d="M11.0625 2.16016H9.0625C4.0625 2.16016 2.0625 4.16016 2.0625 9.16016V15.1602C2.0625 20.1602 4.0625 22.1602 9.0625 22.1602H15.0625C20.0625 22.1602 22.0625 20.1602 22.0625 15.1602V13.1602"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.1024 3.17992L8.22238 11.0599C7.92238 11.3599 7.62238 11.9499 7.56238 12.3799L7.13238 15.3899C6.97238 16.4799 7.74238 17.2399 8.83238 17.0899L11.8424 16.6599C12.2624 16.5999 12.8524 16.2999 13.1624 15.9999L21.0424 8.11992C22.4024 6.75992 23.0424 5.17992 21.0424 3.17992C19.0424 1.17992 17.4624 1.81992 16.1024 3.17992Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9727 4.31006C15.6427 6.70006 17.5127 8.57006 19.9127 9.25006"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
