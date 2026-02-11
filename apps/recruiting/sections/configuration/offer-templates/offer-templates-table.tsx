import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  useDeleteOfferTemplateMutation,
  useGetOfferTemplateListApiQuery,
} from "@services/configuration/offer-template/offer-template-api";
import {
  CustomModal,
  CustomTable,
  FormProvider,
  TableIconActions,
  WarningPrompt,
} from "common";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useUploadModal } from "./use-upload-modal";
import { uploadModalDefaultValues } from "./offer-template.data";
import { useState } from "react";

export function OfferTemplatesTable({
  openUploadModal,
  setOpenUploadModal,
}: any): React.JSX.Element {
  const [page, setPage] = useState<any>({
    page: 1,
    offset: 0,
  });
  const { data } = useGetOfferTemplateListApiQuery({
    limit: 10,
    offset: page.offset,
  });
  const {
    methods,
    onSubmit,
    UploadModalFormData,
    reset,
    setTemplateId,
    loading,
    getDataIsLoading,
    templateId,
    isLoading,
    isFetching,
  } = useUploadModal({ setOpenUploadModal });

  const [deleteTemplate] = useDeleteOfferTemplateMutation();

  async function onTemplateDelete(id): Promise<void> {
    try {
      const res: any = await deleteTemplate(id).unwrap();
      toast.success(res?.message ?? `Deleted Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  }
  const handleCancel = (): void => {
    reset(uploadModalDefaultValues);
    setTemplateId(null);
    setOpenUploadModal(false);
  };
  const columns = [
    {
      accessorFn: (row: any) => row?.templateName ?? "-",
      id: "templateName",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Templates Name</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.updatedAt ?? "-",
      id: "updatedAt",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("MMM D,YYYY")}</Box>;
      },
      header: () => <span>Last Updated</span>,
      isSortable: false,
    },

    {
      id: "Actions",
      cell: (info: any) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              setTemplateId(info.row.original._id);
              setOpenUploadModal(true);
            }}
          >
            Edit
          </MenuItem>
          <WarningPrompt
            mainColor="error.main"
            heading="Delete Offer Template"
            subTitle="You are sure you want to delete this? This action is not reversible"
            modelOpenLabel={
              <MenuItem>
                <Typography variant="subtitle2">Delete</Typography>
              </MenuItem>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                void onTemplateDelete(info.row.original._id);
              },
              variant: "contained",
              color: "error",
              sx: {
                bgcolor: "error.main",
                color: "primary.contrastText",
              },
            }}
          />
        </TableIconActions>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <>
      <CustomTable
        data={data?.data?.offerTemplate}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isSuccess
        isPagination
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setPage({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
      <CustomModal
        onClose={() => {
          handleCancel();
        }}
        rootSx={{
          maxWidth: { md: 700, xs: 350, sm: 600 },
          height: "82%",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            width: "0px",
          },
        }}
        headerLabel={`${!templateId ? "Upload New" : "Edit"}  Offer Template`}
        closeButtonProps={{
          onClick: () => {
            handleCancel();
          },
        }}
        isOpen={openUploadModal}
      >
        {getDataIsLoading || isFetching ? (
          <Stack>
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} width={100} />
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} width={100} />
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} width={100} />
            <Skeleton animation="wave" height={80} width={100} />
          </Stack>
        ) : (
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container rowGap={2} sx={{ py: 2 }}>
              {UploadModalFormData?.map((item) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item.componentProps} />
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" justifyContent="flex-end" columnGap={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading || isLoading}
              >
                Save
              </LoadingButton>
            </Stack>
          </FormProvider>
        )}
      </CustomModal>
    </>
  );
}
