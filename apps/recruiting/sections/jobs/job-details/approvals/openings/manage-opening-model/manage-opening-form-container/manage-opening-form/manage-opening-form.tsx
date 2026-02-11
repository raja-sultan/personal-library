import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { FormSchema, defaultValues, fieldsInfo } from "./form-data";
import { FormProvider, IsFetching, RHFAutocompleteAsync } from "common";
import { GenFormField } from "@components/form-fields-generator";
import {
  useLazyGetDropDownCloseReasonsListQuery,
  useLazyGetSingleOpeningInfoQuery,
  useUpdateJobOpeningInfoMutation,
} from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import {
  displayErrorMessage,
  displaySuccessMessage,
} from "@sections/jobs/job-info/utils";
import { Box } from "@mui/system";

export function ManageOpeningForm({ openingId, closeModel }): JSX.Element {
  const [getOpeningInfo] = useLazyGetSingleOpeningInfoQuery();
  const [updateJobOpeningInfo] = useUpdateJobOpeningInfoMutation();
  const closeReasonsList = useLazyGetDropDownCloseReasonsListQuery({});
  const [getDropDownCloseReasonsList] = closeReasonsList;
  const [openingFormInfoCon, setOpeningFormInfoCon] = useState({
    isLoading: true,
  });
  const methods: any = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: async () => {
      if (!openingId) {
        setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
        return defaultValues;
      }

      const { data, isError } = await getOpeningInfo({
        openingId: openingId,
      });

      const { data: DropDownCloseReasonsList } =
        await getDropDownCloseReasonsList({}).unwrap();

      setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      if (isError || !data?.data) {
        return defaultValues;
      }
      const { status, openDate, targetStartDate, closeDate, closeReasonId } =
        data?.data;
      const filterCloseReasons = DropDownCloseReasonsList.closeReason.filter(
        (list) => list._id === closeReasonId
      );
      return {
        openingId: data?.data?.openingId || "",
        status,
        openDate: new Date(openDate),
        targetStartDate: new Date(targetStartDate),
        closeDate: new Date(closeDate),
        closeReasonId: filterCloseReasons[0],
      };
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;
  const minTargetDate = watch("openDate");
  const minCloseDate = watch("targetStartDate");
  const onSubmit = async (data: any) => {
    setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: true }));
    const payload = {
      status: data.status,
      openDate: data.openDate,
      targetStartDate: data.targetStartDate,
      closeDate: data.closeDate,
      closeReasonId: data.closeReasonId._id,
      openingId: data.openingId,
      customFields: {},
    };
    try {
      const res = await updateJobOpeningInfo({
        params: {
          openingId,
        },
        body: payload,
      }).unwrap();
      displaySuccessMessage(res);
      setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      //   please create a generic util for displaying success or error message
    } catch (error: any) {
      displayErrorMessage(error);
      setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
    }
  };

  useEffect(() => {
    const getInfoForOpening = async () => {
      setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: true }));
      try {
        const { data } = await getOpeningInfo(
          { openingId: openingId },
          true
        ).unwrap();
        const { data: DropDownCloseReasonsList } =
          await getDropDownCloseReasonsList({}).unwrap();

        const filterCloseReasons = DropDownCloseReasonsList.closeReason.filter(
          (list) => list._id === closeReasonId
        );
        const { status, openDate, targetStartDate, closeDate, closeReasonId } =
          data;

        const newData = {
          openingId: data?.openingId || "",
          status,
          openDate: new Date(openDate),
          targetStartDate: new Date(targetStartDate),
          closeDate: new Date(closeDate),
          closeReasonId: filterCloseReasons[0] ?? {},
        };
        await reset(newData);
        setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      } catch (error) {
        //displayErrorMessage(error);
        setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      }
    };
    void getInfoForOpening();
  }, [getDropDownCloseReasonsList, getOpeningInfo, openingId, methods, reset]);

  if (!openingId || openingFormInfoCon.isLoading)
    return <IsFetching isFetching />;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center">
        <Grid item sm={12} container>
          <Grid
            item
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6" color="text.primary">
              Openings
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="clear" onClick={closeModel}>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        <IsFetching isFetching={openingFormInfoCon.isLoading} />
        <Grid container gap={1} item xs={12}>
          {/* Dynamically Generated Fields  */}
          {fieldsInfo(minTargetDate, minCloseDate).map(
            (item: any, index: number) => {
              const props = item?.OuterConProps ? item?.OuterConProps : {};
              if (item.name === "closeReasonId") {
                return (
                  <Box key={index} width="100%" px={1} mb={1}>
                    <RHFAutocompleteAsync
                      multiple={false}
                      name={item.name}
                      placeholder="Select Option"
                      outerLabel={item.outerLabel}
                      apiQuery={closeReasonsList}
                      getOptionLabel={(option: any) => option?.closeReason}
                      transformResponse={(res) => {
                        return res?.data?.closeReason;
                      }}
                    />
                  </Box>
                );
              }
              return (
                <GenFormField
                  key={index}
                  item={item}
                  isSubmitting={isSubmitting}
                  disabled={false}
                  {...props}
                />
              );
            }
          )}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={closeModel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: "0.5em" }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
