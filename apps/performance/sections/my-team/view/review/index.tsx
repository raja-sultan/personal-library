'use client'
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Box } from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import { useReview } from "./use-review";

export function Reviews(): JSX.Element {
    const { tableData } = useReview();

    return (
        <Box sx={styles.wrapper}>
            <CustomTableWithHeader tableProps={tableData} />
        </Box>
    )
}

const styles = {
    wrapper: ({ palette: { neutral, common } }) => ({
        padding: '24px 0px',
        borderRadius: '8px',
        border: `1px solid ${neutral[200]}`,
        minHeight: '65vh',
        background: ThemeModeColor(common.white, 'transparent'),
        '& > div': {
            border: 'none'
        }
    })
}