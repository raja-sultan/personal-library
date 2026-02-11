import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

export interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function CompanyIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "auto", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 22H23" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.7812 22.0108V17.5508" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.8016 10.8906C18.5816 10.8906 17.6016 11.8706 17.6016 13.0906V15.3606C17.6016 16.5806 18.5816 17.5606 19.8016 17.5606C21.0216 17.5606 22.0016 16.5806 22.0016 15.3606V13.0906C22.0016 11.8706 21.0216 10.8906 19.8016 10.8906Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.10156 21.9998V6.02979C2.10156 4.01979 3.10161 3.00977 5.09161 3.00977H11.3216C13.3116 3.00977 14.3016 4.01979 14.3016 6.02979V21.9998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.79688 8.25H10.7469" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.79688 12H10.7469" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.25 22V18.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}