import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function RejectionReasonsIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.361 13.4167L18.9384 23H2.84398V18.2083C2.84398 15.5662 5.00125 13.4167 7.65288 13.4167H9.361ZM23 21.6037L21.64 22.9588L0 1.39629L1.35996 0.0412083L5.86301 4.52812C6.42757 1.9435 8.73873 0 11.5 0C14.6825 0 17.2707 2.57887 17.2707 5.75C17.2707 8.50138 15.3202 10.8042 12.7263 11.3668L14.7835 13.4167H15.3471C17.9987 13.4167 20.156 15.5662 20.156 18.2083V18.7699L23 21.6037Z"
          fill="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
