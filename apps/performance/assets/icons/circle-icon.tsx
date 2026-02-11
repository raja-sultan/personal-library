import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function CircleIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "24px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="1.25" y="1.25" width="21.5" height="21.5" rx="10.75" fill="white" />
                <rect
                    x="1.25"
                    y="1.25"
                    width="21.5"
                    height="21.5"
                    rx="10.75"
                    stroke="#667085"
                    strokeWidth="1.5"
                />
            </svg>
        </SvgIcon>
    );
}
