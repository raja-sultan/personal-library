import { Typography } from "@mui/material";
import dayjs from "dayjs";

export const referralsColumn = [
  {
    accessorFn: (row: any) =>
      `${row?.nameAndCompany?.firstName} ${row?.nameAndCompany?.lastName}`,
    id: "referalName",
    cell: (info: any) => (
      <Typography variant="body1">{info.getValue() ?? "---"}</Typography>
    ),
    header: () => <Typography variant="body1">Referrals Name</Typography>,
  },
  {
    accessorFn: (row: any) => row.refereFor,
    id: "refereFor",
    cell: (info: any) => (
      <Typography variant="body1">{info.getValue() ?? "---"}</Typography>
    ),
    header: () => <Typography variant="body1">Referred For</Typography>,
  },
  {
    accessorFn: (row: any) => row.stage,
    id: "stage",
    cell: (info: any) => (
      <Typography variant="body1">{info.getValue() ?? "---"}</Typography>
    ),
    header: () => <Typography variant="body1">Stage</Typography>,
  },
  {
    accessorFn: (row: any) => row.createdAt,
    id: "createdAt",
    cell: (info: any) => (
      <Typography variant="body1">
        {dayjs(info.getValue()).format("MMMM DD, YYYY") ?? "---"}
      </Typography>
    ),
    header: () => <Typography variant="body1">Referral Date</Typography>,
  },
];
