import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
    onClick?: () => void;
}

export function EditPenIcon(props: IconProps): JSX.Element {
    const { width = "24px", height = "24px", onClick,  sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }} onClick={onClick}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9102 2H9.91016C4.91016 2 2.91016 4 2.91016 9V15C2.91016 20 4.91016 22 9.91016 22H15.9102C20.9102 22 22.9102 20 22.9102 15V13" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.952 3.02025L9.07199 10.9003C8.77199 11.2003 8.47199 11.7903 8.41199 12.2203L7.98199 15.2303C7.82199 16.3203 8.59199 17.0803 9.68199 16.9303L12.692 16.5003C13.112 16.4403 13.702 16.1403 14.012 15.8403L21.892 7.96025C23.252 6.60025 23.892 5.02025 21.892 3.02025C19.892 1.02025 18.312 1.66025 16.952 3.02025Z" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.8203 4.15039C16.4903 6.54039 18.3603 8.41039 20.7603 9.09039" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </SvgIcon>
    );
}
