import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

function WarningIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#FEF0C7" />
        <path
          d="M11.9997 18.6673C15.6663 18.6673 18.6663 15.6673 18.6663 12.0007C18.6663 8.33398 15.6663 5.33398 11.9997 5.33398C8.33301 5.33398 5.33301 8.33398 5.33301 12.0007C5.33301 15.6673 8.33301 18.6673 11.9997 18.6673Z"
          stroke="#F79009"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.33398V12.6673"
          stroke="#F79009"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9961 14.666H12.0021"
          stroke="#F79009"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default WarningIcon;
