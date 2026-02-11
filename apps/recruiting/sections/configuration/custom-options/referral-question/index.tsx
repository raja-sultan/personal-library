import React, { useState } from "react";
import { CustomOptionsCard } from "../custom-option-card";
import { Box, Typography } from "@mui/material";
import { useLazyGetSingleJobFieldsDataQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { AddFieldModal } from "./add-field-modal";

export function ReferralQuestionSec(): JSX.Element {
  const [addField, setAddField] = useState<any>({ open: false, id: null });
  const [editData, setEditData] = useState<any>([]);
  const params = { resourceType: "referral_question", section: "" };
  const [getSingleData] = useLazyGetSingleJobFieldsDataQuery();

  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        marginBottom={1}
        color="neutral.900"
      >
        Manage basic referral question fields
      </Typography>
      <Typography
        variant="subtitle2"
        component="h5"
        marginBottom={5}
        color="neutral.700"
      >
        Manage basic referral question fields
      </Typography>

      <CustomOptionsCard
        params={params}
        setAddField={setAddField}
        onEditHandler={async (id) => {
          try {
            const res = await getSingleData({
              params: { fieldId: id },
            });
            setEditData(res.data?.data);
            setAddField({ open: true, id });
          } catch (error) {
            console.log(error);
          }
        }}
      />

      <AddFieldModal
        resourceType={params.resourceType}
        editData={editData}
        addField={addField}
        setAddField={setAddField}
        setEditData={setEditData}
      />
    </Box>
  );
}
