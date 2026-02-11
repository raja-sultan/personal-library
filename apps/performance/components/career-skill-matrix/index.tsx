import { AddCircleOutlinedIcon } from "@assets/icons";
import { CustomPopover } from "@components/custom-popover";
import { Box, IconButton, type SxProps, Typography, type TypographyProps } from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import React from "react";

interface Props {
  title: string;
  handleAction?: (val: string[] | string) => void;
  options?: any[];
  icon?: React.ReactNode;
  borderNone?: boolean;
  actionType?: string;
  removeBg?: boolean;
  titleProps?: TypographyProps;
  disabled?: boolean;
  rootSx?: SxProps;
  description?: string;
}

export function CareerSkillCategory({
  title,
  handleAction = () => {},
  options = [],
  icon = <AddCircleOutlinedIcon />,
  borderNone,
  actionType = "",
  removeBg,
  titleProps,
  disabled,
  description,
}: Props): JSX.Element {
  return (
    <Box>
      <Box sx={styles.wrapper(borderNone, removeBg)}>
        <Typography variant="body1" fontWeight={600} {...titleProps}>
          {title}
        </Typography>
        {options?.length > 0 ? (
          <CustomPopover
            hideCheckbox
            iconButton
            iconButtonProps={{ disabled, sx: { opacity: disabled ? 0.5 : 1 } }}
            customIcon={icon}
            // options={options}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            // handleChange={handleAction}
            options={options}
            handleChange={handleAction}
          />
        ) : (
          <IconButton
            onClick={() => {
              handleAction(actionType);
            }}
            disabled={disabled}
            sx={{ opacity: disabled ? 0.5 : 1 }}
          >
            {icon}
          </IconButton>
        )}
      </Box>
      {description && (
        <Typography variant="body1" fontWeight={600} {...titleProps}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

const styles: any = {
  wrapper:
    (borderNone: boolean, removeBg: boolean) =>
    ({ palette: { neutral } }) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      minWidth: "425px",
      maxWidth: "300px",
      border: !borderNone ? `1px solid ${neutral[100]}` : "",
      p: "0 0.5rem 0 1.6rem",
      borderRadius: "8px",
      background: !removeBg ? ThemeModeColor(neutral[50], neutral[900]) : "",
      mb: "0.5rem",
    }),
};
