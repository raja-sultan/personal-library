import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function TickIcon(props: IconProps): JSX.Element {
  const { width = "24px", height = "24px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 10.9707L9 12.9707L13 8.9707M19 10.9707C19 12.1526 18.7672 13.3229 18.3149 14.4149C17.8626 15.5068 17.1997 16.4989 16.364 17.3347C15.5282 18.1704 14.5361 18.8333 13.4442 19.2856C12.3522 19.7379 11.1819 19.9707 10 19.9707C8.8181 19.9707 7.64778 19.7379 6.55585 19.2856C5.46392 18.8333 4.47177 18.1704 3.63604 17.3347C2.80031 16.4989 2.13738 15.5068 1.68508 14.4149C1.23279 13.3229 1 12.1526 1 10.9707C1 8.58375 1.94821 6.29457 3.63604 4.60674C5.32387 2.91891 7.61305 1.9707 10 1.9707C12.3869 1.9707 14.6761 2.91891 16.364 4.60674C18.0518 6.29457 19 8.58375 19 10.9707Z"
          stroke="#12B76A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
