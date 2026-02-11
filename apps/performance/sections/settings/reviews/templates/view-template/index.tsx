"use client";
import { FormProvider, NoContentFound } from "common";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useViewTemplates } from "./use-view-template";
import { ViewQuestionTypes } from "../view-questions-types";

export function ViewTemplate({ id }): JSX.Element {
  const methods = useForm<any>({
    defaultValues: {
      multiSelect: [],
      radioName: "",
    },
  });

  const { viewData } = useViewTemplates(id);

  return (
    <Box sx={styles}>
      <FormProvider methods={methods}>
        {viewData?.data?.questions?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50rem",
            }}
          >
            <NoContentFound />
          </Box>
        ) : (

          viewData?.data?.questions?.map((item) =>
            <Box key={item?._id} padding="0.3rem">

              <ViewQuestionTypes
                type={item?.type}
                textBoxCheck={item?.allowComment}
                options={item?.options?.map((btnData) => btnData)}
                // handleChange={(val: string) => setValue(item.name, val)}
                title={item?.description}
                // points={item?.list}
                textFieldProps={{
                  name: `textbox${item?._id}`,
                  placeholder: 'Enter your response...'
                }}
                multiCheckProps={{
                  name: "multiSelect",
                  options: item?.options.map((value) => ({ label: value, value }))
                }}
                radioOptionsProps={{
                  name: "radioName",
                  options: item?.options.map((value) => ({ label: value, value })),
                }}
              />
            </Box>

          )
        )}
      </FormProvider>
    </Box>
  );
}

const styles = {
  overflowY: "scroll",
  height: "60rem",
  "&::-webkit-scrollbar": {
    width: "0px",
  },
};