import CustomCard from "@components/custom-card";
import { TemplateCard } from "@components/template-card";
import { Grid, Typography } from "@mui/material";
import { useTemplate } from "./use-templates";
import { CustomLoader } from "@components/loader";
import TemplateDialog from "./template-dialog";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.TEMPLATES;

interface Item { _id: string, levelsCount: number, skillsCount: number, title: string }

export function TabTemplates(): JSX.Element {
  const { handleTemplateModalOpen, templateData, isLoading, templateId } = useTemplate();
  const templatesData = templateData?.data?.careerPlan

  return (
    <CustomCard>
      {isLoading && <CustomLoader />}

      <Typography
        variant="caption"
        color="neutral.600"
        sx={{ mb: "20px", display: "block" }}
      >
        Get started with plan templates pre-filled with skills, levels, and
        expectations. All templates are developed by and currently used at
        Personnel Library, our customers, and companies in the broader
        Community.
      </Typography>
      <PermissionProtected permission={PERMISSION.VIEW}>
        <Grid container spacing={2} style={{ opacity: isLoading ? 0.5 : 1 }}>
          {templatesData?.map((item: Item, index: number) => (
            <Grid
              item
              key={item._id}
              xl={3}
              md={4}
              sm={6}
              xs={12}
              onClick={() => {
                handleTemplateModalOpen(item?._id);
              }}
            >
              <TemplateCard
                background={backgroundColors(index)}
                levelsCount={item?.levelsCount}
                skillsCount={item?.skillsCount}
                title={item?.title}
              />
            </Grid>
          ))}
        </Grid>
      </PermissionProtected>

      {templateId && (
        <TemplateDialog
          id={templateId}
          open={templateId}
          onClose={() => {
            handleTemplateModalOpen(null);
          }}
        />
      )}
    </CustomCard>
  );
}


const backgroundColors = (index: number): string | undefined => {
  const bg = [
    '#9B8AFB', '#888296', '#98A2B3', '#32D583', '#FDB022', '#F97066', '#717BBC', '#36BFFA', '#8098F9', '#9B8AFB', '#FD6F8E', '#F670C7',
    '#FD853A', '#888296', '#F97066', '#FDB022', '#36BFFA'
  ];
  const colorIndex = index >= bg.length ? index % 2 : index;
  return bg[colorIndex]
};