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
import Link from "next/link";
import { EditIcon } from "@assets/jobs";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import toast from "react-hot-toast";

export function OrganizationSubTemplates({ tempId, itemsId }): JSX.Element {
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

  const deleteSubTemplateList = async (del) => {
    try {
      await deleteSubTemplate(del).unwrap();
      toast.success(`Deleted Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

  const columns = [
    {
      accessorFn: (row: any) => row?.template_name ?? "---",
      id: "template_name",
      cell: (info: any) => info.getValue(),
      header: () => <span></span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.emailType ?? "---",
      id: "emailType",
      cell: (info: any) => info.getValue(),
      header: () => <span></span>,
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
      header: () => <span></span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "---",
      id: "Actions",
      cell: ({ row: { original } }) => {
        const { _id } = original;

        return (
          <Stack flexDirection="row" alignItems="center">
            <Link
              href={`/configuration/email-templates/create-email-template?update_sub_template=${_id}`}
            >
              <EditIcon />
            </Link>
            <IconButton>
              <CloseIcon
                onClick={() => {
                  void deleteSubTemplateList(_id);
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

      header: () => <span></span>,
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
