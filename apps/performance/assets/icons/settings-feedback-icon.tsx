import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

export interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function FeedbackIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "auto", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.92188 20.2804L6.69188 21.6504C6.92188 21.8804 7.43188 21.9903 7.78188 21.9903H9.95187C10.6419 21.9903 11.3819 21.4804 11.5519 20.7904L12.9219 16.6203C13.2119 15.8203 12.6919 15.1303 11.8319 15.1303H9.54188C9.20188 15.1303 8.91188 14.8403 8.97188 14.4403L9.26188 12.6103C9.37188 12.1003 9.03187 11.5203 8.52187 11.3503C8.06187 11.1803 7.49188 11.4103 7.26188 11.7503L4.92188 15.2403" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M2 20.2799V14.6799C2 13.8799 2.34 13.5898 3.14 13.5898H3.71C4.51 13.5898 4.85 13.8799 4.85 14.6799V20.2799C4.85 21.0799 4.51 21.3699 3.71 21.3699H3.14C2.34 21.3699 2 21.0899 2 20.2799Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.0808 3.71973L17.3108 2.34973C17.0808 2.11973 16.5708 2.00977 16.2208 2.00977H14.0508C13.3608 2.00977 12.6208 2.51972 12.4508 3.20972L11.0808 7.37976C10.7908 8.17976 11.3108 8.86975 12.1708 8.86975H14.4608C14.8008 8.86975 15.0908 9.15981 15.0308 9.55981L14.7408 11.3898C14.6308 11.8998 14.9708 12.4798 15.4808 12.6498C15.9408 12.8198 16.5108 12.5898 16.7408 12.2498L19.0808 8.75977" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M21.9984 3.71887V9.31885C21.9984 10.1188 21.6584 10.4089 20.8584 10.4089H20.2884C19.4884 10.4089 19.1484 10.1188 19.1484 9.31885V3.71887C19.1484 2.91887 19.4884 2.62891 20.2884 2.62891H20.8584C21.6584 2.62891 21.9984 2.90887 21.9984 3.71887Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}