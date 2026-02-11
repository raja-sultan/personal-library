import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { FormSchema, defaultValues, fieldsInfo } from "./form-data";
import { FormProvider, IsFetching } from "common";
import { GenFormField } from "@components/form-fields-generator";
import {
  useLazyGetSingleOpeningInfoQuery,
  useUpdateJobOpeningInfoMutation,
} from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import {
  displayErrorMessage,
  displaySuccessMessage,
} from "@sections/jobs/job-info/utils";
import { ManageOpeningsContext } from "@sections/jobs/job-details/approvals/openings/manage-opening-model/manage-opening-context";

export function ManageOpeningForm({ openingId, closeModel }): JSX.Element {
  const { openingIdsList } = useContext(ManageOpeningsContext);
  const [getOpeningInfo] = useLazyGetSingleOpeningInfoQuery();
  const [updateJobOpeningInfo] = useUpdateJobOpeningInfoMutation();
  const [openingFormInfoCon, setOpeningFormInfoCon] = useState({
    isLoading: true,
  });
  const jobOpeningId = openingId !== "" ? openingId : openingIdsList?.[0]?._id;
  const methods: any = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: async () => {
      if (!jobOpeningId) {
        setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
        return defaultValues;
      }

      const { data, isError, error } = await getOpeningInfo(
        { openingId: jobOpeningId },
        false
      );
      setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      if (isError || !data?.data) {
        displayErrorMessage(error);
        return defaultValues;
      }

      const { status, openDate, targetStartDate, closeDate, closeReason } =
        data?.data;
      return {
        openingId: data?.data?.openingId || "",
        status,
        openDate: new Date(openDate),
        tgtStartDate: new Date(targetStartDate),
        closeDate: new Date(closeDate),
        closeRes: closeReason,
      };
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: true }));
    const jsonPayload = {
      ...data,
      targetStartDate: data?.tgtStartDate,
      closeReason: data?.closeRes,
    };
    try {
      const res = await updateJobOpeningInfo({
        payload: jsonPayload,
        openingId: jobOpeningId,
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
          { openingId: jobOpeningId },
          true
        ).unwrap();
        const { status, openDate, targetStartDate, closeDate, closeReason } =
          data;
        methods.reset({
          openingId: data?.openingId || "",
          status,
          openDate: new Date(openDate),
          tgtStartDate: new Date(targetStartDate),
          closeDate: new Date(closeDate),
          closeRes: closeReason,
        });
        setOpeningFormInfoCon((pre) => ({ ...pre, isLoading: false }));
      } catch (error) {
        displayErrorMessage(error);
      }
    };
    void getInfoForOpening();
  }, [jobOpeningId]);
  if (!jobOpeningId || openingFormInfoCon.isLoading)
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
        <Grid container gap={1.5} item xs={12}>
          {/* Dynamically Generated Fields  */}
          {fieldsInfo.map((item: any, index: number) => {
            const props = item?.OuterConProps ? item?.OuterConProps : {};
            return (
              <GenFormField
                key={index}
                item={item}
                isSubmitting={isSubmitting}
                disabled={false}
                {...props}
              />
            );
          })}
          <Grid
            item
            xs={12}
            sx={{
              padding: "0.5em",
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
