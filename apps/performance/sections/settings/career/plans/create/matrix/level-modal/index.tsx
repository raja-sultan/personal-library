import CustomModal from "@components/custom-modal";
import { FormLabel, MenuItem, Stack, Typography } from "@mui/material";
import { FormProvider, RHFTextField } from "@root/../../packages/common";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { addLevel, updateLevel } from "@root/slices";

interface FormValues {
    levelName?: string;
    description?: string;
    // level?: string;
}

export function AddLevelModal({ open, onClose, editLevelId, levelActionType }): JSX.Element {
    const dispatch = useDispatch();
    const methods = useForm<FormValues>({
        resolver: yupResolver(Yup.object().shape({
            levelName: editLevelId ? Yup.string().optional() : Yup.string().required('Level name is required'),
            // level: editLevelId ? Yup.string().required('Level is required') : Yup.string().optional(),
            description: Yup.string().optional(),
        })),
        defaultValues: { levelName: '', description: '' }
    })

    const { handleSubmit } = methods;
    console.log("levelActionType", levelActionType)

    function onSubmit(values: FormValues): void {
        if (levelActionType === 'edit') {
            dispatch(updateLevel(values));
        } else {
            dispatch(addLevel(values));
        }
        setTimeout(() => { onClose() }, 2000);
    }

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={`${levelActionType === 'edit' ? 'Edit' : 'Add'} Level`}
            message={false}
            headerIcon={false}
            acceptText={levelActionType === 'edit' ? 'Save' : 'Add'}
            acceptButtonProps={{ color: 'primary' }}
            onAccept={handleSubmit(onSubmit)}
        >
            <FormProvider methods={methods}>
                <Stack gap={2}>
                    {editLevelId ?
                        <RHFTextField select name='level' outerLabel='Level' size='small' placeholder='Select'>
                            <MenuItem>L1</MenuItem>
                            <MenuItem>L2</MenuItem>
                        </RHFTextField>
                        :
                        <RHFTextField
                            outerLabel='Name'
                            name='levelName'
                            size='small'
                            placeholder='Level name'
                            fullWidth
                        />}
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
                <Typography variant="body2" mt='5px' color='neutral.500'>
                    A summary of expectations for this level. Usually 1-3 sentences.
                </Typography>
            </FormProvider>
        </CustomModal>
    )
}