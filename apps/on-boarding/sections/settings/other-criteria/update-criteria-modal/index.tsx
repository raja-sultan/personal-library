import { Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider, WarningPrompt } from "common";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { AddFormData, DefValue } from "../other-criteria.data";
import {
  useDeleteOtherCriteriaMutation,
  usePutOtherCriteriaMutation,
} from "@services/settings/other-criteria/other-criteria-api";
import toast from "react-hot-toast";

function UpdateCriteriaModal({ label, info }: any): JSX.Element {
  const [rowData, setRowData] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [updateOtherCriteria] = usePutOtherCriteriaMutation();
  const [deleteCriteria] = useDeleteOtherCriteriaMutation();
  async function onCriteriaDelete(id): Promise<void> {
    try {
      const res: any = await deleteCriteria(id).unwrap();
      toast.success(res?.message ?? `Deleted Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  }
  const methods = useForm({
    defaultValues: DefValue,
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...rowData,
      recrutingFeild: {
        id: rowData?.recrutingFeild === "Job" ? 1 : 2,
        firstLetter: rowData?.recrutingFeild,
        name: "Employment Type",
        value: rowData?.recrutingFeild,
      },
      recrutingValues: rowData?.recrutingValues?.map((items, index) => {
        return {
          id: index === 0 ? 1 : index + 1,
          name: items,
          value: items,
        };
      }),
    }));
  }, [rowData, reset]);
  const onSubmit = handleSubmit(async (data: any) => {
    const values = data?.recrutingValues?.map((items: any) => {
      return items?.value.toString();
    });
    try {
      const res: any = await updateOtherCriteria({
        body: {
          criteriaName: data?.criteriaName,
          recrutingFeild: data?.recrutingFeild?.value,
          recrutingValues: values,
        },
        criteriaId: rowData?._id,
      }).unwrap();
      reset();
      setOpenModal(false);
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          setOpenModal(true);
          setRowData(info);
        }}
      >
        {label}
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
                  <form.component control={control} {...form.RhfValue} />
                </Grid>
              ))}
              <Grid xs={12} item>
                <Box mt={1} display="flex">
                  <WarningPrompt
                    mainColor="error.main"
                    heading="Alert"
                    subTitle="Are you sure you want to delete Criteria?"
                    modelOpenLabel={
                      <Button size="small" color="error" variant="contained">
                        Delete
                      </Button>
                    }
                    acceptButtonLabel="Delete"
                    acceptButtonProps={{
                      onClick: () => {
                        void onCriteriaDelete(rowData?._id);
                      },
                      variant: "contained",
                      color: "error",
                      sx: {
                        color: "white",
                      },
                    }}
                  />
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

export default UpdateCriteriaModal;
