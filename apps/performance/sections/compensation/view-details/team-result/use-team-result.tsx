import { useState } from "react";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { GlobalAvatar } from "@components/global-avatar";
import {
  useGetShareTeamResultMutation,
  useLazyGetSingleTeamResultQuery,
  useGetTeamResultQuery,
} from "@services/compensation/compensation-cycle/compensation-cycle-view-details-api";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { ThemeModeColor } from "@root/utils";
import type { Theme } from "@mui/material";

interface ReturnType {
  tableData: CustomTableProps;
  detailDrawer: string | null;
  handleDetailDrawer: (val: string | null) => void;
  singleTeamResult: any;
  singleTeamLoading: boolean;
  sharedAllHandler: () => void;
  hasTrueValue: boolean;
}

export function useTeamResult({ _id }): ReturnType {
  const [detailDrawer, setDetailDrawer] = useState<string | null>(null);
  const [trigger, { data: singleTeamResult, isFetching: singleTeamLoading }] =
    useLazyGetSingleTeamResultQuery({});

  const [patchShareTeamResult] = useGetShareTeamResultMutation({});
   const {
    data: teamResult,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetTeamResultQuery({
    id: "65812c5ec70b6baf31a6c02d",
  });

  const handleDetailDrawer = async (userid: string): Promise<void> => {
    setDetailDrawer(userid);
    try {
      if (userid) {
        await trigger({ id: "65812c5ec70b6baf31a6c02d", userId: userid });
      } else {
        null;
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const sharedAllHandler = async (): Promise<void> => {
    const payload = { id: "65812c5ec70b6baf31a6c02d", shared: true };
    await patchShareTeamResult({ payload })
      .unwrap()
      .then(() => {
        toast.success("Team Result is shared successfully ");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  const handleShare = async (
    isShare: boolean,
    userId: string
  ): Promise<void> => {
    const payload = 
      { id: "65812c5ec70b6baf31a6c02d", shared:!isShare , userId }
    await patchShareTeamResult({ payload })
      .unwrap()
      .then(() => { toast.success(
        `${!isShare ? "Team Result is shared successfully" : "Team Result is unShared now"} `
      );
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

 
  const hasTrueValue = teamResult?.data.some((item) => item.shared === true);

  const columns = [
    {
      accessorFn: ({ user }) => user,
      id: "user",
      cell: ({ row: { original } }) => (
        <Box display="flex" gap="10px" alignItems="center">
          {original?.user && (
            <GlobalAvatar
              imgUrl={original.user.profileImage}
              firstName={original.user.firstName}
              lastName={original.user.lastName}
            />
          )}
          <Box>
            <Typography variant="subtitle1">
              {original?.user
                ? `${original.user.firstName} ${original.user.lastName}`
                : "Unknown User"}
            </Typography>
            <Typography variant="subtitle2" color="neutral.500">
              {original?.user?.employeeTitle || "No Designation"}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <>name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ user: { jobLevel } }) => jobLevel,
      id: "jobLevel",
      cell: ({ getValue }) => getValue(),
      header: () => <>level</>,
      isSortable: false,
    },
    {
      accessorFn: ({ previousPay }) => previousPay,
      id: "previousPay",
      cell: ({ getValue }) => (getValue() ? `£ ${getValue}` : "-"),
      header: () => <>previous Pay</>,
      isSortable: false,
    },
    {
      accessorFn: ({ payIncrease }) => payIncrease,
      id: "payIncrease",
      cell: ({ getValue }) => (getValue() ? `£ ${getValue}` : "-"),
      header: () => <>pay Increase</>,
      isSortable: false,
    },
    {
      accessorFn: ({ newPay }) => newPay,
      id: "newPay",
      cell: ({ getValue }) => (getValue() ? `£ ${getValue}` : "-"),
      header: () => <>new Pay</>,
      isSortable: false,
    },
    {
      accessorFn: ({ payEffectiveDate }) => payEffectiveDate,
      id: "payEffectiveDate",
      cell: ({ getValue }) => dayjs(getValue()).format("DD MMMM YYYY") ?? "-",
      header: () => <>Pay Effective Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ user: { _id: id } }) => id,
      id: "_id",
      cell: ({ getValue }) => (
        <IconButton
          onClick={async () => {
            await handleDetailDrawer(getValue());
          }}
        >
          <RemoveRedEyeIcon />
        </IconButton>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
    {
      accessorFn: ({ shared }) => shared,
      id: "shared",
      cell: ({ getValue, row }) => (
        <Button
          sx={styles.button(getValue())}
          variant={getValue() ? "contained" : "outlined"}
          size="small"
          onClick={async () => {
            await handleShare(getValue(), row?.original?.user?._id);
          }}
        >
          <CheckIcon /> {getValue() ? "Shared" : "Share"}
        </Button>
      ),
      header: () => <>share</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: teamResult?.data,
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isPagination: false,
  };

  return {
    tableData,
    detailDrawer,
    handleDetailDrawer,
    singleTeamResult,
    singleTeamLoading,
    sharedAllHandler,
    hasTrueValue,
  };
}

export const styles = {
  button:(getValue)=> ({ palette: { neutral } }: Theme) => ({
    background: getValue ? "primary.lightest" : "",
    borderColor: getValue
      ? "primary.lightest"
      : ThemeModeColor(neutral[300], neutral[400]),
    color: getValue
      ? "primary.lightest"
      : ThemeModeColor(neutral[600], neutral[400]),
    "&:hover": {
      borderColor: ThemeModeColor(neutral[300], neutral[400]),
    },
  }),
};
