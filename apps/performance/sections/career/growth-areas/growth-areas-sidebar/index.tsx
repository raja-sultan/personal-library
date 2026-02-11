"use client";
import { Box, Card, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CustomAccordion } from "./accordion";
import { growthAreasSidebar } from "./growth-areas-sidebar-style";

interface PropTypes {
  sx: SxProps;
  data?: any;
  handleTabChange: (tab: any) => void;
  setSkillId?: any;
  setPlanId?: any;
}
export function GrowthAreasSidebar(props: PropTypes): JSX.Element {
  const { sx, handleTabChange, data, setSkillId, setPlanId } = props;

  const expandedId = data?.[0]?._id || null;
  const selectedId = data?.[0]?.skill?.[0]?._id || null;

  const [expanded, setExpanded] = useState<any>(
    expandedId !== undefined ? expandedId : null
  );
  const [selected, setSelected] = useState(
    selectedId !== undefined ? selectedId : null
  );

  const expandedRef = useRef<any>(null);
  const selectedRef = useRef<any>(null);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    setExpanded(expandedId !== undefined ? expandedId : null);
  }, [expandedId]);

  useEffect(() => {
    setSelected(selectedId !== undefined ? selectedId : null);
  }, [selectedId]);

  const handleAccordionChange = (panel: { _id: string }): void => {
    setExpanded(panel?._id);
  };

  function handleChange(obj: any) {
    setSelected(obj?._id);
    handleTabChange(obj);
  }

  setSkillId(selected);
  setPlanId(expanded);

  return (
    <Card sx={{ ...sx }}>
      {data?.length ? (
        data?.map((obj: any) =>
          !obj?.length ? (
            <CustomAccordion
              key={obj?._id}
              title={obj?.title}
              expanded={expanded === obj?._id}
              handleChange={() => {
                handleAccordionChange(obj);
              }}
            >
              <CustomFilter
                key={obj?._id}
                data={obj?.skill}
                handleClick={handleChange}
                selected={selected}
              />
            </CustomAccordion>
          ) : (
            <CustomFilter
              key={obj?._id}
              data={obj?.skill}
              handleClick={handleChange}
              selected={selected}
            />
          )
        )
      ) : (
        <Box textAlign={"center"}>No Data Found</Box>
      )}
    </Card>
  );
}

function CustomFilter({ data, handleClick, selected }): JSX.Element {
  const styles = growthAreasSidebar();

  return (
    <>
      {data?.map((obj: any) => (
        <Box sx={styles.wrapper(obj?._id, selected)} key={obj?._id}>
          <Typography
            sx={{ whiteSpace: "nowrap" }}
            variant="subtitle2"
            fontWeight="400"
            color="text.secondary"
            onClick={() => handleClick(obj)}
          >
            {obj?.name}
          </Typography>
        </Box>
      ))}
    </>
  );
}
