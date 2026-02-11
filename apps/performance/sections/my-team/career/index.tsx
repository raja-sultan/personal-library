import { EditPenIcon, DeleteTrashIcon } from "@assets/icons";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { Box, Button, DialogActions, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { CustomChip, FormProvider, RHFSwitch, RHFTextField } from "@root/../../packages/common";
import { cardsData } from "./career-data";
import { useTeamCareer } from "./use-team-career";
import { CustomLoader } from "@components/loader";
import { LoadingButton } from "@mui/lab";
import { ComponentLoader } from "@components/component-loader";

export function TeamCareer(): JSX.Element {
    const {
        careerVisionModal,
        handleCareerVisionModal,
        handleSubmit,
        onSubmit,
        methods,
        handleEditCareerVision,
        careerVisionId,
        handleAddCareerVision,
        isOpenDeleteModal,
        setIsOpenDeleteModal,
        handleDeleteCareerVision,
        handleDeleteModal,
        getCareerVisionData,
        isGetCareerVisionDataLoading,
        isAddingLoading,
        isUpdateLoading,
        isGetCareerVisionLoading,
        isDeleteLoading,
        actionType
    } = useTeamCareer();

    return (
        <>
            <Typography variant="h4" fontWeight={600}>Jump start your team’s career development</Typography>
            <Typography color='neutral.500' variant="body2" mb='24px'>
                Guide your team’s long-term career vision and shorter-term growth areas through self-reflection exercises and development conversations.
            </Typography>

            <Grid container spacing={2}>
                {cardsData.map((obj) => (
                    <Grid item lg={4} sm={6} xs={12} key={obj?._id}>
                        <CustomCard cardProps={{ sx: { height: '100%' } }}>
                            <Box sx={styles.cardsWrapper}>
                                <Box className='iconWrapper'>
                                    {obj?.icon}
                                </Box>
                                <Typography fontWeight={600} fontSize='20px'>{obj?.title}</Typography>
                            </Box>
                            <Typography mt='24px' variant="subtitle1" fontWeight={400} color='neutral.500'>{obj?.desc}</Typography>
                        </CustomCard>
                    </Grid>
                ))}
            </Grid>

            <CustomCard
                cardProps={{ sx: { mt: '24px' } }}
                subHeader
                cardSubHeader={{
                    title: 'Career vision',
                    description: "Use these exercises in partnership with your direct reports to define their career aspirations. Customize the exercises by providing tips for additional context or create exercises just for your team.",
                    actions: <Button variant='contained' onClick={handleCareerVisionModal}>Add Career Vision</Button>
                }}
            >
                {isGetCareerVisionDataLoading && <ComponentLoader />}
                {getCareerVisionData?.data?.map((obj) => (
                    <Box sx={styles.careerVisionWrapper} key={obj?._id}>
                        <Box className='titleWrapper'>
                            <Typography variant='body2' fontWeight={600}>{obj?.name}</Typography>
                            <CustomChip variant="started" ChipProps={{ label: obj?.label ?? "Default" }} />
                        </Box>
                        <Typography variant='body2' fontWeight={400} color='neutral.500'>
                            {obj?.description}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box className='responseWrapper'>
                            <Typography variant='body2' fontWeight={500}>{obj?.response} response</Typography>
                            <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: 'center' }}>
                                <IconButton onClick={() => { handleDeleteModal(obj?._id) }} sx={styles.deleteIcon}>
                                    <DeleteTrashIcon sx={{ color: 'common.white' }} />
                                </IconButton>
                                <IconButton onClick={() => { handleEditCareerVision(obj?._id) }}><EditPenIcon /></IconButton>
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </CustomCard>

            {careerVisionModal && <CustomModal
                open={careerVisionModal}
                onClose={handleAddCareerVision}
                title={careerVisionId && actionType === 'edit' ? 'Edit Career Vision' : 'Career Vision'}
                message={false}
                headerIcon={false}
                hideFooter
            >
                {isGetCareerVisionLoading && <CustomLoader />}
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <RHFTextField
                        name='name'
                        outerLabel='Name'
                        placeholder='Skill name'
                        size='small'
                        sx={{ mb: '42px' }}
                    />
                    <RHFTextField
                        name='description'
                        outerLabel='Description'
                        placeholder='Enter a description...'
                        minRows={3}
                        multiline
                        sx={{ mb: '16px' }}
                    />
                    <RHFSwitch name='enabled' sx={{ ml: 0.5, gap: '10px' }} label='Enabled' />
                    <Typography variant="body2" color='neutral.500' mt='16px'>
                        Disabling this question will hide it from the employee and manager view. Employees who have already answered this question will still see this question and their answer in their career vision.
                    </Typography>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleAddCareerVision}>
                            Cancel
                        </Button>
                        <LoadingButton loading={isAddingLoading || isUpdateLoading} type="submit" variant="contained">
                            {careerVisionId && actionType === 'edit' ? 'Update' : 'Create'}
                        </LoadingButton>
                    </DialogActions>
                </FormProvider>
            </CustomModal>}

            {isOpenDeleteModal && <CustomModal
                open={isOpenDeleteModal}
                isLoading={isDeleteLoading}
                onClose={() => { setIsOpenDeleteModal(!isOpenDeleteModal) }}
                message='Are you sure you want to delete this?'
                acceptButtonProps={{
                    onClick: handleDeleteCareerVision
                }}
            />}
        </>
    )
}


const styles = {
    cardsWrapper: ({ palette: { primary } }) => ({
        display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
        '& .iconWrapper': {
            height: 48, width: 48, borderRadius: '50%',
            backgroundColor: primary.lightest,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center'
        }
    }),
    careerVisionWrapper: ({ palette: { neutral } }) => ({
        borderRadius: '8px',
        border: `1px solid ${neutral[200]}`,
        padding: '16px 24px',
        mb: '24px',
        '&:last-child': {
            mb: 0
        },
        '& .titleWrapper': {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            mb: '8px'
        },
        '& .responseWrapper': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap'
        }
    }),
    deleteIcon: ({ palette: { error } }) => ({
        background: error.dark,
        '&:hover': { background: error.dark },
        width: "36px",
        height: "36px"

    })
}


