import { Button, Chip, Divider, Typography, Box } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFTextField,
} from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

enum EInputType {
  ShortText = "ShortText",
  LongText = "LongText",
  YesNo = "YesNo",
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
}

export default function FormPreview(props): JSX.Element {
  const { formData, disabled = false } = props;

  let allQuestions: any = [];

  formData?.forEach((element) => {
    allQuestions = element && [...allQuestions, ...element.questions];
  });
  //-------------------------------------//--------------------------------------//
  //constructing Initial Values
  const initialValues: any = allQuestions
    .map((el) => {
      let initialValue: string | boolean | string[];
      if (el.answerType === EInputType.YesNo) {
        initialValue = false;
      } else if (el.answerType === EInputType.MultiSelect) {
        initialValue = [];
      } else {
        initialValue = "";
      }
      return { [el.question]: initialValue };
    })
    .reduce((acc, obj) => {
      const key: any = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});
  //-------------------------------------//--------------------------------------//
  //constructing Form Schema
  const formSchema: any = allQuestions
    .map((el) => {
      const schema =
        el.answerType === EInputType.MultiSelect
          ? Yup.array().min(1, "At least one entry required")
          : Yup.string();
      return el.required
        ? {
            [el.question]: schema.required("required"),
          }
        : null;
    })
    .filter((val) => val !== null)
    .reduce((acc, obj) => {
      const key: any = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});
  //-------------------------------------//--------------------------------------//

  const methods = useForm({
    resolver: yupResolver(Yup.object(formSchema)),
    defaultValues: initialValues,
  });
  const { handleSubmit }: any = methods;
  const onSubmit = (data): void => {
    disabled ? console.log("view Only") : console.log(data);
  };
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {formData.map((section, index) => (
          <Box key={section.name !== "" ? section.name : index}>
            <Typography variant="h6" my={1}>
              {section.name && <Divider sx={{ my: 1 }} />}
              {section.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" my={1}>
              {section.statement}
              {section.statement && <Divider sx={{ my: 1 }} />}
            </Typography>
            <FormSection questions={section.questions} />
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          {Boolean(formData.length) && (
            <Button type="submit" variant="contained" disabled={disabled}>
              Submit
            </Button>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
}
function FormSection(props): JSX.Element {
  const { questions } = props;
  function inputGenerator(
    answerType,
    label,
    options,
    required
  ): JSX.Element | undefined {
    switch (answerType) {
      case EInputType.ShortText:
        return (
          <RHFTextField
            name={label}
            outerLabel={`${label} ${required ? "*" : ""}`}
          />
        );
      case EInputType.LongText:
        return (
          <RHFTextField
            multiline
            minRows={4}
            name={label}
            outerLabel={`${label} ${required ? "*" : ""}`}
          />
        );
      case EInputType.YesNo:
        return <RHFCheckbox name={label} label={label} />;
      case EInputType.SingleSelect:
        return (
          <RHFAutocompleteSync
            disableCloseOnSelect={false}
            name={label}
            fullWidth
            outerLabel={`${label} ${required ? "*" : ""}`}
            isOptionEqualToValue={(option: any, newValue: any) =>
              option === newValue
            }
            getOptionLabel={(option) => option}
            renderOption={false}
            options={["", ...options]}
          />
        );
      case EInputType.MultiSelect:
        return (
          <RHFAutocompleteSync
            name={label}
            fullWidth
            outerLabel={`${label} ${required ? "*" : ""}`}
            multiple
            getOptionLabel={(option: string) => option}
            renderOption={false}
            options={["", ...options]}
            // options={["1", "2"]}
            isOptionEqualToValue={(option: any, newValue: any) =>
              option === newValue
            }
            renderTags={(value: readonly string[], getTagProps) =>
              value?.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  key={option}
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        );
    }
  }

  return (
    <>
      {questions.length &&
        questions.map((question) =>
          inputGenerator(
            question.answerType,
            question.question,
            question.options,
            question.required
          )
        )}
    </>
  );
}
