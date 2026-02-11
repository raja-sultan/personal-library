"use client";
import React, { Fragment } from "react";
import CustomCard from "@components/custom-card";
import { Box, Divider, Grid, Typography, Button } from "@mui/material";
import { styles } from "./create-group.style";
import { FormProvider } from "common";
import SelectEmployeesModal from "@components/select-employees-modal";
import { createFormData } from "./create-group-data";
import { useCreateGroup } from "./use-create-group";

interface Ititle {
  title: string;
  userId?: string;
}
export function CreateGroupSection({
  title,
  userId,

}: Ititle): JSX.Element {
  const {
    onAdd,
    handleOpen,
    onSubmit,
    router,
    employeesModal,
    methods,
    setEmployeesModal,
    handleSubmit,
    selectedMember,
    groupId,
  } = useCreateGroup(userId);


  return (
    <CustomCard
      header
      cardHeader={{
        title: userId ? title : "Create Group",
        divider: true,
        onBack: () => {
          userId
            ? router.push(`/settings/groups/view/?viewId=${userId}`)
            : router.push("/settings/groups");
        },
      }}
    >
      <Box mt="2.5rem">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {createFormData.map(({ divider, fields, head, id, subText }) => (
            <Fragment key={id}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <Typography
                    fontWeight={600}
                    variant="h6"
                    color="text.primary"
                  >
                    {head}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize="1.4rem"
                    mt="1.6rem"
                    color="text.secondary"
                  >
                    {subText}
                  </Typography>
                </Grid>
                <Grid item lg={4} xs={12}>
                  {fields?.map((field) => (
                    <field.component
                      key={field.id}
                      fullWidth
                      sx={{ mb: "2rem" }}
                      {...field.componentProps}
                    >
                      {null}
                    </field.component>
                  ))}
                </Grid>
              </Grid>
              {divider && <Divider sx={{ my: 3 }} />}
            </Fragment>
          ))}
          <Grid container>
            <Grid item lg={6}>
              <Box sx={styles.card}>
                <Box>
                  <Typography
                    fontWeight={600}
                    variant="subtitle1"
                    color="text.primary"
                  >
                    Add and remove group members
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Select members to add or remove from this group. Group
                    members will not update unless you make changes to them.
                  </Typography>
                </Box>
                {/* <RHFSwitch name="switch" /> */}
                <Button onClick={handleOpen}>Add</Button>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "1rem",
              mt: 5,
            }}
          >
            <Button
              type="button"
              onClick={() => {
                router.push("/settings/groups");
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </FormProvider>
      </Box>

      {employeesModal && (
        <SelectEmployeesModal
          isOpen={employeesModal}
          setIsOpen={setEmployeesModal}
          onAdd={onAdd}
          selectedMember={selectedMember}
        />
      )}
    </CustomCard>
  );
}
