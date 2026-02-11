"use client";
import { useEffect, useState } from "react";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { EditPenIcon } from "@assets/icons";
import DoneIcon from "@mui/icons-material/Done";
import {
  useGetCompensatedEmployeesByIdQuery,
  usePatchConfirmApproveMutation,
} from "@services/compensation/compensation-cycle/compensation-cycle-approvals-api";
import { useSearchParams } from "next/navigation";
import { renderUserImage } from "@root/utils/render-user-image";
import { toast } from "react-hot-toast";
import { type Card } from "../view-progress-components/progress-bar-card/wrapper";
import { CustomChip } from "common";

interface ApproveProps {
  tableData?: CustomTableProps;
  toggleDrawer: (data?: any) => void;
  handleModal: () => void;
  openConfirmApprovalsModal: boolean;
  approveDrawerData: any;
  singleApprove: string[];
  handleConfirmApprove: () => void;
  handleConfirmApprovesMutation: (id?: string) => void;
  confirmApproves: boolean;
  isCompleted: number;
  cardData: Card[];
  isApproved: any;
}

export function useApproves(): ApproveProps {
  const id = useSearchParams().get("id");

  const [approveDrawerData, setApproveDrawerData] = useState<boolean>(false);
  const [singleApprove, setSingleApprove] = useState<string[]>([]);
  const [openConfirmApprovalsModal, setOpenConfirmApprovalsModal] =
    useState<any>(false);
  const [confirmApproves, setConfirmApproves] = useState(true);
  const [payload, setPayload] = useState<any>([]);
  const [isApproved, setIsApproved] = useState<any>([]);

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useGetCompensatedEmployeesByIdQuery({ id });
  const [patchConfirmApproveMutation] = usePatchConfirmApproveMutation();

  const approvalData = data?.data?.compensatedEmployees;

  useEffect(() => {
    const isApprovedData = approvalData
      ?.filter(
        (obj: { isApproved?: boolean; _id: string }) =>
          !obj?.isApproved && obj?._id
      )
      ?.map((obj: { _id: string }) => obj?._id);

    if (!singleApprove?.length) {
      setIsApproved(isApprovedData);
    } else {
      setIsApproved(singleApprove);
    }
  }, [singleApprove, approvalData]);

  const isCompleted =
    approvalData?.filter((obj: { isApproved?: boolean }) => obj?.isApproved)
      ?.length ?? 0;

  const recommendation = approvalData?.filter(
    (obj: { isRecommended: boolean }) => obj?.isRecommended
  );

  function calPercentage(number: number, total: number): number {
    return (number / total) * 100;
  }

  const isAlreadyApproved = approvalData?.filter(
    (obj: { isApproved: boolean }) => obj?.isApproved
  )?.length;

  const handlePayload = (item) => {
    const existingIndex = payload.findIndex(
      (p) => p.userId === item?.user?._id
    );
    if (existingIndex !== -1) {
      setPayload((prevPayload) => {
        const updatedPayload = [...prevPayload];
        updatedPayload.splice(existingIndex, 1);
        return updatedPayload;
      });
    } else {
      setPayload((prevPayload) => [
        ...prevPayload,
        {
          userId: item?.user?._id,
          recommendationPercentage: item?.user?.recommendationPercentage,
          recommendationValue: item?.user?.recommendationValue,
          newPay: item?.user?.newPay,
        },
      ]);
    }
  };

  const cardData: Card[] = [
    {
      progressName: "Recommendations",
      achievedProgress: recommendation?.length ?? "0",
      totalProgress: approvalData?.length ?? "0",
      barValue: calPercentage(recommendation?.length, approvalData?.length),
    },
    {
      progressName: "Approved",
      achievedProgress: isAlreadyApproved ?? "0",
      totalProgress: approvalData?.length ?? "0",
      barValue: calPercentage(isAlreadyApproved, approvalData?.length),
    },
    {
      progressName: "Salary Spend",
      achievedProgress: `£${recommendation?.length ?? "0"}`,
      totalProgress: `£${recommendation?.length ?? "0"}`,
      barValue: calPercentage(recommendation?.length, recommendation?.length),
    },
  ];

  const handleModal = (): void => {
    setOpenConfirmApprovalsModal(!openConfirmApprovalsModal);
  };

  const toggleDrawer = (drawerData?: any): void => {
    setApproveDrawerData(drawerData);
  };

  useEffect(() => {
    if (singleApprove.length === 0) setConfirmApproves(true);
  }, [singleApprove]);

  const handleApproved = (Id: string): void => {
    setSingleApprove((prevState) => {
      if (prevState.includes(Id)) {
        return prevState.filter((itemId) => itemId !== Id);
      }
      return [...prevState, Id];
    });
    setConfirmApproves(false);
  };

  const findObjects = (array, otherArray) => {
    return otherArray?.filter((obj) => array?.includes(obj._id));
  };
  const matchingObjects = findObjects(isApproved, approvalData);
  const mappedData = matchingObjects?.map((obj) => ({
    userId: obj.user?._id,
    recommendationPercentage: obj.user?.recommendationPercentage,
    recommendationValue: obj.user?.recommendationValue,
    newPay: obj.user?.newPay,
  }));

  const handleConfirmApprove = (): void => {
    setSingleApprove(isApproved);
    setConfirmApproves(false);

    setPayload((prevPayload) => [...prevPayload, ...mappedData]);
  };

  const handleConfirmApprovesMutation = async (): Promise<void> => {
    try {
      await patchConfirmApproveMutation({
        compensationCycleId: id,
        body: {
          approvedEmployees: payload,
        },
      })
        .unwrap()
        .then((res) => {
          if (res) {
            handleModal();
            toast.success("Compensation cycle's approved");
          }
        });
      handleModal();
      refetch();
      setSingleApprove([]);
    } catch (error) {
      toast.error(error?.data?.message || "Error: Please try again later...");
    }
  };

  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => (
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          {renderUserImage({
            firstName: original?.user?.firstName,
            lastName: original?.user?.lastName,
            profileImage: original?.user?.profileImage,
          })}
          <Box>
            {`${original?.user?.firstName ?? "--"} ${original?.user?.lastName ?? "--"}`}
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="text.secondary"
            >
              {original?.user?.employeeTitle ?? "--"}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "level",
      cell: ({ row: { original } }) => original?.user?.jobLevel ?? "--",
      header: () => <span>Level</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.user?.currentSalary ,
      id: "currentSalary",
      cell: ({ row: { original } }) =>
        original?.user?.currentSalary
          ? `£ ${original?.user?.currentSalary}`
          : "--",
      header: () => <span>Current Salary</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.user?.guidance,

      id: "guidance",
      cell: ({ row: { original } }) =>
        original?.user?.guidance ? `£ ${original?.user?.guidance}` : "--",
      header: () => <span>Guidance</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "recommendation",
      cell: ({ row: { original } }) => {
        if (original?.user?.recommendationValue) {
          return `£ ${original.user.recommendationValue}`;
        } else if (original?.user?.recommendationPercentage) {
          return `${original.user.recommendationPercentage} %`;
        }
        return (
          <CustomChip
            variant="warning"
            ChipProps={{
              label: "Pending",
            }}
          />
        );
      },

      header: () => <span>Recommendation</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.user?.Salary,
      id: "salary",
      cell: ({ row: { original } }) => {
        const newPay =
          original?.user?.newPay || original?.user?.currentSalary || 0;
        return ` £ ${newPay}`;
      },
      header: () => <span>Salary</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: ({ row: { original } }) => (
        <IconButton
          disabled={original?.isApproved}
          id={original?._id}
          onClick={() => {
            toggleDrawer(original);
          }}
        >
          <EditPenIcon sx={{ cursor: "pointer" }} />
        </IconButton>
      ),
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>Approve</span>,
      id: "approve",
      cell: ({ getValue, row: { original } }) => {
        return (
          <Button
            sx={styles.approveButton({ singleApprove, getValue, original })}
            variant="outlined"
            disabled={original?.isApproved}
            size="small"
            startIcon={<DoneIcon />}
            onClick={() => {
              handleApproved(getValue());
              handlePayload(original);
            }}
          >
            {original?.isApproved ? "Approved" : "Approve"}
          </Button>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    data: approvalData,
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isPagination: false,
  };

  return {
    approveDrawerData,
    tableData,
    toggleDrawer,
    handleModal,
    openConfirmApprovalsModal,
    singleApprove,
    handleConfirmApprove,
    confirmApproves,
    handleConfirmApprovesMutation,
    isCompleted,
    cardData,
    isApproved,
  };
}

const styles = {
  approveButton: ({ singleApprove, getValue, original }) => ({
    color: singleApprove.includes(getValue()) ? "#05603A" : "neutral.700",
    background:
      singleApprove.includes(getValue()) || original?.isApproved
        ? "#D1FADF"
        : "neutral.700",
    border: `1px solid #D0D5DD`,
    "&:hover": {
      background: singleApprove.includes(getValue()) ? "#D1FADF" : "none",
      border: "1px solid #D0D5DD",
    },
    height: "34px",
    fontSize: "12px",
  }),
};
