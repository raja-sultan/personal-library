import { Box } from "@mui/material";
import { CustomGridLayout } from "../../../../../../components/custom-grid-layout/custom-grid-layout";
import { formData, renderManager } from "./data";

export function ReviewDirection({ watch }): JSX.Element {
    return (
        <CustomGridLayout
            title='Review Direction'
            description='A review direction indicates who will write reviews in relation to the reviewee. All review cycles include a downward review direction. Downward and upward reviewers are always selected based off the org chart and can include individuals who are not reviewees in this cycle.'
            childrenSx={{
                '& .MuiFormControlLabel-root': {
                    alignItems: 'flex-start'
                }
            }}
        >
            {formData.map((obj) => (
                <Box key={obj.id} mb='16px'>
                    <obj.component  {...obj.componentProps} />
                    {(watch('downwardReview') && obj.componentProps.name === 'downwardReview') && <renderManager.component  {...renderManager.compProps} />}
                </Box>
            ))}
        </CustomGridLayout>
    )
}