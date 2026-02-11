import { useState } from "react"
import { useAddReviewCycleReminderMutation, useDeleteReviewCycleMutation, useDeleteUserReviewMutation, useLazyGetNominationCountQuery, useGetReviewCycleByIdQuery, useGetReviewCycleProgressByIdQuery, useUpdateReviewCycleByIdMutation } from "@services/settings/review/review-cycle-api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { Box, MenuItem, Typography } from "@mui/material";
import { CustomChip, TableIconActions } from "@root/../../packages/common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { renderUserImage } from "@root/utils/render-user-image";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import type { UseFormHandleSubmit, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

interface ReviewGroup {
    title: string;
    totalCompletedCount: number | null | undefined;
    totalNotStartedCount: number | null | undefined;
    totalCount: number | null | undefined;
}

interface ProgressData {
    title: string;
    totalCompletedCount: number | null | undefined;
    totalNotStartedCount: number | null | undefined;
    totalCount: number | null | undefined;
    groups: ReviewGroup[];
}

interface FormValues {
    subject: string;
    description: string;
}

interface UserInfo { name?: string, email?: string, nominationCount?: number | string }

interface WriteReminder {
    reviewType?: string;
    status?: string;
    reviewCycleId?: string;
    reviewerInfo?: { _id: string, firstName: string, lastName: string, email: string }
}

interface ReturnType {
    deleteModal?: boolean;
    handleDeleteModal?: () => void;
    handleDelete?: () => void;
    handleEdit?: () => void;
    onBack?: () => void;
    handleEndReviewCycle?: () => void;
    reviewInfo?: { title: string, status: string };
    progressData?: ProgressData;
    revieweesData: CustomTableProps;
    reviewersData: CustomTableProps;
    handleReminderModal: () => void;
    reminderModal: boolean;
    handleSubmit: UseFormHandleSubmit<FormValues>;
    onSubmit: SubmitHandler<FormValues>;
    methods?: UseFormReturn<FormValues>;
    userInfo: UserInfo
}

