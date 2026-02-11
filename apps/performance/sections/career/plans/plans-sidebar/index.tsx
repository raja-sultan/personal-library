import { Box, Card, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { careerPlanSidebar } from "./plan-sidebar-style";

interface TabData {
  _id: string;
  label: string;
  value: string;
}
interface PropTypes {
  sx: SxProps;
  data?: {
    _id: string;
    title: string;
  }[];
  handleTabChange: (tab: TabData) => void;
}
export function PlansSidebar(props: PropTypes): JSX.Element {
  const { sx, handleTabChange, data } = props;
  const [selectedItem, setSelectedItem] = useState<any>(
    data && data.length > 0 ? data?.[0]?._id : null
  );
  
  useEffect(() => {
    if (
      data &&
      data.length > 0 &&
      !data.find((obj) => obj._id === selectedItem)
    ) {
      setSelectedItem(data?.[0]?._id);
    }
  }, [data, selectedItem]);

  function handleChange(obj: any): void {
    setSelectedItem(obj._id);
    handleTabChange(obj);
  }

  const styles = careerPlanSidebar();

  return (
    <Card sx={{ ...sx }}>
      {data?.map((obj) => {
        const isSelected = selectedItem === obj._id;
        return (
          <CustomFilter
            key={obj._id}
            data={obj}
            handleClick={handleChange}
            selected={isSelected}
            styles={styles.wrapper(obj._id, selectedItem)}
          />
        );
      })}
    </Card>
  );
}

function CustomFilter({ data, handleClick, selected, styles }): JSX.Element {
  return (
    <Box sx={styles} key={data?._id} onClick={() => handleClick(data)}>
      <Typography
        sx={{ whiteSpace: "nowrap" }}
        variant="subtitle2"
        fontWeight="400"
        color={selected ? "primary" : "text.secondary"}
      >
        {data.title}
      </Typography>
    </Box>
  );
}
