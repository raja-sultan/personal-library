import { SvgIcon } from "@mui/material";

export interface IconProps {
  width?: string;
  height?: string;
}

export function ExportCsvIcon(props: IconProps): JSX.Element {
  const { width = "24px", height = "auto" } = props;

  return (
    <SvgIcon sx={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M9.32031 6.49945L11.8803 3.93945L14.4403 6.49945" fill="currentColor" />
        <path
          d="M9.32031 6.49945L11.8803 3.93945L14.4403 6.49945"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.8828 14.1798V4.00977"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12C4 16.42 7 20 12 20C17 20 20 16.42 20 12"
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
