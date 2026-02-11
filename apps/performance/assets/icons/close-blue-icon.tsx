import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface CloseIconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function CloseBlueIcon(props: CloseIconProps): JSX.Element {
    const { width = "24px", height = "24px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_42062_72352)">
                    <rect x="2" y="1" width="40" height="40" rx="20" fill="#7A5AF8" />
                    <path d="M22.0005 20.0103L21.647 19.6568L16.4954 14.5052C16.4954 14.5052 16.4954 14.5052 16.4954 14.5052C16.3641 14.374 16.1861 14.3003 16.0005 14.3003C15.815 14.3003 15.637 14.374 15.5057 14.5051C15.5057 14.5052 15.5057 14.5052 15.5056 14.5052M22.0005 20.0103L15.5056 14.5052M22.0005 20.0103L22.3541 19.6568L27.5057 14.5052L27.5057 14.5052L27.5118 14.499C27.5763 14.4321 27.6536 14.3788 27.739 14.3421C27.8244 14.3054 27.9162 14.2861 28.0092 14.2853C28.1021 14.2845 28.1943 14.3022 28.2803 14.3374C28.3664 14.3726 28.4445 14.4246 28.5102 14.4903C28.576 14.556 28.6279 14.6342 28.6631 14.7202C28.6983 14.8062 28.7161 14.8984 28.7152 14.9914C28.7144 15.0843 28.6951 15.1762 28.6584 15.2616C28.6218 15.347 28.5684 15.4242 28.5016 15.4888L28.5015 15.4887L28.4954 15.4949L23.3438 20.6465L22.9902 21L23.3438 21.3536L28.4919 26.5017C28.6178 26.6334 28.6873 26.8091 28.6858 26.9914C28.6842 27.1749 28.6105 27.3505 28.4808 27.4803C28.351 27.61 28.1754 27.6837 27.9919 27.6853C27.8096 27.6868 27.6339 27.6173 27.5022 27.4914L22.3541 22.3433L22.0005 21.9897L21.647 22.3433L16.4988 27.4914C16.3671 27.6173 16.1915 27.6868 16.0092 27.6853C15.8257 27.6837 15.6501 27.61 15.5203 27.4803C15.3905 27.3505 15.3169 27.1749 15.3153 26.9914C15.3137 26.8091 15.3833 26.6334 15.5092 26.5017L20.6573 21.3536L21.0108 21L20.6573 20.6465L15.5057 15.4949M22.0005 20.0103L15.5057 15.4949M15.5056 14.5052C15.3745 14.6365 15.3008 14.8145 15.3008 15C15.3008 15.1856 15.3745 15.3636 15.5057 15.4949M15.5056 14.5052L15.5057 15.4949M15.5057 15.4949C15.5057 15.4949 15.5057 15.4949 15.5057 15.4949M15.5057 15.4949L15.5057 15.4949" fill="#111928" stroke="white" />
                </g>
                <defs>
                    <filter id="filter0_d_42062_72352" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42062_72352" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42062_72352" result="shape" />
                    </filter>
                </defs>
            </svg>

        </SvgIcon>
    );
}
