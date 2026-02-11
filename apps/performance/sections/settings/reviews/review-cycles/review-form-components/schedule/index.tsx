import { Box, Grid } from "@mui/material";
import { CustomGridLayout } from "../../../../../../components/custom-grid-layout/custom-grid-layout";
import { formData } from "./data";

export function Schedule(): JSX.Element {
    return (
        <CustomGridLayout title="Schedule" description="Set who you want to advance each phase of the review cycle.">
            {formData.map((obj) => (
                <Box key={obj.id}>
                    <Grid container spacing={2} alignItems='flex-end'>
                        {obj.components.map((field) => (
                            <Grid item key={field.id} md={4} xs={12} mb='24px'>
                                <field.component size='small' {...field.componentProps} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </CustomGridLayout>
    )
}