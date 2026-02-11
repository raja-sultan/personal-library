import { Card, Grid, Typography } from "@mui/material";

export function BasicApplicationInfo({
  personalInfoCustomFields,
  educationInfoCustomFields,
  ApplicationFormData,
}: any): JSX.Element {
  return (
    <Card
      sx={{
        px: { md: 3, xs: 2 },
        py: 3,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: "none !important",
        mt: 3,
      }}
    >
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Basic application information</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight={600}>
            Personal information
          </Typography>
        </Grid>
        {ApplicationFormData?.PersonalInfoFormData?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
        {personalInfoCustomFields?.map((items) => (
          <Grid item md={items?.md} xs={12} key={items?.id}>
            {items?.component && <items.component {...items.componentProps} />}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight={600}>
            Education
          </Typography>
        </Grid>
        {ApplicationFormData?.EducationFormData?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
        {educationInfoCustomFields?.map((items) => (
          <Grid item md={items?.md} xs={12} key={items?.id}>
            {items?.component && <items.component {...items.componentProps} />}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
