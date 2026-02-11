import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CloseReasonsForJobIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="21"
        height="22"
        viewBox="0 0 21 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 8.375C8.32913 8.375 6.5625 6.60838 6.5625 4.4375C6.5625 2.26663 8.32913 0.5 10.5 0.5C12.6709 0.5 14.4375 2.26663 14.4375 4.4375C14.4375 6.60838 12.6709 8.375 10.5 8.375ZM20.0568 8.97087C19.4565 8.47037 18.6751 8.26388 17.8552 8.41438L14.2485 9.292C12.5834 9.59475 11.375 11.0429 11.375 12.736V19.5627L10.5 19.722L9.625 19.5627V12.736C9.625 11.0429 8.41663 9.59562 6.80137 9.30338L3.094 8.40387C2.32313 8.26213 1.54175 8.47125 0.94325 8.97087C0.343 9.47137 0 10.2055 0 10.986V19.5908L10.5 21.5L21 19.5908V10.986C21 10.2055 20.6561 9.47137 20.0568 8.97087Z"
          fill="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
