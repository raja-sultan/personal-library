"use client";
import { Box, Button, Card, Typography } from "@mui/material";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@assets/icons";
import { FormProvider, RHFCheckbox } from "common";
import { usePermittedFeedbackTypes } from "@sections/settings/feedback/settings/permitted-feeback-types/use-permitted-feeback-types";
import { styles } from "@sections/settings/feedback/settings/permitted-feeback-types/permitted-feeback-types.styles";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.SETTINGS;


export function PermittedFeedbackTypes(): JSX.Element {
  const { handleSubmit, handleToggle, isOpen, methods, onSubmit } =
    usePermittedFeedbackTypes();

  return (
    <PermissionProtected permission={PERMISSION.PERMITTED_FEEDBACK_TYPES}>
      <Card sx={styles.wrapper}>
        <Box sx={styles.headerWrapper}>
          {!isOpen && (
            <ArrowDownCircleIcon
              onClick={handleToggle}
              sx={{ cursor: "pointer" }}
            />
          )}
          {isOpen && (
            <ArrowUpCircleIcon
              onClick={handleToggle}
              sx={{ cursor: "pointer" }}
            />
          )}
          <Typography
            sx={{ marginLeft: "20px" }}
            variant="h6"
            fontWeight={600}
            color="text.primary"
          >
            Permitted Feedback Types
          </Typography>
        </Box>
        {isOpen && (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Box sx={styles.checkBoxWrapper}>
              <RHFCheckbox sx={styles.checkBox} name="PUBLIC" />
              <Box sx={{ mb: 0.5 }}>
                <Typography color="text.primary" fontWeight={600} variant="subtitle1">
                  Public
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  All Employees will see this Feedback
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.checkBoxWrapper}>
              <RHFCheckbox sx={styles.checkBox} name="PRIVATE" />
              <Box sx={{ mb: 0.5 }}>
                <Typography color="text.primary" fontWeight={600} variant="subtitle1">
                  Private
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  Only You will see this Feedback
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.checkBoxWrapper}>
              <RHFCheckbox sx={styles.checkBox} name="PRIVATE_AND_MANAGER" />
              <Box sx={{ mb: 0.5 }}>
                <Typography color="text.primary" fontWeight={600} variant="subtitle1">
                  Private + Manager
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  Only Employee and his Manager will see this Feedback
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.checkBoxWrapper}>
              <RHFCheckbox sx={styles.checkBox} name="MANAGER" />
              <Box sx={{ mb: 0.5 }}>
                <Typography color="text.primary" fontWeight={600} variant="subtitle1">
                  Manager
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  Only Manager will see this Feedback
                </Typography>
              </Box>
            </Box>
            <Button
              size="small"
              variant="outlined"
              type="submit"
              sx={styles.button}
            >
              Add
            </Button>
          </FormProvider>
        )
        }
      </Card >
    </PermissionProtected>
  );
}
