import * as React from "react";
import Popover from "@mui/material/Popover";

import { List, ListItem, ListItemText } from "@mui/material";

interface PopOverProps {
  isOpen: boolean;
  data: { id: string; label: string }[];
  handleClose: (event: React.MouseEvent, reason: "backdropClick" | "escapeKeyDown") => void;
  onItemClick: (item: { id: string; label: string }) => void;
}

export default function CustomPopover(props: PopOverProps): JSX.Element {
  const { isOpen, handleClose, data, onItemClick } = props;

  const handleItemClick = (item: { id: string; label: string }): void => {
    onItemClick(item);
  };

  return (
    <Popover
      disableScrollLock
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={styles.popOverStyle}
    >
      {data.map((item) => {
        return (
          <List sx={styles.listWrapper} key={item.id}>
            <ListItem
              onClick={() => {
                handleItemClick(item);
              }}
              sx={styles.listItem}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          </List>
        );
      })}
    </Popover>
  );
}
// styles

const styles = {
  popOverStyle: {
    borderRadius: "8px !important",
    boxShadow:
      "0px 0px 1px 0px rgba(76, 93, 112, 0.30), 0px 4px 8px 0px rgba(76, 93, 112, 0.30) !important",
  },
  listWrapper: {
    width: "100%",
    maxWidth: 360,
    p: 0.4,
    m: 0,
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F2F4F7 !important",
      borderRadius: "4px !important",
    },
  },
};
