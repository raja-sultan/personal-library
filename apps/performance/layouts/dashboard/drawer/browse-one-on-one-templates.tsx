import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Divider, Drawer, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./drawer.styles";
import { KeyboardArrowRight } from "@mui/icons-material";
import HorizontalTabs from "@components/horizontal-tab";
import { EyeIcon } from "@assets/icons/eye-icon";
import { useGetTemplatesQuery } from "@services/settings/one-on-ones/templetes-api";
import { ComponentLoader } from "@components/component-loader";

interface NotificationDrawerProps {
  openDrawer: boolean;
  toggleDrawer: () => void;
  handleDetailModal: (id: string | null) => void;
  handleSelect: (id: string) => void;
  selectedTemplate: string | null
}

export function BrowseOneOnOneTemplatesDrawer({
  openDrawer,
  toggleDrawer,
  handleDetailModal,
  handleSelect,
  selectedTemplate
}: NotificationDrawerProps): JSX.Element {

  const { data: templatesData, isLoading } = useGetTemplatesQuery({ status: 'activated' });
  const { data: myTemplatesData, isLoading: isMyTempLoading } = useGetTemplatesQuery({ status: 'activated', mine: true });

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { p: 2.4, ...styles.drawerStyle, width: '400px', overflowY: 'visible' },
      }}
    >
      <IconButton sx={styles.customCloseIcon} onClick={toggleDrawer}>
        <KeyboardArrowRight />
      </IconButton>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} color="text.primary">
          1:1 Templates
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      {(isLoading || isMyTempLoading) ? <ComponentLoader height='100vh' /> :
        <Box mt={2.4}>
          <HorizontalTabs tabsArray={["All Templates", "Your Templates"]}>
            <TemplateLayout
              key='all'
              data={templatesData?.data?.oneOnOneTemplate}
              handleDetailModal={handleDetailModal}
              handleSelect={handleSelect}
              selectedTemplate={selectedTemplate}
            />
            <TemplateLayout
              key='my'
              data={myTemplatesData?.data?.oneOnOneTemplate}
              handleDetailModal={handleDetailModal}
              handleSelect={handleSelect}
              selectedTemplate={selectedTemplate}
            />
          </HorizontalTabs>
        </Box>
      }
    </Drawer>
  );
}


function TemplateLayout({ data, handleDetailModal, selectedTemplate, handleSelect }) {
  return (
    <Box sx={{
      overflowY: 'auto',
      pr: 1,
      height: '80vh',
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#ccc",
        borderRadius: "6px",
      },
    }}>
      <Stack spacing={2.4}>
        {data?.map((template: { _id: string, title: string }) => (
          <Stack spacing={2.4} key={template?._id}>
            <Typography fontWeight={600} variant="subtitle1" color="text.primary" sx={{ wordWrap: 'break-word' }}>
              {template?.title}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1.6}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => { handleDetailModal(template?._id) }}
              >
                <EyeIcon />
              </Button>
              <Button
                size="small"
                variant={template?._id === selectedTemplate ? 'contained' : 'outlined'}
                onClick={() => { handleSelect(template?._id) }}
              >
                {template?._id === selectedTemplate ? 'Selected' : 'Select'}
              </Button>
            </Box>
            <Divider sx={{ color: "neutral.200" }} />
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}