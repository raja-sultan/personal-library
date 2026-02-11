import React from "react";
import { CustomChip } from "common";
import { Box } from "@mui/material";

const renderTypeChip = {
  Default: "primary",
  Custom: "danger",
};

export const data = [
  {
    name: "Admin",
    members: 1,
    type: "Default",
  },
  {
    name: "Manager of Manager's",
    members: 3,
    type: "Default",
  },
  {
    name: "Manager",
    members: 6,
    type: "Default",
  },
  {
    name: "Employee",
    members: 10,
    type: "Default",
  },
  {
    name: "Coordinator",
    members: 8,
    type: "Custom",
  },
  {
    name: "HR Associate",
    members: 2,
    type: "Custom",
  },
  {
    name: "Intern",
    members: 9,
    type: "Custom",
  },
];

export const mappedData = data.map((item) => {
  return {
    name: item.name,
    members: item.members,
    type: (
      <Box>
        <CustomChip
          variant={renderTypeChip[item.type]}
          ChipProps={{ label: item.type }}
        />
      </Box>
    ),
  };
});
