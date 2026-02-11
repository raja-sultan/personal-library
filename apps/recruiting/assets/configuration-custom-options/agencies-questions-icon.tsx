import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function AgenciesQuestionsIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_16764_159986)">
          <path
            d="M19.1031 0.699219H13.7031C12.2145 0.699219 11.0031 1.91062 11.0031 3.39922V22.2992H21.8031V3.39922C21.8031 1.91062 20.5917 0.699219 19.1031 0.699219ZM15.5031 17.7992H13.7031V15.9992H15.5031V17.7992ZM15.5031 14.1992H13.7031V12.3992H15.5031V14.1992ZM15.5031 10.5992H13.7031V8.79922H15.5031V10.5992ZM15.5031 6.99922H13.7031V5.19922H15.5031V6.99922ZM19.1031 17.7992H17.3031V15.9992H19.1031V17.7992ZM19.1031 14.1992H17.3031V12.3992H19.1031V14.1992ZM19.1031 10.5992H17.3031V8.79922H19.1031V10.5992ZM19.1031 6.99922H17.3031V5.19922H19.1031V6.99922ZM8.51733 6.12082L6.56793 4.17142C5.57163 3.17512 3.83373 3.17512 2.83653 4.17142L0.888925 6.12082C0.453325 6.55552 0.203125 7.15942 0.203125 7.77592V22.2992H9.20312V7.77592C9.20312 7.15942 8.95293 6.55552 8.51733 6.12082ZM5.60313 17.7992H3.80313V15.9992H5.60313V17.7992ZM5.60313 14.1992H3.80313V12.3992H5.60313V14.1992ZM5.60313 10.5992H3.80313V8.79922H5.60313V10.5992Z"
            fill="#7A5AF8"
          />
        </g>
        <defs>
          <clipPath id="clip0_16764_159986">
            <rect
              width="21.6"
              height="21.6"
              fill="white"
              transform="translate(0.203125 0.699219)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
