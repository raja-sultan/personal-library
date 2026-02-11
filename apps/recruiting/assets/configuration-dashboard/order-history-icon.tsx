import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function OrderHistoryIcon(props: IconProps): JSX.Element {
  const { width = "32px", height = "32px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.156 16L6.66667 28.0827V32H9.33333V29.3333H12V32H14.6667V29.3333H17.3333V32H20V29.3333H22.6667V32H25.3333V28.3653L25.3587 28.1613L26.8387 16H5.156ZM23.5027 21.3333H20V18.6667H23.828L23.5027 21.3333ZM17.3333 21.3333H14.6667V18.6667H17.3333V21.3333ZM12 18.6667V21.3333H8.51067L8.17733 18.6667H12ZM9.17733 26.6667L8.844 24H12V26.6667H9.17733ZM14.6667 26.6667V24H17.3333V26.6667H14.6667ZM20 24H23.1787L22.8533 26.6667H20V24ZM21.3333 9.33333V13.3333H10.6667V9.33333H21.3333ZM32 5.33333V24H28.5507L29.3333 17.5747V13.3333H24V6.66667H8V13.3333H2.66667V17.584L3.46667 24H0V5.33333C0 3.91885 0.561903 2.56229 1.5621 1.5621C2.56229 0.561903 3.91885 0 5.33333 0L26.6667 0C28.0812 0 29.4377 0.561903 30.4379 1.5621C31.4381 2.56229 32 3.91885 32 5.33333Z"
          fill="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
