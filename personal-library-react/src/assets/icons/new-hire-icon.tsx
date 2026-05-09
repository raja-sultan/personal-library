import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
  }
export function NewHireIcon(props: IconProps): JSX.Element {
    const { width = "2.4rem", height = "2.4rem", sx = {} } = props;

    return(
<SvgIcon sx={{ width, height, ...sx }}>
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="31" cy="31" r="31" fill="#F4F3FF" />
        <path d="M27.67 33H23C21.9 33 21 33.9 21 35V41H27.67V33Z" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32.3302 29H29.6602C28.5602 29 27.6602 29.9 27.6602 31V41H34.3302V31C34.3302 29.9 33.4402 29 32.3302 29Z" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39.0001 36H34.3301V41H41.0001V38C41.0001 36.9 40.1001 36 39.0001 36Z" stroke="#7A5AF8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31.5202 21.0708L32.0502 22.1308C32.1202 22.2808 32.3102 22.4208 32.4702 22.4408L33.4302 22.6008C34.0402 22.7008 34.1902 23.1508 33.7502 23.5808L33.0002 24.3308C32.8702 24.4608 32.8002 24.7008 32.8402 24.8708L33.0502 25.7908C33.2202 26.5208 32.8302 26.8008 32.1902 26.4208L31.2902 25.8908C31.1302 25.7908 30.8602 25.7908 30.7002 25.8908L29.8002 26.4208C29.1602 26.8008 28.7702 26.5208 28.9402 25.7908L29.1502 24.8708C29.1902 24.7008 29.1202 24.4508 28.9902 24.3308L28.2502 23.5908C27.8102 23.1508 27.9502 22.7108 28.5702 22.6108L29.5302 22.4508C29.6902 22.4208 29.8802 22.2808 29.9502 22.1408L30.4802 21.0808C30.7702 20.5008 31.2302 20.5008 31.5202 21.0708Z" stroke="#7A5AF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

</SvgIcon>
    )
}
