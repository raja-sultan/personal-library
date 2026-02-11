import React, { useEffect, useState } from "react";
import { EditPenIcon, CircleTickIcon } from "@assets/icons";
import { renderUserImage } from "@root/utils/render-user-image";
import { Box, Checkbox, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useGetParticipantsQuery, useGetSingleCompensationCycleQuery, useGetUserPromotionDetailsQuery, useLazyGetNominatedUserQuery, useUpdateCycleMutation } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

interface NominationUser {
    _id: string,
    firstName: string,
    lastName: string,
    profileImage: string,
    employeeTitle?: string | null,
    location?: string | null,
    department?: string | null,
    jobLevel?: string | null
}
interface ReturnType {
    tableData?: CustomTableProps;
    isPromotionModalOpen: boolean;
    handlePromotionModal: () => void;
    openFilterDrawer: boolean;
    handleOpenFilterDrawer: () => void;
    handleActionChange: (action: string) => void;
    filterData: {
        title: string,
        hideSearchBar?: boolean,
        options: { id: string, name: string }[]
    }[],
    handleApplyFilter: (data: { name: string, optionsIds: string[] }[]) => void;
    handleClearAllFilters: () => void;
    handleContinue: () => void;
    handleSearch: (value: string) => void;
    handleReset: () => void;
    nominationUserDetail: NominationUser | undefined;
    promotedUser: NominatedUser | undefined
    handleEmptyUserData: () => void;
    selectEmployees: string[];
    isUpdateCycleLoading: boolean;
    getRadioBtnOption: (option: { id: string, title: string, value: string }) => void;
    isEligibleUser: string[];
}
interface NominatedUser {
    _id: string | undefined,
    isPromoted: boolean | undefined,
    title: string | undefined,
    jobLevel: string | undefined,
    department: string | undefined,
    location: string | undefined,
}
interface Filter {
    search?: string;
    departmentIds?: string[];
    managerIds?: string[];
    isPromoted?: boolean;
}

