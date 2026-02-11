import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function CalendarOutlinedIcon(props: IconProps): JSX.Element {
    const { width = "29px", height = "42px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icons/linear/calendar">
                    <g id="calendar">
                        <path id="Vector" d="M8 2V5" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_2" d="M16 2V5" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_3" d="M3.5 9.08984H20.5" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_4" d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_5" d="M15.6937 13.6992H15.7027" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_6" d="M15.6937 16.6992H15.7027" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_7" d="M11.9945 13.6992H12.0035" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_8" d="M11.9945 16.6992H12.0035" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_9" d="M8.29529 13.6992H8.30427" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path id="Vector_10" d="M8.29529 16.6992H8.30427" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </g>
            </svg>

        </SvgIcon>
    );
}
