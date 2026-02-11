import CustomModal from "@components/custom-modal";
import { Backdrop, Typography, CircularProgress, Box } from "@mui/material";
import { useGetReviewTemplateQuestionByIdQuery } from "@services/settings/review/review-cycle-api";

interface Props {
    open?: boolean;
    onClose?: () => void;
    templateId: string | null;
}
export function PreviewModalComp(props: Props): JSX.Element {

    const { open, onClose, templateId } = props;
    const { data: templateData, isLoading } = useGetReviewTemplateQuestionByIdQuery({ id: templateId })

    return (
        isLoading ?
            <Backdrop open
                sx={({ palette: { primary }, zIndex }) => ({ color: primary.main, zIndex: zIndex.drawer - 1 })}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            :
            <CustomModal
                open={open}
                onClose={onClose}
                title={`Preview: ${templateData?.data?.templateName}`}
                headerIcon={false}
                message={false}
                hideFooter
            >
                {templateData?.data?.questions.length === 0 ?
                    <Typography variant="h6" fontWeight={400} mb={1}>No questions available right now!</Typography>
                    :
                    templateData?.data?.questions?.map((question, i: number) => (
                        <Box key={question?._id}>
                            <Typography mb={1} fontWeight={600}>{i + 1}:&nbsp;{question?.description}</Typography>
                            {question?.options?.map((option: string) => (
                                <Typography key={option} variant='subtitle1' mb={0.5}>{option}</Typography>
                            ))}
                        </Box>
                    ))

                }
            </CustomModal>
    )
}