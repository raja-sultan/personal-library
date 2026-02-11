import { SvgIcon } from "@mui/material";

export interface IconProps {
  width?: string;
  height?: string;
}

export function SelectedFileIcon(props: IconProps): JSX.Element {
  const { width = "24px", height = "auto" } = props;

  return (
    <SvgIcon sx={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M28 9.33268V22.666C28 26.666 26 29.3327 21.3333 29.3327H10.6667C6 29.3327 4 26.666 4 22.666V9.33268C4 5.33268 6 2.66602 10.6667 2.66602H21.3333C26 2.66602 28 5.33268 28 9.33268Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.3359 6V8.66667C19.3359 10.1333 20.5359 11.3333 22.0026 11.3333H24.6693"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6641 17.334H15.9974"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6641 22.666H21.3307"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
