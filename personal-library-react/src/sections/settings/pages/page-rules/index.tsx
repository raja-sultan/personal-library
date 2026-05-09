"use client";

import { Button, Divider, Grid, Typography } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFSwitch,
  RHFTextField,
} from "common";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, border } from "@mui/system";
import { useRouter } from "next/navigation";
import { PageDetailForm } from "./page-detail-form";
import {
  useLazyGetDepartmentListQuery,
  useLazyGetOfficeListQuery,
} from "@services/settings/emails/emails-api";
import { useGetCriteriaListQuery } from "@services/settings/tasks/tasks-api";
import { usePostPagesMutation } from "@services/settings/pages/pages-api";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  // other fields...
  // location: Yup.string().required("location is required"),
  // department: Yup.string().required("Department is required"),
  // status: Yup.string().required("Status is required"),
  // criteria: Yup.string().required("Criteria is required"),
  title: Yup.string().required("Title is required"),
});

export function PageRules(): JSX.Element {
  const router = useRouter();
  const [postPage] = usePostPagesMutation();

  const locationList = useLazyGetOfficeListQuery();
  const departmentList = useLazyGetDepartmentListQuery();
  const { data: criteriaList } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      location: [],
      department: [],
      status: [],
      criteria: [],
      title: "",
      published: false,
      textField: [],
      url: [],
      eSignature: [],
      document: [],
    },
  });

  const { handleSubmit, control } = methods;
  const textFieldArray = useFieldArray({
    control,
    name: "textField",
  });
  const urlFieldArray = useFieldArray({
    control,
    name: "url",
  });
  const eSignatureArray = useFieldArray({
    control,
    name: "eSignature",
  });
  const imageArray = useFieldArray({
    control,
    name: "document",
  });

  const onSubmit = async (formData: any) => {
    console.log("formData", formData);

    const pageRules = {
      department: formData?.department?.map((item) => item?._id),
      location: formData?.location?.map((item) => item?._id),
      status: formData?.status?.map((item) => item?.value),
      criteria: formData?.criteria?.map((item) => item?.value),
    };
    const pagesData = new FormData();
    pagesData.append("pageRules", JSON.stringify(pageRules));
    pagesData.append("title", formData.title);
    pagesData.append("published", formData.published);
    pagesData.append(
      "textField",
      JSON.stringify(
        formData?.textField?.map((item) => ({ text: item?.textField }))
      )
    );
    pagesData.append(
      "url",
      JSON.stringify(formData?.url?.map((item) => ({ url: item?.url })))
    );
    pagesData.append(
      "eSignature",
      JSON.stringify(formData?.eSignature?.map((item) => ({ text: item.name })))
    );
    console.log(formData?.document);

    formData.document.map((item: any) => pagesData.append("document", item));
    // pagesData.append(
    //   "document",
    //   formData?.document?.map((item: any) => item)
    // );
    const body = pagesData;
    // const body = {
    //   title: formData?.title,
    //   published: formData?.published,
    //   Filter: {
    //     department: formData?.department?.map((item: any) => item?._id),
    //     location: formData?.location?.map((item: any) => item?._id),
    //     status: formData?.status?.map((item: any) => item?.value),
    //     criteria: formData?.criteria?.map((item: any) => item?.value),
    //   },
    //   url: formData?.url?.map((item: any) => ({ url: item?.url })),
    //   textField: formData?.textField?.map((item: any) => ({
    //     text: item?.textField,
    //   })),
    //   document: formData?.document?.map((item: any) => item?.path),
    //   eSignature: formData?.eSignature?.map((item: any) => ({
    //     text: item,
    //   })),
    // };
    console.log("body", body);

    await postPage({ body })
      .unwrap()
      .then(() => {
        toast.success("Page Added Successfully");
        router.push("/settings/pages");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };
  // const editPageHandler = (page: any) => {
  //   console.log("id", page);
  // };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item md={12}>
          <Typography variant="h6">Page Rules</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutocompleteAsync
            multiple
            name="location"
            placeholder="Any Location"
            outerLabel="Location Matches"
            getOptionLabel={(option: any) => option?.officeName}
            disableCloseOnSelect={false}
            apiQuery={locationList}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutocompleteAsync
            multiple
            outerLabel="Department Matches"
            name="department"
            getOptionLabel={(option: any) => option?.departmentName}
            disableCloseOnSelect={false}
            apiQuery={departmentList}
            placeholder="Any Department"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutocompleteSync
            multiple
            limitTags={4}
            name="status"
            outerLabel="Employment Status Matches"
            placeholder="Any Employment Status"
            options={[
              { id: 1, label: "Part Time", value: "Part Time" },
              { id: 2, label: "Full Time", value: "Full Time" },
              { id: 3, label: "Contract", value: "PART_TIME" },
              // { id: 4, label: "Permanent", value: "Permanent" },
              { id: 4, label: "Intern", value: "Intern" },
              { id: 5, label: "Temporary", value: "Temporary" },
              { id: 6, label: "Terminated", value: "terminated" },
            ]}
            getOptionLabel={(option: any) => option?.label}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutocompleteSync
            multiple
            name="criteria"
            outerLabel="Other Criteria"
            placeholder="Any Criteria"
            options={
              criteriaList?.data?.criteria.length
                ? criteriaList?.data?.criteria?.map((item: any) => {
                    return {
                      id: item._id,
                      name: item.criteriaName,
                      value: item._id,
                    };
                  })
                : []
            }
          />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" marginTop={2}>
            Page Details
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="title"
            outerLabel="Title *"
            placeholder="Page Title"
          />
          <Box margin={2}>
            <RHFSwitch name="published" label="Published" />
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <PageDetailForm
        urlFieldArray={urlFieldArray}
        textFieldArray={textFieldArray}
        eSignatureArray={eSignatureArray}
        imageArray={imageArray}
      />
      <Stack
        direction={{ sm: "row", xs: "column-reverse" }}
        justifyContent="space-between"
        alignItems="center"
        mt={5}
      >
        <Button
          onClick={() => {
            router.push("/settings/pages");
          }}
          variant="contained"
          sx={{
            color: "neutral.200",
            borderColor: "neutral.300",
            marginTop: "20px",
            width: "100%",
            maxWidth: {
              sm: "155px",
              xs: "100%",
            },
          }}
        >
          Back to All Pages
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "neutral.200",
            borderColor: "neutral.300",
            marginTop: "20px",
            width: "100%",
            maxWidth: {
              sm: "155px",
              xs: "100%",
            },
          }}
        >
          Save
        </Button>
      </Stack>
    </FormProvider>
  );
}
