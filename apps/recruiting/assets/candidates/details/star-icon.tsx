import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

function StarIcon(props: SvgIconProps): JSX.Element {
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
          d="M13.1533 6.33977L14.3266 8.68643C14.4866 9.0131 14.9133 9.32643 15.2733 9.38643L17.3999 9.73977C18.7599 9.96643 19.0799 10.9531 18.0999 11.9264L16.4466 13.5798C16.1666 13.8598 16.0133 14.3998 16.0999 14.7864L16.5733 16.8331C16.9466 18.4531 16.0866 19.0798 14.6533 18.2331L12.6599 17.0531C12.2999 16.8398 11.7066 16.8398 11.3399 17.0531L9.34661 18.2331C7.91994 19.0798 7.05327 18.4464 7.42661 16.8331L7.89994 14.7864C7.98661 14.3998 7.83327 13.8598 7.55327 13.5798L5.89994 11.9264C4.92661 10.9531 5.23994 9.96643 6.59994 9.73977L8.72661 9.38643C9.07994 9.32643 9.50661 9.0131 9.66661 8.68643L10.8399 6.33977C11.4799 5.06643 12.5199 5.06643 13.1533 6.33977Z"
          stroke="#7A5AF8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default StarIcon;
