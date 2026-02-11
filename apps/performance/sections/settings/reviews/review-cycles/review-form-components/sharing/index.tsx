import { Typography } from "@mui/material";
import { RHFRadioGroup } from "@root/../../packages/common";
import { CustomGridLayout } from "../../../../../../components/custom-grid-layout/custom-grid-layout";

export function Sharing(): JSX.Element {
    return (
        <CustomGridLayout title="Sharing" description="Set how you want to share the reviews with for this cycle." hideDivider>
            <RHFRadioGroup
                name='shareWith'
                row={false}
                options={[
                    { value: 'REVIEWEES', label: <Typo title='Share review with all reviewees of this cycle' /> },
                    { value: 'REVIEWEES_MANAGERS', label: <Typo title='Share review only with Managers of all reviewees of this cycle' /> },
                    { value: 'DO_NOT_SHARE', label: <Typo title="Don't share reviews" /> },
                ]}
            />
        </CustomGridLayout>
    )
}

function Typo({ title }): JSX.Element {
    return <Typography variant="subtitle1" fontWeight={400} color='neutral.800'>{title}</Typography>
}