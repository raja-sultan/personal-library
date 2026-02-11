import CustomModal from "@components/custom-modal";
import { FormLabel, Stack } from "@mui/material";
import { FormProvider, RHFTextField } from "@root/../../packages/common";
import { useSkillModal } from "./use-skill-modal";

export function SkillModal({ open, onClose }): JSX.Element {
    const {
        methods,
        handleSubmit,
        onSubmit,
        // skillId
    } = useSkillModal({ onClose });
    return (
        <CustomModal
            open={open}
            onClose={onClose}
            message={false}
            headerIcon={false}
            title='New Skill'
            acceptText="Add"
            onAccept={handleSubmit(onSubmit)}
            acceptButtonProps={{ color: 'primary' }}
        >
            <FormProvider methods={methods}>
                <Stack gap={2}>
                    <RHFTextField
                        outerLabel='Name'
                        name='name'
                        size='small'
                        placeholder='Skill name'
                        fullWidth
                    />
                    <RHFTextField
                        outerLabel={<>Description <FormLabel
                            sx={({ palette: { neutral } }) => ({ color: neutral[500] })}>
                            (Optional)
                        </FormLabel></>}
                        name='description'
                        multiline
                        minRows={3}
                        placeholder='Enter a description...'
                        fullWidth
                    />
                </Stack>
            </FormProvider>
        </CustomModal>
    )
}



