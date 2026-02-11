import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function CandidateTagsIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.625 13.5C13.7961 13.5 16.375 10.9211 16.375 7.75C16.375 4.57887 13.7961 2 10.625 2C7.45388 2 4.875 4.57887 4.875 7.75C4.875 10.9211 7.45388 13.5 10.625 13.5ZM17.4158 25H14.4583V22.0426L21.4302 15.0707C22.2467 14.2542 23.5711 14.2542 24.3876 15.0707C25.2041 15.8872 25.2041 17.2116 24.3876 18.0281L17.4158 25ZM12.5417 25H2V20.2083C2 17.5662 4.14954 15.4167 6.79167 15.4167H14.4583C15.5556 15.4167 16.5561 15.8029 17.365 16.4258L12.5417 21.2491V25Z"
          fill="#7A5AF8"
        />
      </svg>
    </SvgIcon>
  );
}
