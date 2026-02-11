import { Box } from "@mui/material";
import { styles } from "../sidebar.styles";
import Link from "next/link";
import type { LINKCOMP } from "../sidebar.interface";

export function LinkComp({ padding, id, icon, name, link = '#', className = '', pathName='', onClick }: LINKCOMP): JSX.Element {
    const sidebarStyles = styles();

    return (
        <Box id={id} p={padding} sx={sidebarStyles.linkWrapper}>
            {icon}
            <Link href={link} onClick={onClick} className={`link ${className} ${pathName.includes(link) ? 'active' : ''}`}>{name}</Link>
        </Box>
    )
}