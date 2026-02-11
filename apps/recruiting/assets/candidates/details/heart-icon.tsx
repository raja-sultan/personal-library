import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

function HeartIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#EBE9FE" />
        <path
          d="M12.413 17.8731C12.1863 17.9531 11.813 17.9531 11.5863 17.8731C9.65301 17.2131 5.33301 14.4597 5.33301 9.79307C5.33301 7.73307 6.99301 6.06641 9.03967 6.06641C10.253 6.06641 11.3263 6.65307 11.9997 7.55974C12.673 6.65307 13.753 6.06641 14.9597 6.06641C17.0063 6.06641 18.6663 7.73307 18.6663 9.79307C18.6663 14.4597 14.3463 17.2131 12.413 17.8731Z"
          stroke="#7A5AF8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default HeartIcon;
