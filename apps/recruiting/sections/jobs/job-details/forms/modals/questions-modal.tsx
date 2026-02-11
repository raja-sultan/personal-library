import { Box } from "@mui/system";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteSync,
  RHFCheckbox,
  // RHFRadioGroup,
  RHFTextField,
} from "common";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { EditIcon } from "@assets/icons/edit-icon";

export default function QuestionsModal(props): JSX.Element {
  const { open, onClose, submittedData, questionsDetails } = props;
  const emptyFieldValues = {
    question: "",
    answerType: {
      options: false,
      title: "Short Text",
      value: "ShortText",
    },
    options: [],
    required: false,
  };

  const methods = useForm({
    resolver: yupResolver(
      Yup.object({
        question: Yup.string().required("Question is required"),
        answerType: Yup.mixed().required("Answer type is required"),
        options: Yup.array()
          .of(Yup.string().required("Field should not be empty"))
          .when("answerType", {
            is: (answerType) => answerType.options,
            then: (schema) => schema.min(2),
            otherwise: (schema) => schema.min(0),
          }),
      })
    ),
    defaultValues: emptyFieldValues,
  });
  const {
    handleSubmit,
    watch,
    resetField,
    reset,
    formState,
    setValue,
    trigger,
  }: any = methods;
  const answerType: any = watch("answerType");
  const onSubmit = (data): void => {
    submittedData({
      ...data,
      answerType: data.answerType.value,
    });
    reset();
  };

  useEffect(() => {
    !answerType?.options && resetField("options");
  }, [resetField, answerType]);
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        onClose(false);
      }}
      rootSx={{ width: 700 }}
      headerLabel="Add Custom Question"
      closeButtonProps={{
        onClick: () => {
          onClose(false);
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" color="text.secondary" display="flex">
          <Typography
            variant="subtitle2"
            color={questionsDetails.length ? "success.main" : "text.secondary"}
            pr={0.5}
            mb={1}
          >
            {questionsDetails.length}
          </Typography>
          Questions Added
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="question"
            outerLabel="Question"
            multiline
            minRows={4}
          />
          <Divider sx={{ my: 2 }} />
          <RHFAutocompleteSync
            disableCloseOnSelect={false}
            name="answerType"
            fullWidth
            outerLabel="Answers"
            isOptionEqualToValue={(option: any, newValue: any) =>
              option.value === newValue.value
            }
            getOptionLabel={(option) => option.title}
            renderOption={false}
            options={answerTypeOptions}
          />
          <Divider sx={{ my: 2 }} />

          {answerType?.options && (
            <>
              {/* <RHFAutocompleteSync
                disableCloseOnSelect={false}
                name="options"
                freeSolo
                fullWidth
                outerLabel="Options"
                multiple
                getOptionLabel={(option: string) => option}
                renderOption={false}
                options={[]}
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
              /> */}
              <OptionsDropdown
                errors={formState?.errors?.options}
                options={(options) => {
                  setValue("options", options);
                }}
                trigger={trigger}
              />
              <Divider sx={{ my: 2 }} />
            </>
          )}
          <Divider sx={{ my: 2 }} />
          {answerType?.value !== "YesNo" && (
            <RHFCheckbox name="required" label="Required" />
          )}
          <Box display="flex" justifyContent="flex-end" my={1} gap={2}>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                onClose(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color={questionsDetails.length ? "success" : "primary"}
            >
              {questionsDetails.length ? "Add More" : "Add"}
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}

const answerTypeOptions = [
  // { title: "Select", value: undefined, options: false },
  {
    options: false,
    title: "Short Text",
    value: "ShortText",
  },
  {
    options: false,
    title: "Long Text",
    value: "LongText",
  },
  {
    options: false,
    title: "Yes/No",
    value: "YesNo",
  },
  {
    options: true,
    title: "Single Select",
    value: "SingleSelect",
  },
  {
    options: true,
    title: "Multi Select",
    value: "MultiSelect",
  },
];
function OptionsDropdown(props): JSX.Element {
  const { errors, options, trigger } = props;
  const [fields, setFields] = useState([
    { value: "", index: "0", disabled: false },
    { value: "", index: "1", disabled: false },
  ]);

  function onChangeHandler(e) {
    setFields((prev) => {
      const newValues = prev.map((item) => {
        if (e.target.name === item.index) {
          return { ...item, value: e.target.value };
        }
        return item;
      });
      return newValues;
    });
  }
  function onDoneHandler(index: string) {
    setFields((prev) => {
      const newValues = prev.map((item) => {
        if (index === item.index) {
          return { ...item, disabled: !item.disabled };
        }
        return item;
      });
      return newValues;
    });
    trigger("options");
  }

  useEffect(() => {
    options(fields.map((val) => val.value));
    trigger("options");
  }, [fields]);
  return (
    <>
      <Box maxHeight="250px" overflow="auto">
        {fields?.length ? (
          fields.map((value, i) => (
            <Box key={value.index} my={1}>
              <TextField
                label={`option# ${i + 1}`}
                name={value.index}
                variant="outlined"
                value={value.value}
                disabled={value.disabled}
                size="small"
                error={errors?.[i]?.message}
                helperText={errors?.[i]?.message}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
              <IconButton
                onClick={() => {
                  trigger("options");
                  const newFields = fields.filter(
                    (val) => val.index !== value.index
                  );
                  setFields(newFields);
                }}
              >
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "error.main",
                    border: 1,
                    borderRadius: "100%",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  onDoneHandler(value.index);
                }}
              >
                {value.disabled ? (
                  <EditIcon />
                ) : (
                  <DoneIcon
                    fontSize="small"
                    sx={{
                      color: "success.main",
                      border: 1,
                      borderRadius: "100%",
                    }}
                  />
                )}
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography variant="caption" pl={2} color="error">
            No Options added
          </Typography>
        )}
      </Box>
      {errors?.message && (
        <Typography variant="caption" color="error">
          {errors?.message}
        </Typography>
      )}
      <Button
        onClick={() => {
          trigger("options");
          setFields((prev: any) => [
            ...prev,
            { value: "", index: String(prev.length), disabled: false },
          ]);
        }}
      >
        {fields.length ? "Add Another" : "Add Option"}
      </Button>
    </>
  );
}
