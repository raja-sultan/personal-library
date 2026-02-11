import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function LinearDotCircleShapeIcon(props: IconProps): JSX.Element {
    const { width = "42px", height = "40px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg
                width={38}
                height={38}
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_1039_129001)">
                    <rect x="2.5" y="1.5" width={33} height={33} rx="16.5" stroke="#D0D5DD" />
                    <path
                        d="M12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                        stroke="#344054"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M26 16C24.9 16 24 16.9 24 18C24 19.1 24.9 20 26 20C27.1 20 28 19.1 28 18C28 16.9 27.1 16 26 16Z"
                        stroke="#344054"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M19 16C17.9 16 17 16.9 17 18C17 19.1 17.9 20 19 20C20.1 20 21 19.1 21 18C21 16.9 20.1 16 19 16Z"
                        stroke="#344054"
                        strokeWidth="1.5"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_1039_129001"
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
                            result="effect1_dropShadow_1039_129001"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1039_129001"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        </SvgIcon>
    );
}
