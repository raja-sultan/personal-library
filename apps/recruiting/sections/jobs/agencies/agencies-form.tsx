import { Button, Grid, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";

import { useState } from "react";
import { AddFormData, AddFormDataValue } from "./agencies-form-data";
import { style } from "./agencies-style";

export function AgenciesModelFrom({
  // submitLabel,
  data,
}: {
  submitLabel?: string;
  data?: any;
}): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("add");
  const methods = useForm({
    //  resolver: yupResolver(formSchemaModel),
    defaultValues: AddFormDataValue,
  });

  const { handleSubmit } = methods;
  console.log("my data", data);
  function onSubmit(values: any): void {
    console.log("Submitted: ", values);
    setOpenModal(false);
  }

  return (
    <>
      <MenuItem
        onClick={() => {
          setType("edit");
          setOpenModal(true);
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          setType("view");
          setOpenModal(true);
        }}
      >
        View
      </MenuItem>

      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="View Agency"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {AddFormData.map((item) => {
              const { component: Component, componentProps } = item;
              return (
                <Grid item xs={12} md={6} lg={item?.grid} key={item?.id}>
                  <Component {...componentProps} />
                </Grid>
              );
            })}
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
                    sx={style.modelButtons}
                  >
                    Cancel
                  </Button>
                  {type === "edit" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      sx={style.modelButtons}
                    >
                      save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      sx={style.modelButtons}
                    >
                      update
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
