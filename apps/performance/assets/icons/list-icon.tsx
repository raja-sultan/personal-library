import { SvgIcon } from "@mui/material";
import type { SxProps } from "@mui/material";

interface IconProps {
    width?: string;
    height?: string;
    sx?: SxProps;
}

export function ListIcon(props: IconProps): JSX.Element {
    const { width = "50px", height = "35px", sx = {} } = props;

    return (
        <SvgIcon sx={{ width, height, ...sx }}>
            <svg width="50px" height="35px" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="50" height="35" fill="url(#pattern0)" />
                <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_1_4761" transform="matrix(0.016129 0 0 0.0230415 0 -0.0184332)" />
                    </pattern>
                    <image id="image0_1_4761" width="62" height="45" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAtCAYAAAD2g9hxAAACSElEQVRoge2Y3WvTUBiHf2mTpujGKv2yWyurFBUrwqQOx0A2EAWvvPDGy90I3vjnCQpjAxkb82MgdqwidNIu65pMY1ds1lbnhURpkzQnmDak5zyX78l58z5wSH4Jp2mnZ6CQgNcDeAUTpw0mThtMnDaYOG3wJBetb+xAVlRD/c7tPDLTCdeHGgVE4u8/fDKtpw/i4y2us7Q4h3gsguJeGbul/b/1L5UaXqxuodU6HbhfEBzdzkCn0x24HhZDuL88j1x2xraXo0nisQgy0wlUD+q9TXgeYTFkKT45cc7JbSwJiyEAwEnzh/l6OARBCBL1ciS+W9pHVZJRleSe+kwqhpUnD5208hxH4sW98rDmGDlE4g+W51Es9UqLYgi5bHooQ40Cjv2IoAwmThtED7fNNx8NrzDgX6DxI2Tib4um9c/l6niL61y/OoupyfOoSPWeEyDVFLxa28ZX9cR0n1vJTccquUWmJnDvbgGX0knbHo7E89eyfz5K+o5+u9NFS2vbDsrzZHHSim7358B1TWujbZPndVyJrLOZi3i28shJK89hkXUQC4U8KlLdUGeR1YdQG2CYOG0QPdz6/7EBgCgKWCjcGO/k9nJt27Qej0bGW1zHKrLKiorV1+8g1RTDnkTswv9PaUJd+WaopZJRLC3OIZWM2u53JbJ+bzRxeHRMPOCwODw6htpoui8uKyo4cGj0fSTkLqfx/OljnP3yNhJwHBAMDuH38vrGjuVaMBDw1TuCSPzWzSumR5ZFVh/io8PpLkycNpg4bfwG5SrGxbPn7YsAAAAASUVORK5CYII=" />
                </defs>
            </svg>

        </SvgIcon>
    );
}
