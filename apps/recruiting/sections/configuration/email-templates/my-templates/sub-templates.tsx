import {
  Box,
  Card,
  CardContent,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import { CustomTable } from "common";
import { useState } from "react";
import dayjs from "dayjs";
import {
  useDeleteSubTemplateListMutation,
  useGetSubTemplateByIdQuery,
} from "@services/configuration/email-templates/email-templates-api";
// import Link from "next/link";
import { EditIcon } from "@assets/jobs";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function SubTemplateEmail({ tempId, itemsId }): JSX.Element {
  const router = useRouter();
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  // Get Sub Template API
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetSubTemplateByIdQuery(
      {
        params: {
          templateId: tempId,
        },
      },
      { refetchOnMountOrArgChange: true, skip: itemsId !== tempId }
    );
  // Delete Sub Template API
  const [deleteSubTemplate] = useDeleteSubTemplateListMutation();

  const deleteSubTemplateList = (del): void => {
    deleteSubTemplate(del)
      .unwrap()
      .then(() => {
        toast.success(`Deleted Successfully!`);
      })
      .catch((error: any) => {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      });
  };

  const columns = [
    {
      accessorFn: (row: any) => row?.template_name ?? "---",
      id: "template_name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Templates</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.emailType ?? "---",
      id: "emailType",
      cell: (info: any) => info.getValue(),
      header: () => <span>Templates Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.updatedAt ?? "---",
      id: "updatedAt",
      cell: (info: any) => {
        return (
          <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "---"}</Box>
        );
      },
      header: () => <span>Last Updated</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "---",
      id: "Actions",
      cell: ({ row: { original } }) => {
        const { _id } = original;

        return (
          <Stack flexDirection="row" alignItems="center">
            <Box
              onClick={() => {
                router.push(
                  `/configuration/email-templates/create-email-template/?update_sub_template=${_id}&tempId=${tempId}`
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <EditIcon />
            </Box>
            <IconButton>
              <CloseIcon
                onClick={() => {
                  deleteSubTemplateList(_id);
                }}
                sx={{
                  marginLeft: "10px",
                  color: "warning.dark",
                }}
              />
            </IconButton>
          </Stack>
        );
      },

      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box
      sx={{
        maxHeight: 350,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
        pr: 2,
      }}
    >
      <Card>
        <CardContent sx={{ pt: 2 }}>
          <AccordionDetails>
            <CustomTable
              data={data?.data}
              columns={columns}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              isPagination={false}
              isSuccess={isSuccess}
              showSerialNo={false}
              totalPages={data?.data?.meta?.pages ?? 0}
              currentPage={data?.data?.meta?.page ?? 1}
              onPageChange={(onPageData: any) => {
                setParams({
                  page: onPageData,
                  offset: (onPageData - 1) * 10,
                });
              }}
            />
          </AccordionDetails>
        </CardContent>
      </Card>
    </Box>
  );
}