export function useParticipants({ handleNext, viewDetailId, currency: currentCurrency }): ReturnType {

    const { data: singleCycleData } = useGetSingleCompensationCycleQuery({ id: viewDetailId });

    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const [promotedUser, setPromotedUser] = useState<NominatedUser | undefined>(undefined);
    const [nominationUserDetail, setNominationUserDetail] = useState<NominationUser>();
    const [selectEmployees, setSelectEmployees] = useState<string[]>([]);
    const [isEligibleUser, setIsEligibleUser] = useState<string[]>([]);
    const [statusPromotion, setStatusPromotion] = useState<{ status?: boolean, isPromoted?: boolean }>({ status: false, isPromoted: false });

    const filterValue = {
        compensationCycleId: viewDetailId,
        ...(singleCycleData?.data?.tenureStartDate && { tenureStartDate: dayjs(singleCycleData?.data?.tenureStartDate).format('YYYY-MM-DD') }),
        ...(singleCycleData?.data?.lastRaiseDate && { lastRaiseDate: dayjs(singleCycleData?.data?.lastRaiseDate).format('YYYY-MM-DD') }),
    };
    const [filter, setFilter] = useState<Filter>();

    const { data: participantsData, isLoading, isSuccess, isError, isFetching } = useGetParticipantsQuery({ ...filter, ...filterValue });
    const [updateCycleMutation, { isLoading: isUpdateCycleLoading }] = useUpdateCycleMutation();
    const { data: managersData } = useGetUserPromotionDetailsQuery({ type: 'managers' });
    const { data: departmentsData } = useGetUserPromotionDetailsQuery({ type: 'departments' });
    const [getNominationUserQuery] = useLazyGetNominatedUserQuery();

    const employeeIds = participantsData?.data?.map((user: { _id: string }) => user?._id);

    const handleSearch = (value: string): void => {
        setFilter({ ...filter, search: value })
    }

    const handlePromotionModal = (): void => {
        setIsPromotionModalOpen(!isPromotionModalOpen)
    }

    function handleOpenFilterDrawer(): void {
        setOpenFilterDrawer(!openFilterDrawer)
    }

    function handleActionChange(action: string): void {
        if (action === 'Set as eligible') {
            setIsEligibleUser([...isEligibleUser, ...selectEmployees]);
        }
        else setIsEligibleUser(isEligibleUser.filter((x) => !selectEmployees.includes(x)));
    }

    function handleApplyFilter(options: { name: string, optionsIds: string[] }[]): void {
        const manager = options?.find((option) => option.name === 'manager')?.optionsIds ?? [];
        const department = options?.find((option) => option.name === 'department')?.optionsIds ?? [];
        if (manager.length > 0 || department.length > 0 || statusPromotion) {
            setFilter({
                ...filter,
                ...(manager.length && { managerIds: manager }),
                ...(department.length && { departmentIds: department }),
                ...(statusPromotion && { isPromoted: statusPromotion.isPromoted })
            });
        }
        else {
            setFilter(filterValue);
        }
    }

    function handleClearAllFilters(): void {
        setFilter(filterValue);
        setStatusPromotion({});
    }

    function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>): void {
        const { checked } = event.target;
        if (checked)
            setSelectEmployees(employeeIds);
        else setSelectEmployees([]);
    }

    const handleSingleSelect = (id: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { checked } = event.target;
        if (checked) setSelectEmployees([...selectEmployees, id]);
        else setSelectEmployees(selectEmployees.filter(emp => emp !== id));
    }

    async function handleContinue(): Promise<void> {
        try {
            await updateCycleMutation({
                id: viewDetailId,
                body: {
                    eligibleIds: isEligibleUser,
                    stage: 'participants',
                    totalParticipants: participantsData?.data?.length
                }
            }).unwrap().then((data) => {
                if (data?.data?._id) {
                    handleNext();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Error while updating participants')
        }
    }

    function handleReset(): void {
        setSelectEmployees([]);
        handlePreUpdate();
    }

    function handleEmptyUserData(): void {
        setNominationUserDetail(undefined);
        setPromotedUser(undefined)
    }

    function handleAddNomination(original): void {
        setNominationUserDetail({
            _id: original?._id,
            firstName: original?.firstName,
            lastName: original?.lastName,
            profileImage: original?.profileImage,
            employeeTitle: original?.employeeTitle,
            location: original?.location,
            department: original?.department?.departmentName,
            jobLevel: original?.jobLevel
        });
        handlePromotionModal();
    }

    async function handleEditNomination(original): Promise<void> {
        if (original?.promotionAdded) {
            await getNominationUserQuery({ compensationCycle: viewDetailId, nominatedUser: original?._id }).unwrap().then((data) => {
                setPromotedUser({
                    _id: data?.data?._id,
                    isPromoted: original?.promotionAdded,
                    title: data?.data?.title,
                    jobLevel: data?.data?.jobLevel,
                    department: data?.data?.department,
                    location: data?.data?.location,
                })
            })
        }
        setNominationUserDetail({
            _id: original?._id,
            firstName: original?.firstName,
            lastName: original?.lastName,
            profileImage: original?.profileImage,
            employeeTitle: original?.employeeTitle,
            location: original?.location,
            department: original?.department?.departmentName,
            jobLevel: original?.jobLevel
        });
        handlePromotionModal();
    }

    const departments = departmentsData?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text })) ?? [];
    const managers = managersData?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text })) ?? [];

    function handlePreUpdate(): void {
        setIsEligibleUser(participantsData?.data?.filter(({ isEligible }) => isEligible)?.map(({ _id }) => _id));
    }

    function handleStatusChange(id: string): void {
        if (isEligibleUser.includes(id)) {
            setIsEligibleUser(isEligibleUser.filter((val) => val !== id))
        }
        else {
            setIsEligibleUser([...isEligibleUser, id])
        }
    }

    function getRadioBtnOption(option: { id: string, title: string, value: string }): void {
        if (option.title === 'promotion') {
            const isPromoted = option.value === 'Yes' ? true : false;
            setStatusPromotion({ ...statusPromotion, isPromoted });
        }
        if (option.title === 'status') {
            const status = option.value === 'Eligible' ? true : false;
            setStatusPromotion({ ...statusPromotion, status });
        }
    }

    useEffect(() => {
        if (participantsData?.data) {
            handlePreUpdate();
        }
    }, [participantsData?.data])

    const filterData = [
        { title: 'manager', options: managers },
        { title: 'department', options: departments },
        // { title: 'status', hideSearchBar: true, radio: true, options: [{ id: '01012', name: 'Eligible' }, { id: '01013', name: 'Ineligible' }] },
        { title: 'promotion', hideSearchBar: true, radio: true, options: [{ id: '0203', name: 'Yes' }, { id: '0204', name: 'No' }] },
    ];

    console.log(selectEmployees, 'select');
    console.log(isEligibleUser, 'eligible');


    const columns = [
        {
            accessorFn: ({ _id }) => _id,
            id: "_id",
            cell: ({ row: { original } }) => <Box display='flex' alignItems='center' gap='6px'>
                <Checkbox
                    checked={selectEmployees.includes(original?._id)}
                    onChange={handleSingleSelect(original?._id)}
                />
                {renderUserImage({ profileImage: original?.profileImage, firstName: original?.firstName, lastName: original?.lastName })}
                {original?.firstName} {original?.lastName}
            </Box>,
            header: () => <Box display='flex' alignItems='center' gap='15px'>
                <Checkbox
                    checked={participantsData?.data?.length === selectEmployees.length}
                    onChange={handleSelectAll}
                />
                Name
            </Box>,
            isSortable: false,
        },
        {
            accessorFn: ({ isEligible }) => isEligible,
            id: "isEligible",
            cell: ({ row: { original } }) => {
                return (
                    <Select size='small' name='status'
                        value={isEligibleUser?.includes(original?._id) ? 'eligible' : 'ineligible'}
                        sx={{ minWidth: '200px' }}
                        onChange={() => handleStatusChange(original?._id)}
                    >
                        <MenuItem value='eligible'>Eligible</MenuItem>
                        <MenuItem value='ineligible'>Ineligible</MenuItem>
                    </Select>
                )
            },
            header: () => <>Status</>,
            isSortable: false,
        },
        {
            accessorFn: ({ currency }) => currency,
            id: "currency",
            cell: ({ getValue }) => <Typography color='neutral.800' variant="subtitle1">{getValue() ?? currentCurrency}</Typography>,
            header: () => <>currency</>,
            isSortable: false,
        },
        {
            accessorFn: ({ promotionAdded }) => promotionAdded,
            id: "promotionAdded",
            cell: ({ getValue, row: { original } }) => <TextField
                aria-readonly
                variant="outlined"
                value={getValue() ? 'Promoted' : 'No Promotion'}
                size='small'
                InputProps={{
                    readOnly: true,
                    classes: { input: '_input' },
                    endAdornment: <Box display='flex' alignItems='center'>
                        {getValue() && <IconButton size='small'>
                            <CircleTickIcon />
                        </IconButton>}
                        <IconButton size='small' onClick={() => {
                            original?.promotionAdded ?
                                void handleEditNomination(original)
                                :
                                handleAddNomination(original);
                        }}>
                            <EditPenIcon />
                        </IconButton>
                    </Box >
                }}
                sx={{ '& ._input': { cursor: 'pointer' } }}
            />,
            header: () => <>Promotion</>,
            isSortable: false,
        },
    ];

    const tableData: CustomTableProps = {
        data: participantsData?.data,
        columns, isLoading, isSuccess, isError, isFetching, isPagination: false
    };

    return {
        tableData,
        isPromotionModalOpen,
        handlePromotionModal,
        handleActionChange,
        handleOpenFilterDrawer,
        openFilterDrawer,
        filterData,
        handleApplyFilter,
        handleClearAllFilters,
        handleSearch,
        handleContinue,
        handleReset,
        nominationUserDetail,
        promotedUser,
        handleEmptyUserData,
        selectEmployees,
        isUpdateCycleLoading,
        getRadioBtnOption,
        isEligibleUser
    }
}