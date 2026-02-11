import { TableIconActions } from "common";
import type { ChangeEvent } from "react";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem, Box } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOneOnOneLogIdHistoryQuery } from "@services/settings/one-on-ones/one-on-one-log-api";
import toast from "react-hot-toast";
import {
  useDeleteOneOnOneByIdMeetingsAndMeetingIdMutation,
  usePatchOneOnOneByIdMeetingsCancelMutation,
} from "@services/one-on-ones/one-on-ones-api";
import { useGetProfileQuery } from "@services/profile/profile-api";

interface ReturnType {
  upcomingOneOnOneData?: CustomTableProps;
  currentOneOnOneData?: CustomTableProps;
  pastOneOnOneData?: CustomTableProps;
  filterList: any;
  toggleFilterDrawer: () => void;
  selectedFilter: any;
  setSelectedFilter: any;
  filterDrawer: boolean;
  searchValues: string;
  changeFilterHandler: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
  handleTableCancelAction: any;
  openCancelMeetingModal: boolean;
  viewHistory?: any;
  handleCancelOneOnOne?: any;
  isCancelLoading?: any;
  openDeleteMeetingModal?: any;
  isDleteLoading?: any;
  handleTableDeleteAction?: any;
  handleDeleteOneOnOne?: any;
}

export function useHistory(): ReturnType {
  const route = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("id");
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [searchValues, setSearchValues] = useState<string>("");
  // const [filter, setFilter] = useState<Filter>({ limit: 10, offset: 0 });
  const [openCancelMeetingModal, setOpenCancelMeetingModal] = useState(false);
  const [openDeleteMeetingModal, setOpenDeleteMeetingModal] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [oneOnOneId, setOneOnOneId] = useState("");
  const queryParams: any = {};

  const keyMap = {
    employmentStartDate: "meetingDate",
    createdBy: "createdBy",
    contentAddedBy: "contentAddedBy",
    contentType: "contentType",
  };

  selectedFilter.forEach(({ name, value }) => {
    if (!queryParams[keyMap[name]]) {
      value && (queryParams[keyMap[name]] = value);
    }
  });

  const toggleFilterDrawer = (): void => {
    setFilterDrawer(!filterDrawer);
  };

  function changeFilterHandler({ target: { value } }: any): void {
    setSearchValues(value);
  }

  function handleTableCancelAction(): void {
    setOpenCancelMeetingModal(!openCancelMeetingModal);
  }

  function handleTableDeleteAction(): void {
    setOpenDeleteMeetingModal(!openDeleteMeetingModal);
  }
  const {
    data: viewHistory,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetOneOnOneLogIdHistoryQuery({
    userID,
    ...queryParams,
  });
  // const [cancelOneOnOne] = usePatchOneOnOneByIdMeetingsCancelMutation();
  const [cancelOneOnOne, { isLoading: isCancelLoading }] =
    usePatchOneOnOneByIdMeetingsCancelMutation();

  const [deleteOneOnOne, { isLoading: isDleteLoading }] =
    useDeleteOneOnOneByIdMeetingsAndMeetingIdMutation();

  const { data: profileDetails } = useGetProfileQuery({});
  const viewHistoryDetails: { _id: string; fullName: string } =
    viewHistory?.data?.meetingDetails?.userDetail;

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
  
  async function handleDeleteOneOnOne(): Promise<void> {
    try {
      await deleteOneOnOne({
        id: oneOnOneId,
        meetingId: meetingId,
      }).unwrap();
      setOpenDeleteMeetingModal(false);
      toast.success("1 on 1 is Deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message ?? "One on one meeting not found");
      setOpenDeleteMeetingModal(false);
    }
  }

  async function handleCancelOneOnOne(): Promise<void> {
    try {
      await cancelOneOnOne({
        id: oneOnOneId,
        meetingId: meetingId,
      }).unwrap();
      setOpenCancelMeetingModal(false);
      toast.success("1 on 1 is canceled successfully");
    } catch (error) {
      toast.error(error?.data?.message ?? "One on one meeting not found");
      setOpenCancelMeetingModal(false);
    }
  }

  const upcomingColumns = [
    {
      accessorFn: ({ date }) => date,
      id: "meetingDate",
      // cell: ({ getValue }) => getValue(),
      cell: ({ date }) => {
        const formattedDate = dayjs(date).format("MMM D , YYYY");
        return `${formattedDate}`;
      },
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
    // {
    //   accessorFn: ({ content }) => content,
    //   id: "content",
    //   cell: ({ getValue }) => getValue(),
    //   header: () => <>content</>,
    //   isSortable: false,
    // },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ organizerRating }) => organizerRating,
      id: "rating",
      cell: ({ getValue }) => (
        <Box display="flex" alignItems="center" gap="6px">
          {getValue() ? (
            <StarRateRoundedIcon sx={{ color: "warning.main" }} />
          ) : (
            "--"
          )}
          {getValue()}
        </Box>
      ),
      header: () => <>rating</>,
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
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  route.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${row?.original?.oneOnOneId}&meetingId=${row?.original?._id}&status=${row?.original?.status}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableCancelAction();
                  setMeetingId(row?.original?._id);
                  setOneOnOneId(row?.original?.oneOnOneId);
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
      id: "meetingDate",
      // cell: ({ getValue }) => getValue(),
      cell: ({ date }) => {
        const formattedDate = dayjs(date).format("MMM D , YYYY");
        return `${formattedDate}`;
      },
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
    // {
    //   accessorFn: ({ content }) => content,
    //   id: "content",
    //   cell: ({ getValue }) => getValue(),
    //   header: () => <>content</>,
    //   isSortable: false,
    // },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ organizerRating }) => organizerRating,
      id: "rating",
      cell: ({ getValue }) => (
        <Box display="flex" alignItems="center" gap="6px">
          {getValue() ? (
            <StarRateRoundedIcon sx={{ color: "warning.main" }} />
          ) : (
            "--"
          )}
          {getValue()}
        </Box>
      ),
      header: () => <>rating</>,
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
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  route.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${row?.original?.oneOnOneId}&meetingId=${row?.original?._id}&status=${row?.original?.status}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableCancelAction();
                  setMeetingId(row?.original?._id);
                  setOneOnOneId(row?.original?.oneOnOneId);
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
      id: "meetingDate",
      // cell: ({ getValue }) => getValue(),
      cell: ({ date }) => {
        const formattedDate = dayjs(date).format("MMM D , YYYY");
        return `${formattedDate}`;
      },
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
    // {
    //   accessorFn: ({ content }) => content,
    //   id: "content",
    //   cell: ({ getValue }) => getValue(),
    //   header: () => <>content</>,
    //   isSortable: false,
    // },
    {
      accessorFn: ({ contentType }) => contentType,
      id: "contentType",
      cell: ({ getValue }) => getValue(),
      header: () => <>content Type</>,
      isSortable: false,
    },
    {
      accessorFn: ({ organizerRating }) => organizerRating,
      id: "rating",
      cell: ({ getValue }) => (
        <Box display="flex" alignItems="center" gap="6px">
          {getValue() ? (
            <StarRateRoundedIcon sx={{ color: "warning.main" }} />
          ) : (
            "--"
          )}
          {getValue()}
        </Box>
      ),
      header: () => <>rating</>,
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
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row }) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  route.push(
                    `/one-on-ones/view-history/view-one-on-one?id=${row?.original?.oneOnOneId}&meetingId=${row?.original?._id}&status=${row?.original?.status}`
                  );
                }}
              >
                View History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleTableDeleteAction();
                  setMeetingId(row?.original?._id);
                  setOneOnOneId(row?.original?.oneOnOneId);
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
  const upcomingOneOnOneData: CustomTableProps = {
    data: viewHistory?.data?.upcoming,
    columns: upcomingColumns,
    isPagination: false,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
  const currentOneOnOneData: CustomTableProps = {
    data: viewHistory?.data?.current,
    columns: currentColumns,
    isPagination: false,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
  const pastOneOnOneData: CustomTableProps = {
    data: viewHistory?.data?.past,
    columns: pastColumns,
    isPagination: false,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };

  const filterList = [
    {
      key: "contentType",
      title: "Content Type",
      titleList: [
        {
          id: "1.1",
          name: "Note",
          value: "Note",
        },
        {
          id: "1.2",
          name: "Action Item",
          value: "Action Item",
        },
        {
          id: "1.3",
          name: "Discussion Point",
          value: "Discussion Point",
        },
        {
          id: "1.4",
          name: "Comments",
          value: "Comments",
        },
      ],
    },
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
    currentOneOnOneData,
    pastOneOnOneData,
    filterList,
    toggleFilterDrawer,
    selectedFilter,
    setSelectedFilter,
    filterDrawer,
    searchValues,
    changeFilterHandler,
    handleTableCancelAction,
    openCancelMeetingModal,
    viewHistory,
    handleCancelOneOnOne,
    isCancelLoading,
    openDeleteMeetingModal,
    isDleteLoading,
    handleTableDeleteAction,
    handleDeleteOneOnOne,
  };
}
