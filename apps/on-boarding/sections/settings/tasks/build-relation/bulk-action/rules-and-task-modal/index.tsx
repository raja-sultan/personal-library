import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useLazyGetDepartmentsQuery } from "@services/settings/emails/choreographed-email-api";
import {
  useGetCriteriaListQuery,
  useLazyGetOfficeQuery,
  usePatchAllTasksMutation,
} from "@services/settings/tasks/tasks-api";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

/**********************
    Resign Modal 
 *********************/
export function EditRulesModal({
  rulesModal,
  setRulesModal,
  rowsIds,
}): JSX.Element {
  const schema = Yup.object({
    employmentStatus: Yup.string().required("Required"),
    departmentId: Yup.object()
      .nullable()
      .test("check null", "Required", (value) => value !== null),
    locationId: Yup.object()
      .nullable()
      .test("check null", "Required", (value) => value !== null),
    criteriaId: Yup.object()
      .nullable()
      .test("check null", "Required", (value) => value !== null),
  });
  const departmentList = useLazyGetDepartmentsQuery();
  const locationList = useLazyGetOfficeQuery();
  const { data: criteriaDetails } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      departmentId: null,
      locationId: null,
      employmentStatus: "",
      criteriaId: null,
    },
  });
  const [patchAllActions] = usePatchAllTasksMutation();

  const { handleSubmit } = methods;

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("departmentId", data.departmentId._id);
    formData.append("locationId", data.locationId._id);
    formData.append("employmentStatus", data.employmentStatus);
    formData.append("criteriaId", data.criteriaId.id);
    try {
      await patchAllActions({
        body: formData,
        taskId: { tasksId: rowsIds },
      }).unwrap();
      toast.success(`Task Updated Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

  return (
    <CustomModal
      isOpen={rulesModal}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Edit Rules"
      closeButtonProps={{
        onClick: () => {
          setRulesModal(false);
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Typography sx={{ my: 2 }} variant="subtitle1">
          Applies to new hires whose:
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <RHFAutocompleteAsync
              outerLabel="Department Matches"
              name="departmentId"
              getOptionLabel={(option: any) => option?.departmentName}
              disableCloseOnSelect={false}
              apiQuery={departmentList}
              placeholder="Any Department"
            />
          </Grid>
          <Grid item xs={6}>
            <RHFAutocompleteAsync
              outerLabel="Location Matches"
              name="locationId"
              getOptionLabel={(option: any) => option?.location}
              disableCloseOnSelect={false}
              apiQuery={locationList}
              placeholder="Any Location"
            />
          </Grid>
          <Grid item xs={6}>
            <RHFCustomSelect
              name="employmentStatus"
              outerLabel="Employment Status"
              placeholder="Any Employment Status"
              options={[
                {
                  id: 1,
                  label: "Contact",
                  value: "Contact",
                },
                {
                  id: 2,
                  label: "Full Time",
                  value: "Full Time",
                },
                {
                  id: 3,
                  label: "Part Time",
                  value: "Part Time",
                },
                {
                  id: 4,
                  label: "Temporary",
                  value: "Temporary",
                },
                {
                  id: 5,
                  label: "Intern",
                  value: "intern",
                },
                {
                  id: 6,
                  label: "Terminated",
                  value: "terminated",
                },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFAutocompleteSync
              name="criteriaId"
              outerLabel="Other Criteria"
              placeholder="Any Criteria"
              options={
                criteriaDetails?.data?.criteria.length
                  ? criteriaDetails?.data?.criteria?.map((item) => {
                      return {
                        id: item._id,
                        name: item.criteriaName,
                        value: item.criteriaName,
                      };
                    })
                  : []
              }
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              setRulesModal(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ ml: 1 }}>
            Clear Rules
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export function TaskModal({ taskModal, setTaskModal, rowsIds }): JSX.Element {
  const newSchema = Yup.object({
    date: Yup.string().required("Required"),
    assign: Yup.string().required("Required"),
  });

  const methods = useForm<any>({
    resolver: yupResolver(newSchema),
    defaultValues: {
      date: "",
      assign: "",
    },
  });

  const [patchAllActions] = usePatchAllTasksMutation();

  const { handleSubmit } = methods;

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("assign", data.assign);
    try {
      await patchAllActions({
        body: formData,
        taskId: { tasksId: rowsIds },
      }).unwrap();
      toast.success(`Task Updated Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

  return (
    <CustomModal
      isOpen={taskModal}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Edit Task Due Date"
      closeButtonProps={{
        onClick: () => {
          setTaskModal(false);
        },
      }}
    >
      <Box
        sx={{
          maxWidth: { md: 650, xs: 350, sm: 450 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
          pr: 2,
          mt: 1.5,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="date"
                outerLabel="Due Date"
                options={[
                  {
                    id: 1,
                    label: "On Start Date",
                    value: "on_start_date",
                  },
                  {
                    id: 2,
                    label: "On Due Date",
                    value: "on_due_date",
                  },
                  {
                    id: 3,
                    label: "Custom",
                    value: "custom",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <RHFTextField name="assign" placeholder="7" outerLabel="Assign" />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                days before due date
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                setTaskModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>
              Update
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
