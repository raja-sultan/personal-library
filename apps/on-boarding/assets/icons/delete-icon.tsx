import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
  width?: string;
  height?: string;
  sx?: SxProps;
}

export function DeleteIcon(props: IconProps): JSX.Element {
  const { width = "28px", height = "28px", sx = {} } = props;

  return (
    <SvgIcon sx={{ width, height, ...sx }}>
      <svg
        width="20"
        height="25"
        viewBox="0 0 20 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.9974 21.8333C1.9974 23.3 3.1974 24.5 4.66406 24.5H15.3307C16.7974 24.5 17.9974 23.3 17.9974 21.8333V8.5C17.9974 7.03333 16.7974 5.83333 15.3307 5.83333H4.66406C3.1974 5.83333 1.9974 7.03333 1.9974 8.5V21.8333ZM17.9974 1.83333H14.6641L13.7174 0.886667C13.4774 0.646667 13.1307 0.5 12.7841 0.5H7.21073C6.86406 0.5 6.5174 0.646667 6.2774 0.886667L5.33073 1.83333H1.9974C1.26406 1.83333 0.664062 2.43333 0.664062 3.16667C0.664062 3.9 1.26406 4.5 1.9974 4.5H17.9974C18.7307 4.5 19.3307 3.9 19.3307 3.16667C19.3307 2.43333 18.7307 1.83333 17.9974 1.83333Z"
          fill="#F04438"
        />
      </svg>
    </SvgIcon>
  );
}
