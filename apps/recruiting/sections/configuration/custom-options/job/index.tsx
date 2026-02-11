import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomOptionsCard } from "../custom-option-card";
import { AddFieldModal } from "./add-field-modal";
import { useLazyGetSingleJobFieldsDataQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";

export function Job(): React.JSX.Element {
  const [addField, setAddField] = useState<any>(false);
  const [editData, setEditData] = useState<any>([]);
  const params = { resourceType: "job", section: "" };
  const [getSingleData] = useLazyGetSingleJobFieldsDataQuery();

  return (
    <Box>
      <Typography variant="h6">Manage Jobs Fields</Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Configure fields to record information on candidates
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
