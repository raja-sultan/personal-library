import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CssGuideIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="29"
        height="32"
        viewBox="0 0 29 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00925 19.9133L8.40756 24.4213L14.6327 26.12L14.638 26.1187L20.8724 24.4173L21.5213 17.088H2.14811L1.64826 11.4373H22.0053L22.5144 5.65067H1.14972L0.640625 0H28.6406L26.0965 28.7867L14.6578 31.992V31.9933L14.6314 32L3.18212 28.7867L2.3987 19.9133H8.00925Z"
          fill="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
