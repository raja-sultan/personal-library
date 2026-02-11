import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function JobPostedIcon(props: IconProps): JSX.Element {
    const { width = "29px", height = "42px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="31" cy="31" r="31" fill="#F4F3FF" />
                <path d="M26.9998 41H34.9998C39.0198 41 39.7398 39.39 39.9498 37.43L40.6998 29.43C40.9698 26.99 40.2698 25 35.9998 25H25.9998C21.7298 25 21.0298 26.99 21.2998 29.43L22.0498 37.43C22.2598 39.39 22.9798 41 26.9998 41Z" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M27 25V24.2C27 22.43 27 21 30.2 21H31.8C35 21 35 22.43 35 24.2V25" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M33 32V33C33 33.01 33 33.01 33 33.02C33 34.11 32.99 35 31 35C29.02 35 29 34.12 29 33.03V32C29 31 29 31 30 31H32C33 31 33 31 33 32Z" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40.65 30C38.34 31.68 35.7 32.68 33 33.02" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.6201 30.2695C23.8701 31.8095 26.4101 32.7395 29.0001 33.0295" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </SvgIcon>
    );
}
