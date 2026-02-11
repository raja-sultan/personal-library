import { Button, Grid, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";
import {
  scheduleADemoData,
  scheduleADemoSchemaModel,
} from "./company-management.data";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useScheduleDemoMutation } from "@services/company-management-api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

export default function ScheduleADemoFrom({
  apiData,
  submitLabel,
}: {
  submitLabel?: string;
  apiData?: any;
}): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const devalue: any = {};
  for (const key in apiData) {
    if (key === "email") {
      devalue[key] = apiData[key];
    }
    if (key === "firstName") {
      devalue.name = `${apiData[key]} ${apiData.lastName}`;
    }
    if (key === "_id") {
      devalue.id = apiData[key];
    }
  }

  const methods = useForm({
    defaultValues: devalue,
    resolver: yupResolver(scheduleADemoSchemaModel),
  });

  const { control, handleSubmit } = methods;
  //API HANDLERS
  const [scheduleADemo, { isLoading }] = useScheduleDemoMutation();

  async function onSubmit(data: any): Promise<any> {
    try {
      const { message } = await scheduleADemo({
        body: {
          ...data,
        },
      }).unwrap();
      toast.success(message || "Demo Scheduled successfully");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  }

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Schedule a Demo
      </MenuItem>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Schedule a Demo"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {scheduleADemoData.map((form: any) => (
              <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                <form.component control={control} {...form.RhfValue} />
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
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      width: 80,
                      height: 35,
                    }}
                    type="submit"
                  >
                    {submitLabel ? submitLabel : "Add"}
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