export function useViewProgress(): ReturnType {
    const router = useRouter();
    const viewProgressId = useSearchParams().get('id');
    const [reminderModal, setReminderModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    const { data: singleReview } = useGetReviewCycleByIdQuery({ id: viewProgressId });
    const [deleteReviewCycleMutation] = useDeleteReviewCycleMutation();
    const [updateReviewCycleMutation] = useUpdateReviewCycleByIdMutation();
    const [reminderMutation] = useAddReviewCycleReminderMutation();
    const [removeUserReview] = useDeleteUserReviewMutation();
    const { data: reviewProgress, isLoading, isError, isFetching, isSuccess } = useGetReviewCycleProgressByIdQuery({ id: viewProgressId });
    const [nominationCountQuery] = useLazyGetNominationCountQuery();
    const reviewInfo = { title: singleReview?.data?.name, status: singleReview?.data?.launchStatus };

    const flattenedRevieweeData = reviewProgress?.data[0]?.groups.flatMap((group) => {
        const { reviews, reviewType, ...restGroup } = group;

        return reviews.map((review) => ({
            reviewType,
            ...restGroup,
            ...review,
        }));
    });

    const methods = useForm<FormValues>({
        resolver: yupResolver(Yup.object().shape({
            subject: Yup.string().required('Subject is required.'),
            description: Yup.string().required('Description is required.'),
        })),
        defaultValues: {
            subject: '',
            description: ''
        }
    });

    const { handleSubmit, reset } = methods;

    async function onSubmit(values: FormValues): Promise<void> {
        const email = userInfo.email
        const obj = {
            ...values,
            email,
        }
        try {
            await reminderMutation({ body: obj }).unwrap().then((data) => {
                if (data?.data) {
                    toast.success('Reminder sent successfully');
                    reset();
                    handleReminderModal();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Error while sending reminder');
        }
    }

    const progressData = {
        title: 'Total Reviews',
        totalCompletedCount: reviewProgress?.data[0]?.totalCompletedCount,
        totalNotStartedCount: reviewProgress?.data[0]?.totalNotStartedCount,
        totalCount: reviewProgress?.data[0]?.totalCount,
        groups: reviewProgress?.data[0]?.groups?.map((group) => ({
            title: group?.reviewType?.replace(/_/g, ' '),
            totalCompletedCount: group?.completedCount,
            totalNotStartedCount: group?.notStartedCount,
            totalCount: group?.totalCount,
        }))
    };

    function onBack(): void {
        router.push('/settings/reviews/review-cycles')
    }

    function handleReminderModal(): void {
        setReminderModal(!reminderModal);
    }

    function handleDeleteModal(): void {
        setDeleteModal(!deleteModal);
    }

    async function handleDelete(): Promise<void> {
        try {
            await deleteReviewCycleMutation({ id: viewProgressId }).unwrap();
            toast.success('Review cycle deleted successfully');
            router.push(`/settings/reviews/review-cycles`);
        } catch (error) {
            toast.error(error?.data?.message || 'Error while deleting review cycle');
        }
    }

    async function handleEndReviewCycle(): Promise<void> {
        try {
            await updateReviewCycleMutation({ id: viewProgressId, payload: { launchStatus: 'ENDED' } }).unwrap();
            toast.success('Review cycle ended successfully');
            router.push(`/settings/reviews/review-cycles`);
        } catch (error) {
            toast.error(error?.data?.message || 'Error while updating review cycle');
        }
    }

    function handleEdit(): void {
        router.push(`/settings/reviews/review-cycles/edit?id=${viewProgressId}`)
    };

    async function handleRemoveReviewFromCycle(id: string): Promise<void> {
        try {
            await removeUserReview({ id }).unwrap();
            toast.success('Review cycle removed successfully');
        } catch (error) {
            toast.error(error?.data?.message || 'Error while removing review cycle');
        }
    }

    async function handleWriteReminder(obj: WriteReminder): Promise<void> {
        try {
            await nominationCountQuery({
                userReviewType: obj?.reviewType,
                reviewStatus: obj?.status,
                reviewCycleId: obj?.reviewCycleId,
                reviewerId: obj?.reviewerInfo?._id
            }).unwrap().then((data) => {
                if (data?.data) {
                    setUserInfo({
                        name: `${obj?.reviewerInfo?.firstName} ${obj?.reviewerInfo?.lastName}`,
                        email: obj?.reviewerInfo?.email,
                        nominationCount: data?.data
                    });
                    handleReminderModal();
                }
            })
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong please try again later')
        }
    }

    const revieweesColumnsData = [
        {
            accessorFn: ({ _id }) => _id,
            id: "_id",
            cell: ({ row: { original } }) => <Box display='flex' alignItems='center' gap='10px'>
                {renderUserImage({
                    profileImage: '',
                    firstName: original?.revieweeInfo?.firstName,
                    lastName: original?.revieweeInfo?.lastName,
                })}
                <Typography variant="subtitle1" fontWeight={400}>
                    {original?.revieweeInfo?.firstName}
                    &nbsp;
                    {original?.revieweeInfo?.lastName}
                </Typography>
            </Box>,
            header: () => <>reviewee</>,
        },
        {
            accessorFn: ({ status }) => status,
            id: "status",
            cell: ({ getValue }) => (
                <CustomChip
                    variant='custom'
                    ChipProps={{
                        label: <Typography variant="subtitle2" fontWeight={600} textTransform='capitalize'>
                            {getValue().replace(/_/g, ' ').toLowerCase()}
                        </Typography>
                    }}
                />
            ),
            header: () => <>review Status</>,
        },
        {
            accessorFn: ({ reviewType }) => reviewType,
            id: "reviewType",
            cell: ({ getValue }) => <Typography variant="subtitle1" fontWeight={400} textTransform='capitalize'>
                {getValue().replace(/_/g, ' ').toLowerCase()}
            </Typography>,
            header: () => <>review Type</>,
        },
        {
            header: () => <span>Actions</span>,
            id: "actions",
            cell: ({ row: { original } }) => {
                return (
                    <TableIconActions icon={<TableActionsIcon />}>
                        <MenuItem onClick={() => {
                            void handleRemoveReviewFromCycle(original?._id);
                        }}
                        >
                            Remove from Review Cycle
                        </MenuItem>
                    </TableIconActions>
                );
            },
        },
    ];

    const revieweesData: CustomTableProps = {
        data: flattenedRevieweeData,
        columns: revieweesColumnsData,
        isLoading, isError, isFetching, isSuccess,
        isPagination: false
    };

    const reviewersColumnsData = [
        {
            accessorFn: ({ _id }) => _id,
            id: "_id",
            cell: ({ row: { original } }) => <Box display='flex' alignItems='center' gap='10px'>
                {renderUserImage({
                    profileImage: '',
                    firstName: original?.reviewerInfo?.firstName,
                    lastName: original?.reviewerInfo?.lastName,
                })}
                <Typography variant="subtitle1" fontWeight={400}>
                    {original?.reviewerInfo?.firstName}
                    &nbsp;
                    {original?.reviewerInfo?.lastName}
                </Typography>
            </Box>,
            header: () => <>reviewee</>,
        },
        {
            accessorFn: ({ status }) => status,
            id: "status",
            cell: ({ getValue }) => (
                <CustomChip
                    variant='custom'
                    ChipProps={{
                        label: <Typography variant="subtitle2" fontWeight={600} textTransform='capitalize'>
                            {getValue().replace(/_/g, ' ').toLowerCase()}
                        </Typography>
                    }}
                />
            ),
            header: () => <>review Status</>,
        },
        {
            accessorFn: ({ reviewType }) => reviewType,
            id: "reviewType",
            cell: ({ getValue }) => <Typography variant="subtitle1" fontWeight={400} textTransform='capitalize'>
                {getValue().replace(/_/g, ' ').toLowerCase()}
            </Typography>,
            header: () => <>review Type</>,
        },
        {
            header: () => <span>Actions</span>,
            id: "actions",
            cell: ({ row: { original } }) => {
                return (
                    <TableIconActions icon={<TableActionsIcon />}>
                        <MenuItem onClick={() => {
                            void handleWriteReminder(original)
                        }}>
                            Write Reminder
                        </MenuItem>
                    </TableIconActions>
                );
            },
        },
    ];

    const reviewersData: CustomTableProps = {
        data: flattenedRevieweeData,
        columns: reviewersColumnsData,
        isLoading, isError, isFetching, isSuccess,
        isPagination: false
    };

    return {
        handleDeleteModal,
        deleteModal,
        handleDelete,
        handleEdit,
        onBack,
        handleEndReviewCycle,
        reviewInfo,
        progressData,
        revieweesData,
        reviewersData,
        handleReminderModal,
        reminderModal,
        handleSubmit,
        onSubmit,
        methods,
        userInfo
    }
}