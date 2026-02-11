import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { hcmCardData } from "./hcm-card.data";
import type {
  SelectedCardType,
  HcmSubType,
  HcmCardDataType,
  HcmPropsType,
} from "./hcm-card.types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export function HcmCard({
  setShowForm,
  setHcmCardData,
}: HcmPropsType): JSX.Element {
  const [mouseHover, setMouseHover] = useState<HcmSubType | null>(null);
  const [cardData, setCardData] = useState<HcmCardDataType[]>(hcmCardData);
  const [checkedComplete, setCheckedComplete] = useState<boolean>(false);

  useEffect(() => {
    const checkedData = cardData.map((item) => {
      return item.data.filter((subItem) => subItem.checked);
    });
    const flattenedData: HcmSubType[] = checkedData.reduce(
      (acc, current) => acc.concat(current),
      []
    );
    setHcmCardData(flattenedData);
    flattenedData.length > 0
      ? setCheckedComplete(true)
      : setCheckedComplete(false);
  }, [cardData, setHcmCardData]);

  const cardSelectHandler = (data: SelectedCardType): void => {
    setCardData((oldArray) => {
      return oldArray.map((parent: HcmCardDataType): HcmCardDataType => {
        return {
          ...parent,
          data: parent.data.map((child) =>
            child.childId === data.childId &&
            parent.parentId === data.parentId &&
            data.disabled !== true
              ? { ...child, checked: !child.checked }
              : child
          ),
        };
      });
    });
  };

  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h3">Ready to Become Great at HCM?</Typography>
      <Stack
        sx={{
          bgcolor: "background.default",
          p: "2.5rem",
          borderRadius: "0.8rem",
        }}
        spacing={2}
      >
        {cardData.map((item) => (
          <Stack key={item.parentId} spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              {item.name}
            </Typography>
            <Box sx={{ display: "flex", columnGap: 3 }}>
              {item.data.map(({ childId, name, Icon, checked, disabled }) => {
                let color;
                if (disabled === true) {
                  color = "neutral.200";
                } else if (checked) {
                  color = "primary.darkest";
                } else {
                  color = "common.white";
                }
                return (
                  <Box
                    key={name}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      width: "100%",
                      maxWidth: "165px",
                      height: "190px",
                      backgroundColor: color,
                      overflow: "hidden",
                      borderRadius: "16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 5,
                      px: 2,
                    }}
                    onMouseEnter={() => {
                      setMouseHover({ childId, name, Icon, checked });
                    }}
                    onMouseLeave={() => {
                      setMouseHover(null);
                    }}
                    onClick={() => {
                      cardSelectHandler({
                        name,
                        Icon,
                        checked,
                        parentId: item.parentId,
                        childId,
                        disabled,
                      });
                    }}
                  >
                    <Checkbox
                      sx={{
                        top: mouseHover?.name === name ? 0 : "-100%",
                        transition: "top 0.3s ease-in-out",
                        position: "absolute",
                        right: 0,
                      }}
                      checked={checked}
                      inputProps={{ "aria-label": "controlled" }}
                      disabled={disabled}
                    />

                    <Box
                      width={76}
                      height={76}
                      borderRadius="50%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ bgColor: checked ? "primary.main" : "neutral.400" }}
                    >
                      <Icon
                        sx={{
                        color: checked ? "common.white" : "currentColor",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: checked ? "common.white" : "text.primary",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                    variant="h6"
                  >
                    {name}
                  </Typography>
                </Box>
                );
              })}
            </Box>
          </Stack>
        ))}

        {checkedComplete && (
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button variant="outlined" href="https://personnellibrary.co.uk/">
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Continue
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
