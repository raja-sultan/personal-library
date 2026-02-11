import { Grid } from "@mui/material";
import { CustomGridLayout } from "../../../../../../components/custom-grid-layout/custom-grid-layout";
import { formData } from "./data";

export function ReviewCycleInformation({ handleEmployeeChange }): JSX.Element {
    return (
        <CustomGridLayout
            title='Review Cycle Information'
            description='Give your review cycle a name, define your review type and add reviewees to your review cycle.'
        >
            <Grid container spacing={2}>
                {formData(handleEmployeeChange).map((obj) => {
                    return (
                        <Grid item key={obj.id} md={obj.gridLength} xs={12}>
                            <obj.component {...obj.componentProps} />
                        </Grid>
                    )
                })}
            </Grid>
        </CustomGridLayout>
    )
}