import { TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem, Box, Rating } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useDeleteOneOnOneByIdMeetingsAndMeetingIdMutation,
  useGetOneOnOneByIdHistoryQuery,
  usePatchOneOnOneByIdMeetingsCancelMutation,
} from "@services/one-on-ones/one-on-ones-api";
import dayjs from "dayjs";
import type { IReturnType } from "./view-history.types";
import { useGetProfileQuery, useGetUserProfileQuery } from "@services/profile/profile-api";
import toast from "react-hot-toast";

export function useViewHistory(): IReturnType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oneOnOneId = searchParams.get("id");
  const userID = searchParams.get("userId");
  const teamHistoryType = searchParams.get("type");
  const [selectedFilter, setSelectedFilter] = useState([]);
  const queryParams: any = {};

  const keyMap = {
    employmentStartDate: "meetingDate",
    createdBy: "createdBy",
    contentAddedBy: "contentAddedBy",
  };

  selectedFilter.forEach(({ name, value }) => {
    if (!queryParams[keyMap[name]]) {
      value && (queryParams[keyMap[name]] = value);
    }
  });

  const {
    data: viewHistory,  
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetOneOnOneByIdHistoryQuery({
    ...(oneOnOneId && { oneOnOneId }),  
    ...(userID && { userID }),  
    ...queryParams  
  });

  const { data: userDetails } = useGetUserProfileQuery(userID);
  const { data: profileDetails } = useGetProfileQuery({});
  const viewHistoryDetails: { _id: string; fullName: string } =
    viewHistory?.data?.meetingDetails?.userDetail;
  const [openCancelMeetingModal, setOpenCancelMeetingModal] = useState(false);
  const [openDeleteMeetingModal, setOpenDeleteMeetingModal] = useState(false);
  const [oneOnOneCancelMeeting, { isLoading: isCancelLoading }] =
    usePatchOneOnOneByIdMeetingsCancelMutation();
  const [oneOnOneDeleteMeeting, { isLoading: isDeleteLoading }] =
    useDeleteOneOnOneByIdMeetingsAndMeetingIdMutation();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const [meetingObj, setMeetingObj] = useState<any>({});



  function toggleFilterDrawer(): void {
    setFilterDrawer(!filterDrawer);
  }

  const createdByFilterData = [
    {
      id: viewHistoryDetails?._id ?? "",
      name: viewHistoryDetails?.fullName ?? "",
      value: viewHistoryDetails?._id ?? "",
    },
    {
      id: profileDetails?.data?._id ?? "",
      name: `${profileDetails?.data?.firstName ?? ""} ${profileDetails?.data?.lastName ?? ""
        }`,
      value: profileDetails?.data?._id,
    },
  ];

  function changeFilterHandler({ target: { value } }: any): void {
    setSearchValues(value);
  }

  function handleTableCancelAction(): void {
    setOpenCancelMeetingModal(!openCancelMeetingModal);
  }

  function handleTableDeleteAction(): void {
    setOpenDeleteMeetingModal(!openDeleteMeetingModal);
  }

  async function handleCancelMeeting(): Promise<void> {
    try {
      await oneOnOneCancelMeeting({
        id: oneOnOneId,
        meetingId: meetingObj._id,
      }).unwrap();
      setOpenCancelMeetingModal(false);
      toast.success("1 on 1 is canceled successfully");
    } catch (error) {
      toast.error(error?.data?.message ?? "One on one meeting not found");
    }
  }

  async function handleDeleteMeeting(): Promise<void> {
    try {
      await oneOnOneDeleteMeeting({
        id: oneOnOneId,
        meetingId: meetingObj._id,
      }).unwrap();
      setOpenDeleteMeetingModal(false);
      toast.success("1 on 1 is deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  const upcomingColumns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ getValue }) => dayjs(getValue()).format("MMMM DD, YYYY"),
      header: () => <>meeting Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdByName }) => createdByName,
      id: "createdBy",
      cell: ({ getValue }) => getValue(),
      header: () => <>created By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentAddedBy }) => contentAddedBy,
      id: "contentAddedBy",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Added By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ rating }) => rating,
      id: "rating",
      cell: ({ row: { original } }) => {
        return original?.rating ? (
          <Box display="flex" alignItems="center" gap="6px">
            <Rating
              name="read-only"
              value={original?.rating}
              readOnly
              sx={{ color: "warning.main" }}
            />
            {original?.rating}
          </Box>
        ) : (
          "-"
        );
      },
      header: () => <>rating</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  router.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${oneOnOneId}&meetingId=${original?._id}&status=${original?.status?.toLowerCase()}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableCancelAction();
                  setMeetingObj(original);
                }}
              >
                Cancel 1-on-1
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const currentColumns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ getValue }) => dayjs(getValue()).format("MMMM DD, YYYY"),
      header: () => <>meeting Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdByName }) => createdByName,
      id: "createdBy",
      cell: ({ getValue }) => getValue(),
      header: () => <>created By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentAddedBy }) => contentAddedBy,
      id: "contentAddedBy",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Added By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ attendeeRating }) => attendeeRating,
      id: "rating",
      cell: ({ row: { original } }) => {
        return original?.attendeeRating ? (
          <Box display="flex" alignItems="center" gap="6px">
            <Rating
              name="read-only"
              value={original?.attendeeRating}
              readOnly
              sx={{ color: "warning.main" }}
            />
            {original?.attendeeRating}
          </Box>
        ) : (
          "-"
        );
      },
      header: () => <>rating</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  router.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${oneOnOneId}&meetingId=${original?._id}&status=${original?.status?.toLowerCase()}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableCancelAction();
                  setMeetingObj(original);
                }}
              >
                Cancel 1-on-1
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const pastColumns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ getValue }) => dayjs(getValue()).format("MMMM DD, YYYY"),
      header: () => <>meeting Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ endedByName }) => endedByName,
      id: "Ended by",
      cell: ({ getValue }) => getValue(),
      header: () => <>Ended By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ contentAddedBy }) => contentAddedBy,
      id: "contentAddedBy",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Added By</>,
      isSortable: false,
    },
    {
      accessorFn: ({ rating }) => rating,
      id: "rating",
      cell: ({ row: { original } }) => {
        return original?.organizerRating ? (
          <Box display="flex" alignItems="center" gap="6px">
            <Rating
              name="read-only"
              value={original?.organizerRating}
              readOnly
              sx={{ color: "warning.main" }}
            />
            {original?.organizerRating}
          </Box>
        ) : (
          "-"
        );
      },
      header: () => <>rating</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  router.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${oneOnOneId}&meetingId=${original?._id}&status=${original?.status?.toLowerCase()}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableDeleteAction();
                  setMeetingObj(original);
                }}
              >
                Delete 1-on-1
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const generateOneOnOneData = (data: string, columns: any) => ({
    data: viewHistory?.data?.[data],
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isPagination: false,
  });

  const upcomingOneOnOneData = generateOneOnOneData(
    "upcoming",
    upcomingColumns
  );
  const pastOneOnOneData = generateOneOnOneData("past", pastColumns);
  const currentOneOnOneData = generateOneOnOneData("current", currentColumns);

  const filterList = [
    {
      key: "meetingDate",
      title: "Meeting Date",
      startDate: true,
    },
    {
      key: "createdBy",
      title: "Created By",
      titleList: createdByFilterData,
    },
    {
      key: "contentAddedBy",
      title: "Content Added By",
      titleList: createdByFilterData,
    },
  ];

  return {
    upcomingOneOnOneData,
    filterList,
    toggleFilterDrawer,
    selectedFilter,
    setSelectedFilter,
    filterDrawer,
    searchValues,
    changeFilterHandler,
    handleTableCancelAction,
    openCancelMeetingModal,
    router,
    viewHistory,
    pastOneOnOneData,
    currentOneOnOneData,
    handleCancelMeeting,
    openDeleteMeetingModal,
    handleDeleteMeeting,
    handleTableDeleteAction,
    isDeleteLoading,
    isCancelLoading,
    userDetails,
    teamHistoryType
  };
}
