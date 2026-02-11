'use client'
import React, { useEffect } from 'react'
import CustomCard from '@components/custom-card'
import { LoadingButton } from '@mui/lab'
import { Box, Button, DialogActions, Grid, Typography } from '@mui/material'
import { FormProvider, RHFRadioGroup, RHFTextField } from '@root/../../packages/common'
import { renderUserImage } from '@root/utils/render-user-image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CustomLoader } from '@components/loader'
import { useGetUserReviewIdQuery, useGetUserReviewTemplateIdQuery, useUpdateUserReviewMutation } from '@services/user-review/user-review-api'
import { toast } from 'react-hot-toast'
import { useGetProfileQuery } from '@services/profile/profile-api'
import { useRouter } from 'next/navigation'
import { styles } from './styles';
import { CustomAlert } from '@components/alert'

function PerformReviewForm({ selectedReview, templateId, reviewType, disabled, id, userStatus }): JSX.Element {
    const { data, isLoading } = useGetUserReviewTemplateIdQuery({ id: templateId });
    const [updateUserReviewMutation, { isLoading: isUpdateLoading }] = useUpdateUserReviewMutation();
    const { data: userReviewData } = useGetUserReviewIdQuery({ id })
    const { data: user } = useGetProfileQuery({});
    const questions: any = data?.data?.template?.question?.filter((ques: { options: string[] }) => ques.options.length > 0);

    const defaultValues = {};
    questions?.forEach((ques) => {
        defaultValues[ques._id] = null;
    });
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape(
            questions?.reduce((obj: any, curr: any) => {
                obj[curr._id] = Yup.string().required("Field is required")
                return obj;
            }, {})
        )),
        defaultValues,
    });


    const { handleSubmit, setValue, reset } = methods;

    async function onSubmit(values: any): Promise<void> {
        const newValues = Object.entries(values)
            .filter(([k]) => !k.endsWith('_feedback'))
            .map(([k, v]) => (
                {
                    Question: k,
                    Answer: v ?? "",
                    ...(values[`${k}_feedback`] && { feedback: values[`${k}_feedback`] })
                }));
        const body = {
            reviewType,
            answers: newValues.filter((obj) => obj.answers !== ''),
            reviewee: user?.data?._id,
            reviewer: reviewType === 'self_review' ? user?.data?._id : selectedReview?._id
            //  reviewee: selectedReview?._id,
            // reviewer: user?.data?._id
        }
        try {
            await updateUserReviewMutation({ id, body }).unwrap().then((res) => {
                if (res) {
                    toast.success('User review updated');
                    questions?.forEach((ques) => {
                        setValue(ques._id, null, { shouldValidate: false });
                    });
                    window.location.reload();
                }

            })
            questions?.forEach((ques) => {
                setValue(ques._id, null, { shouldValidate: false });
            });
        } catch (error) {
            toast.error(error?.data?.message && 'User Not Login');
        }
    };
    const router = useRouter()
    useEffect(() => {
        if (id && templateId && selectedReview?._id &&  userReviewData?.data) {
            const resetValues = {};
            userReviewData.data.reviewTypes.forEach(reviewData => {
                reviewData.user.forEach((userData:any) => {
                    userData.answers.forEach(answer => {
                        resetValues[`${answer.Question}_Question`] = answer?.Answer ?? "";
                        resetValues[`${answer.Question}_feedback`] = answer?.feedback ?? "";
                          if (selectedReview?._id && answer.Answer) {
                              resetValues[`${answer.Question}_Question`] = answer?.Answer;
                          }
                          if (selectedReview?._id && answer.feedback) {
                              resetValues[`${answer.Question}_feedback`] = answer?.feedback;
                          }

                    });
                });
            });
    
            reset(resetValues);
        }
    }, [id, reset, templateId, selectedReview?._id, userReviewData]);
    

return (
    <CustomCard
        cardProps={{ sx: styles.rightCard }}
        subHeader
        cardSubHeader={{
            title: <Box display='flex' alignItems='center' gap='16px' mt={0.7}>
                {renderUserImage({
                    firstName: selectedReview?.firstName ?? '-',
                    lastName: selectedReview?.lastName ?? '-',
                    profileImage: selectedReview?.profileImage ?? "",
                    height: 48, width: 48
                })}
                <Box>
                    <Typography variant='h6' fontWeight={600} color='text.primary' textTransform='capitalize'>
                        {selectedReview?.firstName} {selectedReview?.lastName}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={400} color='text.secondary' textTransform='capitalize'>
                        {selectedReview?.employeeTitle}
                    </Typography>
                </Box>
            </Box>
        }}
    >
        {isLoading ? <CustomLoader /> :
            <>
                {questions?.length > 0 ?
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {questions?.map((ques, i: number) => {
                                return (
                                    <Grid item xs={12} key={ques?._id}>
                                        <Typography variant='body1' fontWeight={600} mb='2.4rem' color='text.primary' textTransform='capitalize'>
                                            {i + 1}. {ques?.description}
                                        </Typography>
                                        <Box mb={2}>
                                            <RHFRadioGroup disabled={disabled || userStatus === "COMPLETED"}
                                                name={ques?._id}
                                                options={ques.options?.map((option: string) => ({ label: option, value: option }))}
                                            />
                                        </Box>
                                        {ques.allowComment &&
                                            <Box mt={2.4} mb={2.4}>
                                                <RHFTextField disabled={disabled || userStatus === "COMPLETED"}
                                                    name={`${ques?._id}_feedback`}
                                                    multiline
                                                    minRows={3}
                                                    placeholder='Enter feedback'
                                                />
                                            </Box>
                                        }
                                    </Grid>
                                )
                            })}
                            <Grid item xs={12}>
                                <Typography variant='body1' fontWeight={600} mb='2.4rem' color='text.primary'>Please respond to all required questions</Typography>
                                <CustomAlert message={"By submitting, your review will be locked and share with your direct report to read over. Make sure you've taken one last look!"} />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button variant='outlined' onClick={() => { router.push('/reviews') }}>Cancel</Button>

                            <LoadingButton disabled={disabled || userStatus === "COMPLETED"}
                                loading={isUpdateLoading}
                                variant='contained'
                                type='submit'>
                                Submit
                            </LoadingButton>
                        </DialogActions>
                    </FormProvider>
                    :
                    <Typography ml={3} mt={1}>No questions available right now</Typography>
                }
            </>
        }
    </CustomCard>
)
}

export default PerformReviewForm

