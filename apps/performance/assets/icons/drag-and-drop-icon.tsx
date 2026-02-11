import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function DragDropIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "24px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1577 4.69124C17.1768 4.69124 18.0029 3.86493 18.0029 2.84562C18.0029 1.82631 17.1768 1 16.1577 1C15.1386 1 14.3125 1.82631 14.3125 2.84562C14.3125 3.86493 15.1386 4.69124 16.1577 4.69124Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.84522 4.69124C8.86431 4.69124 9.69043 3.86493 9.69043 2.84562C9.69043 1.82631 8.86431 1 7.84522 1C6.82614 1 6 1.82631 6 2.84562C6 3.86493 6.82614 4.69124 7.84522 4.69124Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.1577 13.9178C17.1768 13.9178 18.0029 13.0915 18.0029 12.0722C18.0029 11.0529 17.1768 10.2266 16.1577 10.2266C15.1386 10.2266 14.3125 11.0529 14.3125 12.0722C14.3125 13.0915 15.1386 13.9178 16.1577 13.9178Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.1577 22.6912C17.1768 22.6912 18.0029 21.8649 18.0029 20.8456C18.0029 19.8263 17.1768 19 16.1577 19C15.1386 19 14.3125 19.8263 14.3125 20.8456C14.3125 21.8649 15.1386 22.6912 16.1577 22.6912Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.84522 13.9178C8.86431 13.9178 9.69043 13.0915 9.69043 12.0722C9.69043 11.0529 8.86431 10.2266 7.84522 10.2266C6.82614 10.2266 6 11.0529 6 12.0722C6 13.0915 6.82614 13.9178 7.84522 13.9178Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.84522 22.6912C8.86431 22.6912 9.69043 21.8649 9.69043 20.8456C9.69043 19.8263 8.86431 19 7.84522 19C6.82614 19 6 19.8263 6 20.8456C6 21.8649 6.82614 22.6912 7.84522 22.6912Z" stroke="currentColor" strokeWidth="1.12525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </SvgIcon>
    );
}
