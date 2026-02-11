import React from "react";
import { Draggable } from "react-beautiful-dnd";
import type { IDraggableListItem } from "./types";
import { Box } from "@mui/material";

export function DnDDraggableListItem(props: IDraggableListItem): JSX.Element {
  const {
    children,
    getItemStyle = () => {},
    draggableId,
    index,
    applyOffset = true,
    isDraggableContainer = false,
  } = props;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          if (applyOffset) {
            provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
            provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
          }
        }
        return (
          <>
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              sx={
                getItemStyle(snapshot.isDragging, provided.draggableProps) || {}
              }
            >
              {children}
            </Box>
            {snapshot.isDragging && isDraggableContainer && (
              <Box
                sx={{
                  padding: "16px",
                  background: "white",
                  margin: "0 0 8px 0",
                  borderRadius: "5px",
                }}
              >
                {children}
              </Box>
            )}
          </>
        );
      }}
    </Draggable>
  );
}
