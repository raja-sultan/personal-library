import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function AddCircleOutlinedIcon(props: IconProps): JSX.Element {
    const { width = "4rem", height = "4rem", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg
                width={38}
                height={38}
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_899_111403)">
                    <rect x="2.5" y="1.5" width={33} height={33} rx="16.5" stroke="#D0D5DD" />
                    <g clipPath="url(#clip0_899_111403)">
                        <path
                            d="M13 18H25"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 24V12"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_d_899_111403"
                        x={0}
                        y={0}
                        width={38}
                        height={38}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={1} />
                        <feGaussianBlur stdDeviation={1} />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_899_111403"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_899_111403"
                            result="shape"
                        />
                    </filter>
                    <clipPath id="clip0_899_111403">
                        <rect width={24} height={24} fill="white" transform="translate(7 6)" />
                    </clipPath>
                </defs>
            </svg>
        </SvgIcon>
    );
}
