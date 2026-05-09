import { Button, Grid } from "@mui/material";
import { CustomModal } from "common";
import React, { useState } from "react";
import { dataArray } from "./data";
import BulkActionModalBox from "./modal";

export default function BulkActionButtons(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [isChangeTaskOpen, setIsChangeTaskOpen] = useState(false);
  const [isUpdateRulesOpen, setIsUpdateRulesOpen] = useState(false);
  const [isEditTaskDateOpen, setIsEditTaskDateOpen] = useState(false);

  return (
    <Grid>
      <Button sx={{ mx: 1 }} variant="contained" size="small">
        {" "}
        Export to CSV
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(true);
        }}
        size="small"
      >
        {" "}
        Bulk Actions
      </Button>
      
      {isOpen && (
        <BulkActionModalBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsReassignOpen={setIsReassignOpen}
          setIsChangeTaskOpen={setIsChangeTaskOpen}
          setIsUpdateRulesOpen={setIsUpdateRulesOpen}
          setIsEditTaskDateOpen={setIsEditTaskDateOpen}
        />
      )}

      {dataArray({
        isReassignOpen,
        setIsReassignOpen,
        isChangeTaskOpen,
        setIsChangeTaskOpen,
        isUpdateRulesOpen,
        setIsUpdateRulesOpen,
        isEditTaskDateOpen,
        setIsEditTaskDateOpen,
      })?.map((ele) => (
        <CustomModal
          key={ele?.id}
          isOpen={ele?.state}
          onClose={ele?.setState}
          rootSx={{
            maxWidth: { xs: 350, md: 550 },
          }}
          headerLabel={ele?.modalBoxHeading}
          closeButtonProps={{
            onClick: () => {
              ele?.setState(false);
            },
          }}
        >
          {ele?.children}
        </CustomModal>
      ))}
    </Grid>
  );
}
