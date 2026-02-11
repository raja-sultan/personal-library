import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { JobApprovalContext } from "../../use-job-approval-context";

export default function BasicMenu() {
  const { jobApprovalInfoCon, toExtendOffersToCandidateOrderChangeHan } =
    useContext(JobApprovalContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (btnName: string) => {
    if (btnName !== "") {
      toExtendOffersToCandidateOrderChangeHan(btnName);
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        variant="outlined"
        color="primary"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {jobApprovalInfoCon.toExtendOffersToCandidateOrder}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose("");
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose("in_order");
          }}
        >
          in_order
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("all_at_once");
          }}
        >
          all_at_once
        </MenuItem>
      </Menu>
    </div>
  );
}
