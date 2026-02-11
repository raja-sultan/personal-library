import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { styles } from "./score-card.styles";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, NoContentFound, RHFTextField } from "common";
import { AddCategoryModal } from "./add-modal";
import { RemoveCategoryModal } from "./remove-modal";
import { EditScoreCard } from "./edit-score";
import { useScoreCard } from "./use-score-card";
import { LoadingButton } from "@mui/lab";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import Link from "next/link";

export function ScoreCardSection({
  nextStepHandler,
  previousStepHandler,
  editButtons,
  title,
}: {
  nextStepHandler: any;
  previousStepHandler: any;
  editButtons: boolean;
  title: boolean;
}): JSX.Element {
  const {
    crossIconHandler,
    handleAddAttribute,
    onSubmit,
    toggleSave,
    methods,
    fields,
    open,
    setOpen,
    openCategory,
    setOpenCategory,
    showReplacement,
    setShowReplacement,
    isLoading,
    scoreCardData,
    isError,
    isSubmitting,
    getId,
    setGetId,
    editText,
  } = useScoreCard();

  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <>
      <Box sx={styles.mainWrapper({ editText, editButtons })}>
        <Card sx={styles.cardStyling}>
          <CardContent sx={{ p: 2 }}>
            {/* Prop for Edit Score Card */}
            {editText === "edit" && (
              <Typography variant="h6" sx={{ mb: 0.3 }}>
                Edit Scorecards
              </Typography>
            )}
            <Box sx={styles.cardHeaderStyling}>
              {title ? (
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Basic Information
                </Typography>
              ) : (
                <Typography variant="subtitle1" sx={styles.headerText}>
                  Determine which attributes will be used to assess the
                  candidates and in which stages it is most crucial.
                </Typography>
              )}

              {showReplacement ? (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={styles.addButtonStyling}
                  onClick={() => {
                    setOpenCategory(true);
                  }}
                >
                  Add Category
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={styles.addButtonStyling}
                  onClick={() => {
                    setShowReplacement(true);
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={styles.categoryTitle}>
                  Category
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={styles.categoryTitle}>
                  Attributes
                </Typography>
              </Grid>
            </Grid>
            <FormProvider methods={methods}>
              {/* Score Card Array */}
              <Grid container alignItems="start">
                {scoreCardData?.map((item) => (
                  <React.Fragment key={item._id}>
                    {showReplacement ? (
                      <>
                        <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            {item.category ?? "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} lg={4} sx={{ mt: 2 }}>
                          {/* Checking if there is not list then show the add attributes button */}
                          {item?.attributes?.length === 0 ? (
                            <>
                              {getId === item._id &&
                                fields.map((field: any, index: any) => (
                                  <React.Fragment key={field.id}>
                                    <Box sx={styles.fieldArrayWrapper}>
                                      <RHFTextField
                                        disabled={isSubmitting}
                                        fullWidth
                                        type="text"
                                        name={`attributes[${index}]`}
                                        sx={styles.textFieldStyling}
                                      />
                                      <CloseIcon
                                        onClick={() => {
                                          crossIconHandler(index);
                                        }}
                                        sx={{ cursor: "pointer" }}
                                      />
                                    </Box>
                                  </React.Fragment>
                                ))}
                              <Button
                                variant="outlined"
                                sx={styles.AddAttribute}
                                onClick={() => {
                                  handleAddAttribute(item._id);
                                }}
                                startIcon={<AddIcon />}
                              >
                                Add Attribute
                              </Button>
                              {getId === item._id && toggleSave && (
                                <LoadingButton
                                  loading={isSubmitting}
                                  sx={styles.saveButton}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    onSubmit(item._id);
                                  }}
                                >
                                  Save
                                </LoadingButton>
                              )}
                            </>
                          ) : (
                            item?.attributes?.map((list) => (
                              <Box key={list}>
                                <Typography
                                  variant="body2"
                                  sx={{ mb: 0.5, fontWeight: 500 }}
                                >
                                  {list ?? "-"}
                                </Typography>
                              </Box>
                            ))
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={3}
                          lg={4}
                          sx={{ display: "flex", justifyContent: "end" }}
                        >
                          {/* Edit Button */}
                          <Button
                            variant="contained"
                            sx={styles.editButtonStyling}
                            onClick={() => {
                              setShowReplacement(false);
                              setGetId(item?._id);
                            }}
                          >
                            Edit
                          </Button>
                        </Grid>
                        {/* Remove and Edit Section */}
                        <Grid container sx={{ mt: { xs: 1, sm: 2 } }}>
                          <Button
                            sx={styles.removeCategory}
                            onClick={() => {
                              setOpen(true);
                              setGetId(item?._id);
                            }}
                          >
                            Remove Category
                          </Button>
                        </Grid>
                        <Divider sx={styles.dividerStyling} />
                      </>
                    ) : (
                      <Grid item xs={12}>
                        {getId === item._id && (
                          <EditScoreCard
                            getId={getId}
                            setShowReplacement={setShowReplacement}
                          />
                        )}
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </FormProvider>
            {/* Checking if there is an error or if there is no data */}
            {isError === true || scoreCardData?.length === 0 ? (
              <Grid container justifyContent="center">
                <Grid
                  item
                  width={200}
                  sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}
                >
                  <NoContentFound />
                </Grid>
              </Grid>
            ) : null}
          </CardContent>

          {/* Remove Category Modal */}
          <RemoveCategoryModal open={open} setOpen={setOpen} id={getId} />
          {/* Add Category Modal */}
          <AddCategoryModal
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
          />
        </Card>
      </Box>
      {editButtons && (
        <Box sx={{ height: "10%", position: "relative" }}>
          <Box sx={styles.bottomButtons}>
            <Button variant="outlined" onClick={previousStepHandler}>
              Back
            </Button>
            <Box sx={styles.endButtons}>
              <Link href="/jobs">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onSubmit}
                  sx={{
                    m: { xs: "0.5em 0", sm: "0" },
                    marginRight: { xs: "0", sm: "0.5em" },
                  }}
                >
                  Save & Finish Later
                </Button>
              </Link>
              <Button variant="contained" onClick={nextStepHandler}>
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
