import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";
 
export interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}
export function KeyTypeIcon(props: IconProps): JSX.Element {
    const { width = "22px", height = "22px", sx = {} } = props;
    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               
                    <path d="M20.5654 6.85959C21.4709 8.36311 21.9928 10.1245 21.9928 12.0075C21.9928 17.5262 17.519 22 12.0003 22C6.48159 22 2.00781 17.5262 2.00781 12.0075C2.00781 6.48885 6.48159 2.01509 12.0003 2.01509C13.9176 2.01509 15.7864 2.60177 17.3077 3.5379" stroke="currentColor" strokeWidth="1.44831" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.8019 9.12853C18.2643 10.02 18.4755 10.9348 18.4755 12.0083C18.4755 15.585 15.5761 18.4844 11.9995 18.4844C8.42287 18.4844 5.52344 15.585 5.52344 12.0083C5.52344 8.43174 8.42287 5.53228 11.9995 5.53228C13.1292 5.53228 14.1022 5.77311 15.0267 6.28163" stroke="currentColor" strokeWidth="1.44831" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.05 12.0141C15.05 13.6977 13.6851 15.0625 12.0015 15.0625C10.318 15.0625 8.95312 13.6977 8.95312 12.0141C8.95312 10.3305 10.318 8.96569 12.0015 8.96569C13.6851 8.96569 15.05 10.3305 15.05 12.0141Z" stroke="currentColor" strokeWidth="1.44831" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9766 12.0312L19.6569 4.40142" stroke="currentColor" strokeWidth="1.44831" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.6632 4.40182L18.8376 2.01781L15.0312 5.82415L15.599 8.43718L18.2785 9.15625L22.0116 5.42321L19.6632 4.40182Z" stroke="currentColor" strokeWidth="1.44831" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
               
            </svg>
        </SvgIcon>
    );
}