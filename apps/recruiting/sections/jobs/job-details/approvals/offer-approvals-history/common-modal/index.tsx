import { Button, Divider } from "@mui/material";
import { CustomChip, CustomModal } from "common";
import { useState } from "react";
import { Approved } from "../approved";
import { Pending } from "../pending";

export function ApprovalsHistoryModals({
  requestStatus,
  apiData,
}: {
  requestStatus: any;
  apiData: any;
}): JSX.Element {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  //Status Function
  function getColorBasedOnStatus(
    data: any
  ): "success" | "warning" | "danger" | "started" {
    if (data === "Approved") {
      return "success";
    } else if (data === "Pending") {
      return "warning";
    }
    return "started";
  }
  if (!openCategory) {
    return (
      <Button
        sx={{ display: "flex", justifyContent: "flex-start" }}
        onClick={() => {
          setOpenCategory(true);
        }}
      >
        <CustomChip
          ChipProps={{ label: requestStatus }}
          variant={getColorBasedOnStatus(requestStatus)}
        />
      </Button>
    );
  }

  return (
    /*Custom Modal*/
    <>
      <Button
        sx={{ display: "flex", justifyContent: "flex-start" }}
        onClick={() => {
          setOpenCategory(true);
        }}
      >
        <CustomChip
          ChipProps={{ label: requestStatus }}
          variant={getColorBasedOnStatus(requestStatus)}
        />
      </Button>
      <CustomModal
        onClose={() => {
          setOpenCategory(false);
        }}
        rootSx={{
          maxWidth: { xs: 350, sm: 900 },
        }}
        headerLabel={requestStatus === "Approved" ? "Approvals" : "Approvals"}
        closeButtonProps={{
          onClick: () => {
            setOpenCategory(false);
          },
        }}
        isOpen={openCategory}
      >
        <Divider sx={{ height: "1.5px", backgroundColor: "divider" }} />

        {requestStatus === "Approved" ? (
          <Approved reqData={apiData} />
        ) : (
          <Pending reqData={apiData} />
        )}
      </CustomModal>
    </>
  );
}
