import React, { useState } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomModal, CustomTable, FormProvider } from "common";
import AddCriteriaModal from "./add-criteria-modal";
import UpdateCriteriaModal from "./update-criteria-modal";
import { useGetOtherCriteriaListApiQuery } from "@services/settings/other-criteria/other-criteria-api";
import dayjs from "dayjs";
import { useAddCriteria } from "./add-criteria-modal/use-add-criteria";
import { AddFormData } from "./other-criteria.data";
import { LoadingButton } from "@mui/lab";

export function OtherCriteriaSection(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
    limit: 10,
  });
  const { data } = useGetOtherCriteriaListApiQuery({ params });

  const { methods, onSubmit, isLoading, openModal, setOpenModal, reset } =
    useAddCriteria();
  const columns = [
    {
      accessorFn: (row: any) => row?.criteriaName ?? "-",
      id: "criteriaName",
      cell: (info: any) => (
        <Box>
          <UpdateCriteriaModal
            label={info.getValue() ?? "-"}
            info={info?.row?.original}
          />
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.recrutingFeild ?? "-",
      id: "recrutingFeild",
      cell: (info: any) => info.getValue(),
      header: () => <span>Recruiting Field</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) =>
        Array.isArray(row.recrutingValues)
          ? row.recrutingValues.join(`\n`)
          : "-",
      id: "recrutingValues",
      cell: (info: any) => info.getValue(),
      header: () => <span>Recruiting Values</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.createdAt ?? "-",
      id: "createdAt",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Date Added</span>,
      isSortable: false,
    },
  ];

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">Other Criteria</Typography>
          <Box ml="auto">
            <AddCriteriaModal />
          </Box>
        </Box>
        <Box mt={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {` A great onboarding experience happens when tasks are completed for a
          new hire in 4 key areas. Plans are generated automatically and are
          determined by a new hire's department, location, employment status and
          any other onboarding criteria you may add. You can also add additional
          tasks individually.`}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            {`To make onboarding plans more flexible, configure onboarding criteria
          other than the new hire's department, location, and employment status
          below.`}
          </Typography>
        </Box>
        <Box mt={2}>
          <Paper variant="elevation" elevation={2}>
            <Box sx={{ py: 2, px: 2, pb: 0.5 }}>
              <CustomTable
                data={data?.data?.criteria}
                columns={columns}
                isLoading={false}
                isFetching={false}
                isError={false}
                isSuccess
                isPagination
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
            </Box>
          </Paper>
        </Box>
      </Box>
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Criteria"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: 500,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
            }}
          >
            <Grid container>
              <Grid xs={12} item my={1}>
                <Typography variant="subtitle2" color="neutral.500">
                  Use Statements when you don’t require an answer from the
                  candidate, whether you need to provide a disclaimer or
                  introduce another section.
                </Typography>
              </Grid>
              {AddFormData.map((form: any) => (
                <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                  <form.component {...form.RhfValue} />
                </Grid>
              ))}
              <Grid xs={12} item>
                <Box mt={1} display="flex">
                  <Box
                    ml="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    px={2}
                  >
                    <Button
                      onClick={() => {
                        setOpenModal(false);
                        reset();
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        height: 35,
                      }}
                      type="submit"
                      loading={isLoading}
                    >
                      Save and Close
                    </LoadingButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}
