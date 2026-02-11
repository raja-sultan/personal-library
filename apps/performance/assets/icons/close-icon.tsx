import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface CloseIconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function CloseIcon(props: CloseIconProps): JSX.Element {
    const { width = "24px", height = "24px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 17.9999L17.9999 6" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.9999 17.9999L6 6" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}
