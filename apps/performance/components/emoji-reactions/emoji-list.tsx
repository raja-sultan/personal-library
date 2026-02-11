import React from "react";

import { emojiData } from "./data";
import { Box, type SxProps, Typography } from "@mui/material";

interface DataItem {
  title: string;
  defaultIcon: JSX.Element;
  activeIcon: JSX.Element;
}

interface EmojiListProps {
  selectedEmoji: any;
  onEmojiClick?: (title: string) => void;
  rootSx?: SxProps;
}

function EmojiList({
  selectedEmoji,
  onEmojiClick = () => {},
  rootSx,
}: EmojiListProps): JSX.Element {
  return (
    <Box sx={{ display: "flex", gap: "35px", ...rootSx }}>
      {emojiData.map((item: DataItem) => (
        <Box
          key={item.title}
          sx={{ textAlign: "center", width: "60px", cursor: "pointer" }}
          onClick={() => {
            onEmojiClick(item.title);
          }}
        >
          {selectedEmoji === item.title ? item.activeIcon : item.defaultIcon}

          <Typography
            component="p"
            variant="subtitle2"
            sx={{ fontWeight: 600 }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default EmojiList;
