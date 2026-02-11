import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function InfoIcon(props: IconProps): JSX.Element {
    const { width = "32px", height = "32px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9993 29.3337C23.3327 29.3337 29.3327 23.3337 29.3327 16.0003C29.3327 8.66699 23.3327 2.66699 15.9993 2.66699C8.66602 2.66699 2.66602 8.66699 2.66602 16.0003C2.66602 23.3337 8.66602 29.3337 15.9993 29.3337Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 10.667V17.3337" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.9922 21.333H16.0042" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </SvgIcon>
    );
}
