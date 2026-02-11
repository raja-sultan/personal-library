import React, { useState } from "react";
import { CustomOptionsCard } from "../custom-option-card";
import { Box, Typography } from "@mui/material";
import { RejectionQuestionFieldsModal } from "./rejection-question-modal";
import { rejectionQuestionArray } from "./rejection-question-data";

export function RejectionQuestion(): JSX.Element {
  const [addField, setAddField] = useState({ open: false, id: null });
  // const [deleteField, setDeleteField] = useState<any>({
  //   open: false,
  //   id: null,
  // });

  // const deleteCardOptionFunction = (): void => {
  //   setDeleteField(false);
  //   console.log(deleteField.cardList.id);
  //   // console.log(applicationArray?.id);
  // };

  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        marginBottom={1}
        color="neutral.900"
      >
        Manage rejection question fields
      </Typography>
      <Typography
        variant="subtitle2"
        component="h5"
        marginBottom={5}
        color="neutral.700"
      >
        Configure custom questions to collect additional information on why
        candidate was rejected from job
      </Typography>
      <RejectionQuestionFieldsModal
        addField={addField}
        setAddField={setAddField}
        // addHandler={addHandler}
      />

      <CustomOptionsCard
        customOptionsArray={rejectionQuestionArray}
        // addHandler={addHandler}
        setAddField={setAddField}
        // deleteField={deleteField}
        // setDeleteField={setDeleteField}
        // deleteCardOptionFunction={deleteCardOptionFunction}
      />
    </Box>
  );
}
