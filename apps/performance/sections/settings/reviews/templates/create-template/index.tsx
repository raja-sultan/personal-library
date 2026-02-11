'use client'

// @ mui imports
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

// @common components imports
import { FormProvider, RHFTextField } from "common";
import CustomCard from "@components/custom-card";

// @routes navigation imports
import { useRouter } from "next/navigation";

// @icons import
import AddIcon from '@mui/icons-material/Add';
import { TrashIcon } from "@assets/icons/trash-icon";

// @my components import
import { useCreateTemplate } from "./use-create-template";
import { ChooseQuestion } from "./add-question";
import { createTemplateStyles } from "./create-template-styles";

export function CreateTemplate({ templateId, title }: any): JSX.Element {
    const router = useRouter();
    const { handleDrawerOpen, handleDrawerClose, isDrawerOpen, selectedValues, setSelectedValues, onSubmit, handleSubmit, methods, handleDelete } = useCreateTemplate(templateId)


    const styles = createTemplateStyles()
    return (
        <CustomCard
            header
            cardHeader={{
                title,
                onBack: () => { router.push('/settings/reviews/templates') },
                divider: true
            }}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Grid container spacing={2} padding="2.4rem 0rem">
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="body2" fontWeight={600} color="text.primary">Template Name</Typography>
                                <Typography variant="subtitle2" fontWeight={400} color="text.secondary">Give your template a name</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4.44}>
                            <RHFTextField
                                name="templateName"
                                placeholder="Enter template name"
                            />
                        </Grid>

                    </Grid>
                    <Divider />
                </Box>
                <Box sx={styles.wrap_create_template}>
                    <Grid container spacing={2} padding="2.4rem 0rem">
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="body2" fontWeight={600} color="text.primary">Questions</Typography>
                                <Typography variant="subtitle2" fontWeight={400} color="text.secondary">Add questions to your template</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>

                            {Array.isArray(selectedValues) ? selectedValues.map((items) => (
                                <Box key={items._id} sx={styles.display_question}>
                                    <Box>
                                        <Typography>{items?.description}</Typography>
                                    </Box>
                                    <Box sx={styles.wrap_delete_icon} onClick={() => { handleDelete(items._id) }}>
                                        <TrashIcon />
                                    </Box>
                                </Box>
                            )) : ""}

                            <Button variant="contained" startIcon={<AddIcon />} onClick={handleDrawerOpen}>Add Questions</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={styles.wrap_button}>
                        <Button variant="outlined" onClick={() => { router.push('/settings/reviews/templates') }}>Cancel</Button>
                        <Button variant="contained" type="submit">Save Template</Button>
                    </Box>
                </Box>
            </FormProvider>
            <ChooseQuestion isDrawerOpen={isDrawerOpen} handleDrawerClose={handleDrawerClose} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
        </CustomCard >
    )
}