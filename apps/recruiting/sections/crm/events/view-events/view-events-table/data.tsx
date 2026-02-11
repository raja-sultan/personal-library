import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import { displaySuccessMessage } from "@sections/jobs/job-info/utils";
import { TableIconActions } from "common";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export const useViewEventsColumns = () => {
  const router = useRouter();
  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    displaySuccessMessage({ data: { message: "Event link copied " } });
  };
  const viewEventsTableColumns = [
    {
      accessorFn: (row: any) => row.eventDetails?.eventName,
      id: "en",
      cell: (info: any) => info.getValue(),
      header: () => <span>Event Name</span>,
    },

    {
      accessorFn: (row: any) => row.eventDetails?.startDate,
      id: "startDate",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),
      header: () => <span>Date</span>,
    },
    {
      accessorFn: (row: any) => row.eventDetails.location,
      id: "location",
      cell: (info: any) => info.getValue(),
      header: () => <span>Location</span>,
    },
    {
      accessorFn: (row: any) => row.eventDetails?.prospectPool?.name,
      id: "prospects",
      cell: (info: any) => info.getValue() ?? "---",
      header: () => <span>Prospects</span>,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              router.push(
                `/create-event?action=view&event_id=${original?._id}`
              );
            }}
          >
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(
                `/create-event?action=edit&event_id=${original?._id}`
              );
            }}
          >
            Edit Details
          </MenuItem>
          <MenuItem onClick={() => copyUrl(original?.url)}>Copy Link</MenuItem>
        </TableIconActions>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  return {
    viewEventsTableColumns,
  };
};
