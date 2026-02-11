import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export default function DashboardRightArrowIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "24px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icons/linear/arrow-right">
                    <g id="arrow-right">
                        <path id="Vector" d="M10 18L14.5278 13.4722C15.0625 12.9375 15.0625 12.0625 14.5278 11.5278L10 7" stroke="#9DA4AE" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </g>
            </svg>

        </SvgIcon>
    );
}
