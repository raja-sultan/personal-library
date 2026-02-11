import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function AccountantsPactIcon(props: IconProps): JSX.Element {
  const { width = "42px", height = "42px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="37"
        height="41"
        viewBox="0 0 37 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8478 1.53047C17.4672 0.595497 19.4624 0.595498 21.0819 1.53047L33.6013 8.75859C35.2208 9.69357 36.2184 11.4215 36.2184 13.2914V27.7477C36.2184 29.6176 35.2208 31.3455 33.6013 32.2805L21.0819 39.5086C19.4624 40.4436 17.4672 40.4436 15.8478 39.5086L3.32834 32.2805C1.70893 31.3455 0.711323 29.6176 0.711323 27.7477V13.2914C0.711323 11.4215 1.70893 9.69357 3.32834 8.75859L15.8478 1.53047Z"
          fill="currentColor"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4580_41391"
            x1="12.9648"
            y1="5.51953"
            x2="37.4648"
            y2="48.5195"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0F1316" />
            <stop offset="0.286458" stop-color="#373838" />
            <stop offset="0.550455" stop-color="#0F1316" />
            <stop offset="1" stop-color="#0F1316" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
}
